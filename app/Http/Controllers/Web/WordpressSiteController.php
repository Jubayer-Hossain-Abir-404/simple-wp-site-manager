<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\WordpressSiteRequest;
use App\Models\WordpressSite;
use App\Repositories\WordpressSiteRepository;
use App\Services\WordpressSiteService;
use Inertia\Inertia;

class WordpressSiteController extends Controller
{
    public function __construct(private WordpressSiteRepository $repository, private WordpressSiteService $service)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wordpressSites = $this->repository->paginate();

        return Inertia::render('WordpressSites/Index', [
            'wordpressSites' => $wordpressSites,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('WordpressSites/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WordpressSiteRequest $request)
    {
        try {
            $wordpressSite = $this->service->save($request);

            return redirect()->route('wordpress-sites.index')
                ->with('success', 'Wordpress site created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to create wordpress site: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WordpressSite $wordpressSite)
    {
        return Inertia::render('WordpressSites/Edit', [
            'wordpressSite' => $wordpressSite,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WordpressSiteRequest $request, WordpressSite $wordpressSite)
    {
        try {
            $wordpressSite->update($request->validated());

            return redirect()->route('wordpress-sites.index')
                ->with('success', 'Wordpress site updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to update wordpress site: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WordpressSite $wordpressSite)
    {
        try {
            $wordpressSite->delete();

            return redirect()->route('wordpress-sites.index')
                ->with('success', 'Wordpress site deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete wordpress site: ' . $e->getMessage());
        }
    }

    public function stopContainer(WordpressSite $wordpressSite)
    {
        try {
            $this->service->stopContainer($wordpressSite);

            return redirect()->route('wordpress-sites.index')
                ->with('success', 'Wordpress site container stopping initiated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to stop wordpress site container: ' . $e->getMessage());
        }
    }
}
