<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

abstract class Controller
{
    protected function authUser(Request $request): ?User
    {
        return $request->attributes->get('authUser');
    }

    protected function isAdmin(?User $user): bool
    {
        return $user && $user->role === 'Admin';
    }
}
