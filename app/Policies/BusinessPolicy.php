<?php

namespace App\Policies;

use App\Models\Business;
use App\Models\User;

class BusinessPolicy
{
    public function viewAny(User $user): bool
    {
        return true; // User bisa melihat list bisnis mereka sendiri
    }

    public function view(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }

    public function create(User $user): bool
    {
        return true; // Semua user yang login bisa create bisnis
    }

    public function update(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }

    public function delete(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }

    public function restore(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }

    public function forceDelete(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }
}