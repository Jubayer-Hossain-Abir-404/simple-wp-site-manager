<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\WordpressSiteRequest;
use App\Models\WordpressSite;
use App\Repositories\WordpressSiteRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WordpressSiteController extends Controller
{
    public function __construct(private WordpressSiteRepository $repository)
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
            $wordpressSite = WordpressSite::create($request->validated());

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
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    }
}
