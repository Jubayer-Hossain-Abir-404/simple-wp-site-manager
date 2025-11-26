<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response as Res;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class ExceptionHelper
{
    public static function renderApiException(\Throwable $e): JsonResponse
    {
        $code = $e->getCode() ?: Res::HTTP_INTERNAL_SERVER_ERROR;

        if ($e instanceof ThrottleRequestsException) {
            return response()->json([
                'message' => 'Rate limit reached. Please wait a moment before trying again.',
            ], Res::HTTP_TOO_MANY_REQUESTS);
        }

        if ($e instanceof ModelNotFoundException) {
            return response()->json([
                'message' => 'Data not found',
            ], Res::HTTP_NOT_FOUND);
        }

        if ($e instanceof ValidationException) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], Res::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($e instanceof RouteNotFoundException) {
            return response()->json([
                'message' => 'Endpoint not found',
            ], Res::HTTP_NOT_FOUND);
        }

        return response()->json([
            'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error',
        ], $code);
    }
}
