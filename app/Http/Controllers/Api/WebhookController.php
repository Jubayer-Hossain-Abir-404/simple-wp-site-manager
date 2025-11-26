<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WebhookRequest;
use App\Services\WordpressSiteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response as Res;

class WebhookController extends Controller
{
    public function __construct(private WordpressSiteService $service)
    {
    }

    public function wpStatusCallback(WebhookRequest $request): JsonResponse
    {
        $this->service->updateStatus($request);

        return response()->json([
            'message' => 'WordPress site status updated successfully.',
        ], Res::HTTP_CREATED);
    }
}
