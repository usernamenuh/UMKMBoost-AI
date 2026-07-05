<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run all seeders in the correct order
        $this->call([
            UserSeeder::class,
            BusinessSeeder::class,
            ExpenseCategorySeeder::class,
            CapitalSeeder::class,
            ExpenseSeeder::class,
            RevenueSeeder::class,
        ]);
    }
}

