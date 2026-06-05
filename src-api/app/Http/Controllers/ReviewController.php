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
        $request->validate([
            'spotId' => 'required|exists:spot,id',
            'userId' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'reviewText' => 'nullable|string',
        ]);

        $data = $request->only(['spotId', 'userId', 'rating', 'reviewText']);

        // Apply bad word censoring
        if (!empty($data['reviewText'])) {
            $data['reviewText'] = $this->censorBadWords($data['reviewText']);
        }

        $review = Review::create($data);
        $review->load('user', 'spot');

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil ditambahkan.',
            'data' => $review,
        ], 201);
    }

    /**
     * Delete a review.
     */
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
