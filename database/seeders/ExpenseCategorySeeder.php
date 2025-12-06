<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExpenseCategory;

class ExpenseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $defaultCategories = [
            ['name' => 'Bahan Baku', 'icon' => 'package', 'color' => '#3b82f6', 'is_default' => true],
            ['name' => 'Operasional', 'icon' => 'settings', 'color' => '#8b5cf6', 'is_default' => true],
            ['name' => 'Marketing', 'icon' => 'megaphone', 'color' => '#ec4899', 'is_default' => true],
            ['name' => 'Gaji', 'icon' => 'users', 'color' => '#10b981', 'is_default' => true],
            ['name' => 'Transportasi', 'icon' => 'truck', 'color' => '#f59e0b', 'is_default' => true],
            ['name' => 'Lainnya', 'icon' => 'more-horizontal', 'color' => '#6b7280', 'is_default' => true],
        ];

        // Ini akan di-create saat user buat bisnis pertama kali
        // Atau bisa auto-create di BusinessController
    }
}