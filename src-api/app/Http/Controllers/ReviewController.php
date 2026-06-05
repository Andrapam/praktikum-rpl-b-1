<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Create a new review.
     */
    public function store(Request $request)
    {
        $request->validate([
            'spotId' => 'required|exists:spot,id',
            'userId' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'reviewText' => 'nullable|string',
        ]);

        $review = Review::create($request->only([
            'spotId', 'userId', 'rating', 'reviewText',
        ]));

        $review->load('user', 'spot');

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil ditambahkan.',
            'data' => $review,
        ], 201);
    }

    public function destroy($id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Ulasan tidak ditemukan.',
            ], 404);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil dihapus.',
        ]);
    }
}
