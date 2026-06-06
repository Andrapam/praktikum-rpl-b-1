<?php

namespace App\Http\Controllers;

use App\Models\Spot;
use App\Models\SpotPhoto;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    private const MAX_PHOTOS_PER_SPOT = 5;

    /**
     * Get all spots with photos, average rating, and review count.
     */
    public function index()
    {
        $spots = Spot::with(['photos', 'user', 'reviews.user'])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->get();

        foreach ($spots as $spot) {
            foreach ($spot->photos as $photo) {
                if (str_starts_with($photo->imageUrl, '/storage/')) {
                    $photo->imageUrl = url($photo->imageUrl);
                }
            }
        }

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

        foreach ($spot->photos as $photo) {
            if (str_starts_with($photo->imageUrl, '/storage/')) {
                $photo->imageUrl = url($photo->imageUrl);
            }
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
        $user = $this->authUser($request);

        $request->validate([
            'name' => 'required|string|max:100',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'nullable|string',
            'jenis_air' => 'nullable|string|max:50',
            'photos' => 'nullable|array|max:' . self::MAX_PHOTOS_PER_SPOT,
            'photos.*' => 'image|max:2048',
        ]);

        $spot = Spot::create([
            'userId' => $user->id,
            'name' => $request->name,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'description' => $request->description,
            'jenis_air' => $request->jenis_air,
        ]);

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('spot-photos', 'public');
                SpotPhoto::create([
                    'spotId' => $spot->id,
                    'imageUrl' => url('/storage/' . $path),
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

    /**
     * Update an existing spot (only owner can update).
     */
    public function update(Request $request, $id)
    {
        $user = $this->authUser($request);
        $spot = Spot::withCount('photos')->find($id);

        if (!$spot) {
            return response()->json([
                'success' => false,
                'message' => 'Spot tidak ditemukan.',
            ], 404);
        }

        if ($spot->userId !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki izin untuk mengedit spot ini.',
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'latitude' => 'sometimes|required|numeric',
            'longitude' => 'sometimes|required|numeric',
            'description' => 'nullable|string',
            'jenis_air' => 'nullable|string|max:50',
            'photos' => 'nullable|array',
            'photos.*' => 'image|max:2048',
        ]);

        if ($request->hasFile('photos')) {
            $newCount = count($request->file('photos'));
            if (($spot->photos_count + $newCount) > self::MAX_PHOTOS_PER_SPOT) {
                return response()->json([
                    'success' => false,
                    'message' => 'Maksimal ' . self::MAX_PHOTOS_PER_SPOT . ' foto per spot.',
                ], 422);
            }
        }

        $spot->fill($request->only([
            'name', 'latitude', 'longitude', 'description', 'jenis_air',
        ]));
        $spot->save();

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('spot-photos', 'public');
                SpotPhoto::create([
                    'spotId' => $spot->id,
                    'imageUrl' => url('/storage/' . $path),
                ]);
            }
        }

        $spot->load('photos', 'user', 'reviews.user');
        $spot->loadCount('reviews');
        $spot->loadAvg('reviews', 'rating');

        return response()->json([
            'success' => true,
            'message' => 'Spot berhasil diperbarui.',
            'data' => $spot,
        ]);
    }

    /**
     * Delete a spot (owner or admin).
     */
    public function destroy(Request $request, $id)
    {
        $user = $this->authUser($request);
        $spot = Spot::find($id);

        if (!$spot) {
            return response()->json([
                'success' => false,
                'message' => 'Spot tidak ditemukan.',
            ], 404);
        }

        if ($spot->userId !== $user->id && !$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki izin untuk menghapus spot ini.',
            ], 403);
        }

        SpotPhoto::where('spotId', $id)->delete();
        $spot->delete();

        return response()->json([
            'success' => true,
            'message' => 'Spot berhasil dihapus.',
        ]);
    }

    /**
     * Delete a single photo (spot owner or admin).
     */
    public function destroyPhoto(Request $request, $id)
    {
        $user = $this->authUser($request);
        $photo = SpotPhoto::with('spot')->find($id);

        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Foto tidak ditemukan.',
            ], 404);
        }

        if ($photo->spot->userId !== $user->id && !$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki izin untuk menghapus foto ini.',
            ], 403);
        }

        $photo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Foto berhasil dihapus.',
        ]);
    }
}
