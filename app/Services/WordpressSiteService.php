<?php

declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\WebhookRequest;
use App\Http\Requests\WordpressSiteRequest;
use App\Jobs\DeleteDockerServerJob;
use App\Jobs\DeployDockerServerJob;
use App\Jobs\StopDockerServerJob;
use App\Models\WordpressSite;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpFoundation\Response as Res;

class WordpressSiteService
{
    public function save(WordpressSiteRequest $request): WordpressSite
    {
        $wordpressSite = new WordpressSite();
        $data = $request->only($wordpressSite->getFillable());

        $data['status'] = config('common.status.deploying');
        $wordpressSite->fill($data)->save();

        dispatch(new DeployDockerServerJob($wordpressSite->toArray()));

        return $wordpressSite;
    }

    public function delete(WordpressSite $wordpressSite): WordpressSite
    {
        dispatch(new DeleteDockerServerJob($wordpressSite->toArray()));

        $wordpressSite->delete();

        return $wordpressSite;
    }

    public function stopContainer(WordpressSite $wordpressSite): WordpressSite
    {
        $wordpressSite->status = config('common.status.stopping');
        $wordpressSite->update();

        dispatch(new StopDockerServerJob($wordpressSite->toArray()));

        return $wordpressSite;
    }

    public function updateStatus(WebhookRequest $request): WordpressSite
    {
        try {
            $wordpressSite = WordpressSite::where('domain', $request->domain)->firstOrFail();
            $wordpressSite->status = $request->status;
            $wordpressSite->update();

            return $wordpressSite;
        } catch (\Exception $e) {
            throw new InternalErrorException($e->getMessage(), Res::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
