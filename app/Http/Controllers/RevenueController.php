<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Revenue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RevenueController extends Controller
{
    public function index(Business $business)
    {
        $revenues = $business->revenues()
            ->latest('revenue_date')
            ->paginate(20);

        return Inertia::render('business/revenue/index', [  // lowercase!
            'business' => $business,
            'revenues' => $revenues,
        ]);
    }

    public function create(Business $business)
    {
        return Inertia::render('business/revenue/create', [  // lowercase!
            'business' => $business,
        ]);
    }

    public function store(Request $request, Business $business)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'revenue_date' => 'required|date',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $business->revenues()->create($validated);

        return redirect()
            ->route('business.revenues.index', $business)
            ->with('success', 'Pendapatan berhasil ditambahkan!');
    }

    public function edit(Business $business, Revenue $revenue)
    {
        return Inertia::render('business/revenue/edit', [  // lowercase!
            'business' => $business,
            'revenue' => $revenue,
        ]);
    }

    public function update(Request $request, Business $business, Revenue $revenue)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'revenue_date' => 'required|date',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $revenue->update($validated);

        return redirect()
            ->route('business.revenues.index', $business)
            ->with('success', 'Pendapatan berhasil diperbarui!');
    }

    public function destroy(Business $business, Revenue $revenue)
    {
        $revenue->delete();

        return redirect()
            ->route('business.revenues.index', $business)
            ->with('success', 'Pendapatan berhasil dihapus!');
    }
}