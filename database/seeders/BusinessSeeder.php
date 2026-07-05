<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\User;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::where('email', 'demo1@finsight.id')->first();
        $user2 = User::where('email', 'demo2@finsight.id')->first();
        $user3 = User::where('email', 'demo3@finsight.id')->first();

        if ($user1) {
            Business::firstOrCreate(
                ['user_id' => $user1->id, 'name' => 'Warung Kopi Sempurna'],
                [
                    'type' => 'Kopi',
                    'description' => 'Kedai kopi modern dengan suasana nyaman di pusat kota',
                    'started_at' => now()->subMonths(8),
                    'is_active' => true,
                    'initial_investment' => 50000000,
                    'total_revenue' => 0,
                    'total_expense' => 0,
                    'net_profit' => 0,
                ]
            );

            Business::firstOrCreate(
                ['user_id' => $user1->id, 'name' => 'Toko Pakaian "Trendi"'],
                [
                    'type' => 'Fashion',
                    'description' => 'Toko pakaian online dan offline dengan koleksi terkini',
                    'started_at' => now()->subYears(1)->subMonths(3),
                    'is_active' => true,
                    'initial_investment' => 75000000,
                    'total_revenue' => 0,
                    'total_expense' => 0,
                    'net_profit' => 0,
                ]
            );
        }

        if ($user2) {
            Business::firstOrCreate(
                ['user_id' => $user2->id, 'name' => 'Jasa Desain Grafis'],
                [
                    'type' => 'Jasa Kreatif',
                    'description' => 'Penyedia jasa desain grafis profesional untuk kebutuhan bisnis',
                    'started_at' => now()->subMonths(6),
                    'is_active' => true,
                    'initial_investment' => 5000000,
                    'total_revenue' => 0,
                    'total_expense' => 0,
                    'net_profit' => 0,
                ]
            );

            Business::firstOrCreate(
                ['user_id' => $user2->id, 'name' => 'Pabrik Keripik Singkong'],
                [
                    'type' => 'Makanan',
                    'description' => 'Produksi dan penjualan keripik singkong premium',
                    'started_at' => now()->subYears(1),
                    'is_active' => true,
                    'initial_investment' => 100000000,
                    'total_revenue' => 0,
                    'total_expense' => 0,
                    'net_profit' => 0,
                ]
            );
        }

        if ($user3) {
            Business::firstOrCreate(
                ['user_id' => $user3->id, 'name' => 'Bengkel Mobil "Lancar Jaya"'],
                [
                    'type' => 'Otomotif',
                    'description' => 'Bengkel perbaikan dan perawatan mobil terpercaya',
                    'started_at' => now()->subYears(2),
                    'is_active' => true,
                    'initial_investment' => 200000000,
                    'total_revenue' => 0,
                    'total_expense' => 0,
                    'net_profit' => 0,
                ]
            );

            Business::firstOrCreate(
                ['user_id' => $user3->id, 'name' => 'Layanan Cleaning Service'],
                [
                    'type' => 'Jasa',
                    'description' => 'Jasa pembersihan rumah dan kantor profesional',
                    'started_at' => now()->subMonths(9),
                    'is_active' => true,
                    'initial_investment' => 10000000,
                    'total_revenue' => 0,
                    'total_expense' => 0,
                    'net_profit' => 0,
                ]
            );
        }
    }
}
