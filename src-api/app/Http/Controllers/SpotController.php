<?php

namespace App\Http\Controllers;

use App\Models\Spot;
use App\Models\SpotPhoto;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    /**
     * Get all spots with photos, average rating, and review count.
     */
    public function index()
    {
        $spots = Spot::with(['photos', 'user'])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $spots,
        ]);
    }

    /**
     * Get a single spot with all details.
     */
    public function show($id)
    {
        $spot = Spot::with(['photos', 'reviews.user', 'user'])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->find($id);

        if (!$spot) {
            return response()->json([
                'success' => false,
                'message' => 'Spot tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $spot,
        ]);
    }

    /**
     * Create a new spot.
     */
    public function store(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'name' => 'required|string|max:100',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'nullable|string',
            'jenis_air' => 'nullable|string|max:50',
            'photos' => 'nullable|array',
            'photos.*' => 'image|max:2048',
        ]);

        $spot = Spot::create($request->only([
            'userId', 'name', 'latitude', 'longitude', 'description', 'jenis_air',
        ]));

        // Handle photo uploads
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('spot-photos', 'public');
                SpotPhoto::create([
                    'spotId' => $spot->id,
                    'imageUrl' => '/storage/' . $path,
                ]);
            }
        }

        // Handle photo URLs (for direct URL submissions)
        if ($request->has('photoUrls')) {
            foreach ($request->photoUrls as $url) {
                SpotPhoto::create([
                    'spotId' => $spot->id,
                    'imageUrl' => $url,
                ]);
            }
        }

        $spot->load('photos', 'user');

        return response()->json([
            'success' => true,
            'message' => 'Spot berhasil ditambahkan.',
            'data' => $spot,
        ], 201);
    }
}
