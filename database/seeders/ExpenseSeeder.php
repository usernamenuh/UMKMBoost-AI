<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businesses = Business::all();

        foreach ($businesses as $business) {
            $categories = $business->expenseCategories;

            // Skip if no categories exist
            if ($categories->isEmpty()) {
                continue;
            }

            // Generate 20-40 expenses per business
            for ($i = 0; $i < rand(20, 40); $i++) {
                $daysAgo = rand(0, 30);
                $expenseDate = now()->subDays($daysAgo);
                $categoryId = $categories->random()->id;

                $expenseData = $this->generateExpenseData($business->type);

                Expense::create([
                    'business_id' => $business->id,
                    'expense_category_id' => $categoryId,
                    'amount' => $expenseData['amount'],
                    'description' => $expenseData['description'],
                    'notes' => $expenseData['notes'],
                    'receipt_path' => null,
                    'expense_date' => $expenseDate,
                    'created_at' => $expenseDate,
                    'updated_at' => $expenseDate,
                ]);
            }
        }
    }

    private function generateExpenseData($businessType): array
    {
        $expensesByType = [
            'Kopi' => [
                ['amount' => 500000, 'description' => 'Biji Kopi Premium', 'notes' => 'Supplier: Kopi Nusantara'],
                ['amount' => 200000, 'description' => 'Susu dan Bahan Tambahan', 'notes' => ''],
                ['amount' => 150000, 'description' => 'Gula dan Sirup', 'notes' => ''],
                ['amount' => 300000, 'description' => 'Gaji Barista', 'notes' => 'Harian'],
                ['amount' => 100000, 'description' => 'Cleaning Supplies', 'notes' => ''],
                ['amount' => 80000, 'description' => 'Gas untuk Mesin', 'notes' => ''],
                ['amount' => 120000, 'description' => 'Promosi di Instagram', 'notes' => 'Ads'],
                ['amount' => 250000, 'description' => 'Listrik', 'notes' => 'Bulanan'],
            ],
            'Fashion' => [
                ['amount' => 5000000, 'description' => 'Pembelian Stok Baju', 'notes' => 'Dari Garuda Tekstil'],
                ['amount' => 2000000, 'description' => 'Gaji Karyawan', 'notes' => 'Bulanan'],
                ['amount' => 1500000, 'description' => 'Sewa Toko', 'notes' => 'Bulanan'],
                ['amount' => 500000, 'description' => 'Kurir untuk Pengiriman', 'notes' => 'Online orders'],
                ['amount' => 300000, 'description' => 'Packaging Materials', 'notes' => ''],
                ['amount' => 200000, 'description' => 'Foto Produk', 'notes' => 'Professional photography'],
            ],
            'Jasa Kreatif' => [
                ['amount' => 200000, 'description' => 'Software License', 'notes' => 'Adobe Creative Suite'],
                ['amount' => 150000, 'description' => 'Hosting & Domain', 'notes' => 'Tahunan'],
                ['amount' => 100000, 'description' => 'Coffee & Snacks', 'notes' => 'Office supplies'],
                ['amount' => 80000, 'description' => 'Marketing Materials', 'notes' => 'Brochure printing'],
                ['amount' => 50000, 'description' => 'Internet', 'notes' => 'Bulanan'],
            ],
            'Makanan' => [
                ['amount' => 2000000, 'description' => 'Bahan Baku Singkong', 'notes' => 'Dari petani lokal'],
                ['amount' => 1000000, 'description' => 'Minyak Goreng', 'notes' => 'Curah'],
                ['amount' => 500000, 'description' => 'Garam & Bumbu', 'notes' => ''],
                ['amount' => 800000, 'description' => 'Gaji Pekerja', 'notes' => 'Harian'],
                ['amount' => 600000, 'description' => 'Gas LPG', 'notes' => 'Bulanan'],
                ['amount' => 300000, 'description' => 'Kemasan & Label', 'notes' => 'Plastik & sticker'],
            ],
            'Otomotif' => [
                ['amount' => 3000000, 'description' => 'Suku Cadang', 'notes' => 'Berbagai komponen'],
                ['amount' => 2000000, 'description' => 'Gaji Mekanik', 'notes' => 'Bulanan'],
                ['amount' => 1500000, 'description' => 'Oli & Cairan Servis', 'notes' => 'Stok'],
                ['amount' => 500000, 'description' => 'Listrik Workshop', 'notes' => 'Bulanan'],
                ['amount' => 300000, 'description' => 'Tools & Equipment', 'notes' => 'Maintenance'],
            ],
            'Jasa' => [
                ['amount' => 500000, 'description' => 'Bahan Pembersih', 'notes' => 'Stok bulanan'],
                ['amount' => 1000000, 'description' => 'Gaji Karyawan', 'notes' => 'Harian'],
                ['amount' => 200000, 'description' => 'Transportasi & Bahan Bakar', 'notes' => ''],
                ['amount' => 100000, 'description' => 'Equipment & Tools', 'notes' => 'Pemeliharaan'],
            ],
        ];

        $typeExpenses = $expensesByType[$businessType] ?? $expensesByType['Jasa'];

        return $typeExpenses[array_rand($typeExpenses)];
    }
}
