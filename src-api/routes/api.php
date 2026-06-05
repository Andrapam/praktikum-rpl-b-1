<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\ReviewController;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// User Profile routes
Route::get('/users/{id}/profile', [UserController::class, 'profile']);

// Admin routes
Route::get('/admin/users', [AdminController::class, 'users']);
Route::put('/admin/users/{id}/status', [AdminController::class, 'updateUserStatus']);

// Spot routes
Route::get('/spots', [SpotController::class, 'index']);
Route::get('/spots/{id}', [SpotController::class, 'show']);
Route::post('/spots', [SpotController::class, 'store']);
Route::delete('/spots/{id}', [SpotController::class, 'destroy']);

// Review routes
Route::post('/reviews', [ReviewController::class, 'store']);
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
