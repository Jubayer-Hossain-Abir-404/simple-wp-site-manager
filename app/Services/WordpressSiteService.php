<?php

declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\WordpressSiteRequest;
use App\Jobs\DeployDockerServerJob;
use App\Models\WordpressSite;

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
}
