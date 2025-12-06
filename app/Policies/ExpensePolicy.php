<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;
use App\Models\Business;

class ExpensePolicy
{
    public function viewAny(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }

    public function view(User $user, Expense $expense): bool
    {
        return $user->id === $expense->business->user_id;
    }

    public function create(User $user, Business $business): bool
    {
        return $user->id === $business->user_id;
    }

    public function update(User $user, Expense $expense): bool
    {
        return $user->id === $expense->business->user_id;
    }

    public function delete(User $user, Expense $expense): bool
    {
        return $user->id === $expense->business->user_id;
    }
}