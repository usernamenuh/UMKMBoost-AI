<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class BusinessController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response // ✅ Tambah return type
    {
        /** @var User $user */ // ✅ Type hint untuk IntelliSense
        $user = Auth::user();

        // Pastikan user tidak null
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        $businesses = $user->businesses()
            ->latest()
            ->get()
            ->map(function ($business) {
                return [
                    'id' => $business->id,
                    'name' => $business->name,
                    'type' => $business->type,
                    'description' => $business->description,
                    'is_active' => $business->is_active,
                    'initial_investment' => $business->initial_investment,
                    'total_revenue' => $business->total_revenue,
                    'total_expense' => $business->total_expense,
                    'net_profit' => $business->net_profit,
                ];
            });

        return Inertia::render('business/index', [
            'businesses' => $businesses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        $this->authorize('create', Business::class);

        return Inertia::render('business/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $this->authorize('create', Business::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'started_at' => 'nullable|date',
        ]);

        /** @var User $user */
        $user = $request->user();

        $business = $user->businesses()->create($validated);

        // Auto-create default expense categories
        $defaultCategories = [
            ['name' => 'Bahan Baku', 'icon' => 'package', 'color' => '#3b82f6', 'is_default' => true],
            ['name' => 'Operasional', 'icon' => 'settings', 'color' => '#8b5cf6', 'is_default' => true],
            ['name' => 'Marketing', 'icon' => 'megaphone', 'color' => '#ec4899', 'is_default' => true],
            ['name' => 'Gaji', 'icon' => 'users', 'color' => '#10b981', 'is_default' => true],
            ['name' => 'Transportasi', 'icon' => 'truck', 'color' => '#f59e0b', 'is_default' => true],
            ['name' => 'Lainnya', 'icon' => 'more-horizontal', 'color' => '#6b7280', 'is_default' => true],
        ];

        foreach ($defaultCategories as $category) {
            $business->expenseCategories()->create($category);
        }

        return redirect()->route('business.show', $business)
            ->with('success', 'Bisnis berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Business $business): \Inertia\Response
    {
        $this->authorize('view', $business);

        $business->load([
            'capitalRecords' => fn($q) => $q->latest()->limit(5),
            'expenses' => fn($q) => $q->with('category')->latest()->limit(5),
            'expenseCategories'
        ]);

        // Summary data
        $summary = [
            'total_capital' => $business->total_capital,
            'total_expenses' => $business->total_expenses,
            'remaining_capital' => $business->remaining_capital,
            'expense_by_category' => $business->expenseCategories()
                ->withSum('expenses', 'amount')
                ->get()
                ->map(fn($cat) => [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'amount' => $cat->expenses_sum_amount ?? 0,
                    'color' => $cat->color,
                ]),
        ];

        return Inertia::render('business/show', [
            'business' => $business,
            'summary' => $summary,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Business $business): \Inertia\Response
    {
        $this->authorize('update', $business);

        return Inertia::render('business/edit', [
            'business' => $business,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    // BusinessController.php
    public function update(Request $request, Business $business)
    {
        $this->authorize('update', $business);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'started_at' => 'nullable|date',
            'is_active' => 'boolean', // Pastikan ini boolean
        ]);

        // Konversi checkbox value jika perlu
        $validated['is_active'] = $request->has('is_active')
            ? filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : false;

        $business->update($validated);

        return redirect()->route('business.show', $business)
            ->with('success', 'Bisnis berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Business $business): \Illuminate\Http\RedirectResponse
    {
        $this->authorize('delete', $business);

        $business->delete();

        return redirect()->route('business.index')
            ->with('success', 'Bisnis berhasil dihapus!');
    }
}
