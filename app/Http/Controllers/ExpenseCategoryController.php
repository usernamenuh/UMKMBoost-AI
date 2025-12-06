<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    use AuthorizesRequests;

    /**
     * Menampilkan daftar kategori pengeluaran
     */
    public function index(Business $business)
    {
        // Authorization
        $this->authorize('view', $business);

        // Ambil data kategori dengan statistik
        $categories = $business->expenseCategories()
            ->withCount('expenses')
            ->withSum('expenses', 'amount')
            ->orderBy('is_default', 'desc')
            ->orderBy('name')
            ->get();

        return Inertia::render('expense-category/index', [
            'business' => $business,
            'categories' => $categories,
        ]);
    }

    /**
     * Menyimpan kategori baru
     */
    public function store(Request $request, Business $business)
    {
        // Authorization
        $this->authorize('update', $business);

        // Validasi
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
        ]);

        // Buat kategori
        $category = $business->expenseCategories()->create($validated);

        return redirect()->back()->with([
            'success' => 'Kategori berhasil ditambahkan!',
            'data' => $category
        ]);
    }

    /**
     * Mengupdate kategori
     */
    public function update(Request $request, Business $business, ExpenseCategory $category)
    {
        // Authorization
        $this->authorize('update', $business);

        // Pastikan kategori milik business ini
        if ($category->business_id !== $business->id) {
            abort(404, 'Kategori tidak ditemukan untuk bisnis ini.');
        }

        // Cek jika kategori default
        if ($category->is_default) {
            return redirect()->back()->withErrors([
                'category' => 'Kategori default tidak dapat diubah.'
            ]);
        }

        // Validasi
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
        ]);

        // Update kategori
        $category->update($validated);

        return redirect()->back()->with([
            'success' => 'Kategori berhasil diperbarui!',
            'data' => $category
        ]);
    }

    /**
     * Menghapus kategori
     */
    public function destroy(Business $business, ExpenseCategory $category)
    {
        // Authorization
        $this->authorize('update', $business);

        // Pastikan kategori milik business ini
        if ($category->business_id !== $business->id) {
            abort(404, 'Kategori tidak ditemukan untuk bisnis ini.');
        }

        // Cek jika kategori default
        if ($category->is_default) {
            return redirect()->back()->withErrors([
                'category' => 'Kategori default tidak dapat dihapus.'
            ]);
        }

        // Cek jika kategori masih digunakan
        if ($category->expenses()->count() > 0) {
            return redirect()->back()->withErrors([
                'category' => 'Tidak bisa menghapus kategori yang masih memiliki pengeluaran.'
            ]);
        }

        // Hapus kategori
        $category->delete();

        return redirect()->back()->with([
            'success' => 'Kategori berhasil dihapus!'
        ]);
    }

    /**
     * Membuat kategori default untuk bisnis baru
     */
    public function createDefaultCategories(Business $business)
    {
        $defaultCategories = [
            ['name' => 'Bahan Baku', 'icon' => 'package', 'color' => '#3B82F6', 'is_default' => true],
            ['name' => 'Operasional', 'icon' => 'settings', 'color' => '#10B981', 'is_default' => true],
            ['name' => 'Transportasi', 'icon' => 'car', 'color' => '#F59E0B', 'is_default' => true],
            ['name' => 'Gaji Karyawan', 'icon' => 'users', 'color' => '#EF4444', 'is_default' => true],
            ['name' => 'Pemasaran', 'icon' => 'megaphone', 'color' => '#8B5CF6', 'is_default' => true],
            ['name' => 'Sewa Tempat', 'icon' => 'building', 'color' => '#EC4899', 'is_default' => true],
        ];

        foreach ($defaultCategories as $categoryData) {
            $business->expenseCategories()->create($categoryData);
        }

        return response()->json(['message' => 'Kategori default berhasil dibuat']);
    }
}
