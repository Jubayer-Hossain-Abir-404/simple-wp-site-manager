<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\WordpressSite;
use App\Services\RemoteDockerService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteDockerServerJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected array $wordpressSiteInfo;

    /**
     * Create a new job instance.
     */
    public function __construct(array $wordpressSiteInfo)
    {
        $this->wordpressSiteInfo = $wordpressSiteInfo;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            (new RemoteDockerService())->remove($this->wordpressSiteInfo);
        } catch (\Exception $e) {
            WordpressSite::where('id', $this->wordpressSiteInfo['id'])
                ->update(['status' => config('common.status.failed')]);

            throw $e;
        }
    }
}
