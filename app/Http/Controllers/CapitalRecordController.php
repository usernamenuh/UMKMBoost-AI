<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\CapitalRecord;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class CapitalRecordController extends Controller
{
    use AuthorizesRequests; // ✅ Tambahkan ini

    public function index(Business $business)
    {
        $this->authorize('view', $business);

        $capitals = $business->capitalRecords()
            ->latest('recorded_at')
            ->paginate(20);

        return Inertia::render('capital/index', [
            'business' => $business,
            'capitals' => $capitals,
            'total' => $business->total_capital,
        ]);
    }

    public function create(Business $business)
    {
        $this->authorize('update', $business);

        return Inertia::render('capital/create', [
            'business' => $business,
        ]);
    }

    public function store(Request $request, Business $business)
    {
        $this->authorize('update', $business);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'recorded_at' => 'required|date',
        ]);

        $business->capitalRecords()->create($validated);

        return redirect()->route('capital.index', $business)
            ->with('success', 'Modal berhasil dicatat!'); // ✅ Ganti 'status' dengan 'success'
    }

    public function edit(Business $business, CapitalRecord $capital)
    {
        $this->authorize('update', $business);
        
        // ✅ Tambah validasi: pastikan capital milik business ini
        if ($capital->business_id !== $business->id) {
            abort(404);
        }

        return Inertia::render('capital/edit', [
            'business' => $business,
            'capital' => $capital,
        ]);
    }

    public function update(Request $request, Business $business, CapitalRecord $capital)
    {
        $this->authorize('update', $business);
        
        // ✅ Tambah validasi: pastikan capital milik business ini
        if ($capital->business_id !== $business->id) {
            abort(404);
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'recorded_at' => 'required|date',
        ]);

        $capital->update($validated);

        return redirect()->route('capital.index', $business)
            ->with('success', 'Modal berhasil diupdate!'); // ✅ Ganti 'status' dengan 'success'
    }

    public function destroy(Business $business, CapitalRecord $capital)
    {
        $this->authorize('update', $business);
        
        // ✅ Tambah validasi: pastikan capital milik business ini
        if ($capital->business_id !== $business->id) {
            abort(404);
        }

        $capital->delete();

        return back()->with('success', 'Modal berhasil dihapus!'); // ✅ Ganti 'status' dengan 'success'
    }
}