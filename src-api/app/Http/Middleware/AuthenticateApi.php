<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApi
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization', '');

        if (!str_starts_with($header, 'Bearer ')) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan login terlebih dahulu.',
            ], 401);
        }

        $token = substr($header, 7);
        $decoded = base64_decode($token, true);

        if ($decoded === false || !str_contains($decoded, ':')) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid.',
            ], 401);
        }

        [$userId] = explode(':', $decoded, 2);
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid.',
            ], 401);
        }

        if ($user->status === 'Banned') {
            return response()->json([
                'success' => false,
                'message' => 'Akun Anda telah dinonaktifkan.',
            ], 403);
        }

        $request->attributes->set('authUser', $user);

        return $next($request);
    }
}
