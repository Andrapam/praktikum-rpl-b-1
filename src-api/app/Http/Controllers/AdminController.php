<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Spot;
use App\Models\Review;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function stats()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_users' => User::count(),
                'active_users' => User::where('status', 'Active')->count(),
                'banned_users' => User::where('status', 'Banned')->count(),
                'total_spots' => Spot::count(),
                'total_reviews' => Review::count(),
            ],
        ]);
    }

    /**
     * Get all users with spot/review counts.
     */
    public function users()
    {
        $users = User::withCount(['spots', 'reviews'])->get();
        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    /**
     * Get ALL reviews with spot and user relations.
     */
    public function reviews()
    {
        $reviews = Review::with(['spot', 'user'])->orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $reviews,
        ]);
    }

    /**
     * Ban or unban a user.
     */
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
