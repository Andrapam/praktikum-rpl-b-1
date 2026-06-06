<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

// Auth routes (public)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Public spot & profile routes
Route::get('/spots', [SpotController::class, 'index']);
Route::get('/spots/{id}', [SpotController::class, 'show']);
Route::get('/users/{id}/profile', [UserController::class, 'profile']);

// Authenticated member routes
Route::middleware('auth.api')->group(function () {
    Route::post('/spots', [SpotController::class, 'store']);
    Route::put('/spots/{id}', [SpotController::class, 'update']);
    Route::post('/spots/{id}/update', [SpotController::class, 'update']);
    Route::delete('/spots/{id}', [SpotController::class, 'destroy']);
    Route::delete('/photos/{id}', [SpotController::class, 'destroyPhoto']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
});

// Admin routes
Route::middleware(['auth.api', 'admin'])->group(function () {
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/reviews', [AdminController::class, 'reviews']);
    Route::put('/admin/users/{id}/status', [AdminController::class, 'updateUserStatus']);
    Route::put('/admin/reviews/{id}', [ReviewController::class, 'update']);
});
