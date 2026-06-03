<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\ReviewController;

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Spot routes
Route::get('/spots', [SpotController::class, 'index']);
Route::get('/spots/{id}', [SpotController::class, 'show']);
Route::post('/spots', [SpotController::class, 'store']);

// Review routes
Route::post('/reviews', [ReviewController::class, 'store']);
