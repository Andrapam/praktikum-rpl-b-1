<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Spot;
use App\Models\Review;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function users()
    {
        $users = User::withCount(['spots', 'reviews'])->get();
        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function updateUserStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Active,Banned',
        ]);

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan.',
            ], 404);
        }

        if ($user->role === 'Admin') {
            return response()->json([
                'success' => false,
                'message' => 'Tidak bisa mengubah status Admin lain.',
            ], 403);
        }

        $user->status = $request->status;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Status pengguna berhasil diperbarui.',
            'data' => $user,
        ]);
    }
}
