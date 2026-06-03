<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login user.
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Username atau password salah.',
            ], 401);
        }

        if ($user->status === 'Banned') {
            return response()->json([
                'success' => false,
                'message' => 'Akun Anda telah dibanned.',
            ], 403);
        }

        $token = base64_encode($user->id . ':' . now()->timestamp);

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil.',
            'data' => [
                'user' => $user,
                'api_token' => $token,
            ],
        ]);
    }

    /**
     * Register new user.
     */
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:50|unique:users,username',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'username' => $request->username,
            'password' => $request->password,
            'role' => 'Member',
            'status' => 'Active',
        ]);

        $token = base64_encode($user->id . ':' . now()->timestamp);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil.',
            'data' => [
                'user' => $user,
                'api_token' => $token,
            ],
        ], 201);
    }
}
