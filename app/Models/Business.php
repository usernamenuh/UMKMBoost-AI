<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'description',
        'started_at',
        'is_active',
        'initial_investment',
        'total_revenue',
        'total_expense',
        'net_profit',
    ];

   protected $casts = [
        'started_at' => 'date',
        'is_active' => 'boolean',
        'initial_investment' => 'decimal:2',
        'total_revenue' => 'decimal:2',
        'total_expense' => 'decimal:2',
        'net_profit' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function capitalRecords(): HasMany
    {
        return $this->hasMany(CapitalRecord::class);
    }

    public function expenseCategories(): HasMany
    {
        return $this->hasMany(ExpenseCategory::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    // TAMBAHKAN RELASI INI
    public function revenues(): HasMany
    {
        return $this->hasMany(Revenue::class);
    }

    // Helper: Total Modal
    public function getTotalCapitalAttribute(): float
    {
        return $this->capitalRecords()->sum('amount');
    }

    // Helper: Total Pengeluaran
    public function getTotalExpensesAttribute(): float
    {
        return $this->expenses()->sum('amount');
    }

    // Helper: Total Pendapatan
    public function getTotalRevenueAttribute(): float
    {
        return $this->revenues()->sum('amount');
    }

    // Helper: Sisa Modal
    public function getRemainingCapitalAttribute(): float
    {
        return $this->total_capital - $this->total_expenses;
    }

    public function capitals()
    {
        return $this->hasMany(CapitalRecord::class);
    }
     public function getRoiEstimationAttribute(): array
    {
        if ($this->initial_investment <= 0) {
            return [
                'months' => 0,
                'days' => 0,
                'percentage' => 0,
                'remaining' => $this->initial_investment,
                'is_profitable' => false,
            ];
        }

        $avgMonthlyProfit = $this->calculateAverageMonthlyProfit();
        $remainingInvestment = max(0, $this->initial_investment - $this->net_profit);
        
        if ($avgMonthlyProfit <= 0) {
            return [
                'months' => INF,
                'days' => INF,
                'percentage' => 0,
                'remaining' => $remainingInvestment,
                'is_profitable' => false,
            ];
        }

        $monthsToRoi = $remainingInvestment / $avgMonthlyProfit;
        $daysToRoi = $monthsToRoi * 30;
        $completionPercentage = min(100, ($this->net_profit / $this->initial_investment) * 100);

        return [
            'months' => round($monthsToRoi, 1),
            'days' => round($daysToRoi, 1),
            'percentage' => round($completionPercentage, 1),
            'remaining' => round($remainingInvestment, 2),
            'is_profitable' => $this->net_profit > 0,
        ];
    }


    private function calculateAverageMonthlyProfit(): float
    {
        $monthsOperating = $this->getMonthsOperating();
        
        if ($monthsOperating <= 0) {
            return 0;
        }

        return $this->net_profit / $monthsOperating;
    }

    private function getMonthsOperating(): int
    {
        if (!$this->started_at) {
            return 0;
        }

        $start = $this->started_at;
        $now = now();
        
        return $start->diffInMonths($now) ?: 1;
    }

    // Update totals when revenue is added
    public function updateTotals(): void
    {
        $this->total_revenue = $this->revenues()->sum('amount');
        // Anda mungkin perlu menambahkan logika untuk expenses juga
        $this->net_profit = $this->total_revenue - $this->total_expense;
        $this->save();
    }

}