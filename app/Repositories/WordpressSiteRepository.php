<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\WordpressSite;

class WordpressSiteRepository
{
    public function paginate(array $filters = [])
    {
        return WordpressSite::latest()
            ->select('id', 'name', 'domain', 'status')
            ->paginate(config('common.pagi_limit'));
    }
}
