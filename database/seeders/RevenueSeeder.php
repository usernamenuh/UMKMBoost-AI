<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Revenue;
use Illuminate\Database\Seeder;

class RevenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        foreach ($businesses as $business) {
            // Generate 15-30 revenue records per business
            for ($i = 0; $i < rand(15, 30); $i++) {
                $daysAgo = rand(0, 30);
                $revenueDate = now()->subDays($daysAgo);

                $revenueData = $this->generateRevenueData($business->type);

                Revenue::create([
                    'business_id' => $business->id,
                    'description' => $revenueData['description'],
                    'amount' => $revenueData['amount'],
                    'revenue_date' => $revenueDate,
                    'category' => $revenueData['category'],
                    'notes' => $revenueData['notes'] ?? null,
                    'created_at' => $revenueDate,
                    'updated_at' => $revenueDate,
                ]);
            }
        }
    }

    private function generateRevenueData($businessType): array
    {
        $revenueByType = [
            'Kopi' => [
                ['description' => 'Penjualan Kopi Pagi', 'amount' => 1500000, 'category' => 'Direct Sales', 'notes' => 'Walk-in customers'],
                ['description' => 'Pesanan Catering', 'amount' => 3000000, 'category' => 'B2B', 'notes' => 'Corporate order'],
                ['description' => 'Penjualan Beans Retail', 'amount' => 2000000, 'category' => 'Retail', 'notes' => 'Online & offline'],
                ['description' => 'Membership Payment', 'amount' => 500000, 'category' => 'Subscription', 'notes' => 'Monthly members'],
                ['description' => 'Event Catering', 'amount' => 5000000, 'category' => 'Events', 'notes' => 'Wedding catering'],
            ],
            'Fashion' => [
                ['description' => 'Penjualan Online Store', 'amount' => 8000000, 'category' => 'Online', 'notes' => 'Shopee & Instagram'],
                ['description' => 'Penjualan Offline', 'amount' => 12000000, 'category' => 'Retail', 'notes' => 'Toko fisik'],
                ['description' => 'Grosir ke Reseller', 'amount' => 15000000, 'category' => 'Wholesale', 'notes' => ''],
                ['description' => 'Kolaborasi Brand', 'amount' => 5000000, 'category' => 'Partnership', 'notes' => 'Limited edition'],
            ],
            'Jasa Kreatif' => [
                ['description' => 'Logo Design Project', 'amount' => 3000000, 'category' => 'Design', 'notes' => 'Client X'],
                ['description' => 'Packaging Design', 'amount' => 5000000, 'category' => 'Design', 'notes' => 'Food brand'],
                ['description' => 'Social Media Content', 'amount' => 2000000, 'category' => 'Social Media', 'notes' => '4 posts'],
                ['description' => 'Website Design', 'amount' => 8000000, 'category' => 'Web Design', 'notes' => 'Full page'],
                ['description' => 'Video Animation', 'amount' => 10000000, 'category' => 'Video', 'notes' => '30 detik'],
            ],
            'Makanan' => [
                ['description' => 'Penjualan Keripik ke Toko', 'amount' => 5000000, 'category' => 'Wholesale', 'notes' => '20 karton'],
                ['description' => 'Penjualan Online', 'amount' => 3000000, 'category' => 'Online', 'notes' => 'Tokopedia'],
                ['description' => 'Event & Bazaar', 'amount' => 4000000, 'category' => 'Events', 'notes' => 'Festival pangan'],
                ['description' => 'Corporate Order', 'amount' => 6000000, 'category' => 'B2B', 'notes' => 'PT XYZ'],
            ],
            'Otomotif' => [
                ['description' => 'Jasa Service Rutin', 'amount' => 2000000, 'category' => 'Service', 'notes' => '3 mobil'],
                ['description' => 'Perbaikan Mesin', 'amount' => 8000000, 'category' => 'Repair', 'notes' => 'Major repair'],
                ['description' => 'Cat Ulang Mobil', 'amount' => 5000000, 'category' => 'Painting', 'notes' => ''],
                ['description' => 'Ganti Suku Cadang', 'amount' => 3000000, 'category' => 'Parts', 'notes' => 'Engine parts'],
            ],
            'Jasa' => [
                ['description' => 'Jasa Bersih Rumah', 'amount' => 2000000, 'category' => 'Residential', 'notes' => '2 rumah'],
                ['description' => 'Jasa Bersih Kantor', 'amount' => 5000000, 'category' => 'Commercial', 'notes' => 'PT ABC'],
                ['description' => 'Jasa Bersih Pasca Renovasi', 'amount' => 4000000, 'category' => 'Special', 'notes' => ''],
                ['description' => 'Monthly Cleaning Contract', 'amount' => 3000000, 'category' => 'Subscription', 'notes' => 'Bulanan'],
            ],
        ];

        $typeRevenues = $revenueByType[$businessType] ?? $revenueByType['Jasa'];

        return $typeRevenues[array_rand($typeRevenues)];
    }
}
