<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;

class ExpenseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $defaultCategories = [
            ['name' => 'Gaji Karyawan', 'icon' => '👥', 'color' => '#3B82F6', 'is_default' => true],
            ['name' => 'Sewa Tempat', 'icon' => '🏪', 'color' => '#8B5CF6', 'is_default' => true],
            ['name' => 'Listrik & Air', 'icon' => '💡', 'color' => '#F59E0B', 'is_default' => true],
            ['name' => 'Bahan Baku', 'icon' => '📦', 'color' => '#10B981', 'is_default' => true],
            ['name' => 'Transportasi', 'icon' => '🚗', 'color' => '#EF4444', 'is_default' => true],
            ['name' => 'Marketing', 'icon' => '📢', 'color' => '#EC4899', 'is_default' => true],
            ['name' => 'Internet & Telp', 'icon' => '📱', 'color' => '#06B6D4', 'is_default' => true],
            ['name' => 'Asuransi', 'icon' => '🛡️', 'color' => '#6366F1', 'is_default' => true],
            ['name' => 'Maintenance', 'icon' => '🔧', 'color' => '#64748B', 'is_default' => true],
            ['name' => 'Lainnya', 'icon' => '📌', 'color' => '#78716C', 'is_default' => true],
        ];

        // Create categories untuk setiap bisnis yang ada
        foreach (Business::all() as $business) {
            foreach ($defaultCategories as $category) {
                ExpenseCategory::firstOrCreate(
                    ['business_id' => $business->id, 'name' => $category['name']],
                    [
                        'icon' => $category['icon'],
                        'color' => $category['color'],
                        'is_default' => true,
                    ]
                );
            }
        }
    }
}