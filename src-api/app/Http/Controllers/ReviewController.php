<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * List of Indonesian bad words to censor.
     */
    private $badWords = [
        'anjing', 'bangsat', 'bego', 'tolol', 'goblok', 'bodoh',
        'kampret', 'brengsek', 'sialan', 'bajingan', 'kontol',
        'memek', 'ngentot', 'tai', 'setan', 'iblis', 'keparat',
        'laknat', 'anjir', 'asu', 'babi', 'monyet', 'goblog',
        'idiot', 'dungu', 'perek', 'jablay',
    ];

    /**
     * Censor bad words in text by replacing with asterisks.
     */
    private function censorBadWords(string $text): string
    {
        foreach ($this->badWords as $word) {
            $pattern = '/\b' . preg_quote($word, '/') . '\b/iu';
            $text = preg_replace_callback($pattern, function ($match) {
                return str_repeat('*', mb_strlen($match[0]));
            }, $text);
        }
        return $text;
    }

    /**
     * Create a new review with word censoring.
     */
    public function store(Request $request)
    {
        $user = $this->authUser($request);

        $request->validate([
            'spotId' => 'required|exists:spot,id',
            'rating' => 'required|integer|min:1|max:5',
            'reviewText' => 'nullable|string',
        ]);

        $existingReview = Review::where('spotId', $request->spotId)
            ->where('userId', $user->id)
            ->first();

        if ($existingReview) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah memberikan ulasan untuk spot ini.',
            ], 422);
        }

        $reviewText = $request->reviewText;
        if (!empty($reviewText)) {
            $reviewText = $this->censorBadWords($reviewText);
        }

        $review = Review::create([
            'spotId' => $request->spotId,
            'userId' => $user->id,
            'rating' => $request->rating,
            'reviewText' => $reviewText,
        ]);

        $review->load('user', 'spot');

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil ditambahkan.',
            'data' => $review,
        ], 201);
    }

    /**
     * Delete a review (author or admin).
     */
    public function destroy(Request $request, $id)
    {
        $user = $this->authUser($request);
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Ulasan tidak ditemukan.',
            ], 404);
        }

        if ($review->userId !== $user->id && !$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki izin untuk menghapus ulasan ini.',
            ], 403);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil dihapus.',
        ]);
    }

    /**
     * Update a review (for Admin to censor words).
     */
    public function update(Request $request, $id)
    {
        $user = $this->authUser($request);
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Ulasan tidak ditemukan.',
            ], 404);
        }

        if (!$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Hanya admin yang dapat mengedit/menyensor ulasan.',
            ], 403);
        }

        $request->validate([
            'reviewText' => 'required|string',
        ]);

        $review->update([
            'reviewText' => $request->reviewText,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil diperbarui.',
            'data' => $review,
        ]);
    }
}
