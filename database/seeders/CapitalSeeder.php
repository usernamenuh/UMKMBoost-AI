<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\CapitalRecord;
use Illuminate\Database\Seeder;

class CapitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        foreach ($businesses as $business) {
            // Modal Awal
            CapitalRecord::firstOrCreate(
                ['business_id' => $business->id, 'description' => 'Modal Awal Usaha'],
                [
                    'amount' => $business->initial_investment,
                    'source' => 'Pribadi',
                    'recorded_at' => $business->started_at,
                ]
            );

            // Modal Tambahan (random)
            if (rand(0, 1)) {
                CapitalRecord::firstOrCreate(
                    ['business_id' => $business->id, 'description' => 'Tambahan Modal dari Pinjaman'],
                    [
                        'amount' => rand(5000000, 50000000),
                        'source' => 'Pinjaman Bank',
                        'recorded_at' => $business->started_at->addMonths(rand(2, 6)),
                    ]
                );
            }

            // Modal Tambahan dari Keuntungan
            if (rand(0, 1)) {
                CapitalRecord::firstOrCreate(
                    ['business_id' => $business->id, 'description' => 'Reinvestasi dari Keuntungan'],
                    [
                        'amount' => rand(2000000, 20000000),
                        'source' => 'Keuntungan Usaha',
                        'recorded_at' => $business->started_at->addMonths(rand(3, 12)),
                    ]
                );
            }
        }
    }
}
