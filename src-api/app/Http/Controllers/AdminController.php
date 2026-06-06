<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Spot;
use App\Models\Review;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    private function ensureAdminAccess(Request $request)
    {
        $user = $this->authUser($request);
        if (!$this->isAdmin($user)) {
            abort(response()->json([
                'success' => false,
                'message' => 'Akses ditolak. Hanya admin yang dapat mengakses.',
            ], 403));
        }
        return $user;
    }

    /**
     * Get dashboard statistics.
     */
    public function stats(Request $request)
    {
        $this->ensureAdminAccess($request);

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
    public function users(Request $request)
    {
        $this->ensureAdminAccess($request);

        $users = User::withCount(['spots', 'reviews'])->get();
        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    /**
     * Get reviews with spot and user relations (paginated).
     */
    public function reviews(Request $request)
    {
        $this->ensureAdminAccess($request);

        $perPage = min(max((int) $request->get('perPage', 50), 1), 100);

        $reviews = Review::with(['spot', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $reviews->items(),
            'meta' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
            ],
        ]);
    }

    /**
     * Ban or unban a user.
     */
    public function updateUserStatus(Request $request, $id)
    {
        $this->ensureAdminAccess($request);

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
