<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    use AuthorizesRequests; // ✅ Tambahkan ini

    public function index(Business $business, Request $request)
{
    $this->authorize('view', $business);

    $query = $business->expenses()->with('category');

    // Filter by category
    if ($request->category_id) {
        $query->where('expense_category_id', $request->category_id);
    }

    // Filter by date range
    if ($request->start_date) {
        $query->where('expense_date', '>=', $request->start_date);
    }
    if ($request->end_date) {
        $query->where('expense_date', '<=', $request->end_date);
    }

    $expenses = $query->latest('expense_date')->paginate(20);

    return Inertia::render('expense/index', [ // ✅ HARUS expense/index
        'business' => $business->load('expenseCategories'),
        'expenses' => $expenses,
        'filters' => $request->only(['category_id', 'start_date', 'end_date']),
        'total' => $business->total_expenses,
    ]);
}
    public function create(Business $business)
    {
        $this->authorize('update', $business);

        return Inertia::render('expense/create', [
            'business' => $business,
            'categories' => $business->expenseCategories,
        ]);
    }

    public function store(Request $request, Business $business)
    {
        $this->authorize('update', $business);

        $validated = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'expense_date' => 'required|date',
            'receipt' => 'nullable|image|max:2048', // 2MB max
        ]);

        // Upload receipt if exists
        if ($request->hasFile('receipt')) {
            $validated['receipt_path'] = $request->file('receipt')
                ->store('receipts/' . $business->id, 'public');
        }

        $business->expenses()->create($validated);

        return redirect()->route('expense.index', $business)
            ->with('success', 'Pengeluaran berhasil dicatat!'); // ✅ Ganti 'status' dengan 'success'
    }

    public function edit(Business $business, Expense $expense)
    {
        $this->authorize('update', $business);

        // ✅ Tambah validasi: pastikan expense milik business ini
        if ($expense->business_id !== $business->id) {
            abort(404);
        }

        return Inertia::render('expense/edit', [
            'business' => $business,
            'expense' => $expense,
            'categories' => $business->expenseCategories,
        ]);
    }

    public function update(Request $request, Business $business, Expense $expense)
    {
        $this->authorize('update', $business);

        // ✅ Tambah validasi: pastikan expense milik business ini
        if ($expense->business_id !== $business->id) {
            abort(404);
        }

        $validated = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'expense_date' => 'required|date',
            'receipt' => 'nullable|image|max:2048',
        ]);

        // Upload new receipt
        if ($request->hasFile('receipt')) {
            // Delete old receipt
            if ($expense->receipt_path) {
                Storage::disk('public')->delete($expense->receipt_path);
            }

            $validated['receipt_path'] = $request->file('receipt')
                ->store('receipts/' . $business->id, 'public');
        }

        $expense->update($validated);

        return redirect()->route('expense.index', $business)
            ->with('success', 'Pengeluaran berhasil diupdate!'); // ✅ Ganti 'status' dengan 'success'
    }

    public function destroy(Business $business, Expense $expense)
    {
        $this->authorize('update', $business);

        // ✅ Tambah validasi: pastikan expense milik business ini
        if ($expense->business_id !== $business->id) {
            abort(404);
        }

        // Delete receipt if exists
        if ($expense->receipt_path) {
            Storage::disk('public')->delete($expense->receipt_path);
        }

        $expense->delete();

        return back()->with('success', 'Pengeluaran berhasil dihapus!'); // ✅ Ganti 'status' dengan 'success'
    }
}
