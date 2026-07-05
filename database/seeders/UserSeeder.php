<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Demo User 1
        User::firstOrCreate(
            ['email' => 'demo1@finsight.id'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        // Demo User 2
        User::firstOrCreate(
            ['email' => 'demo2@finsight.id'],
            [
                'name' => 'Siti Nurhaliza',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        // Demo User 3
        User::firstOrCreate(
            ['email' => 'demo3@finsight.id'],
            [
                'name' => 'Ahmad Wijaya',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        // Test User
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
