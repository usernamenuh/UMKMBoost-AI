<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id',
        'name',
        'icon',
        'color',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
        ];
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    // Helper: Total pengeluaran per kategori
    public function getTotalAmountAttribute(): float
    {
        return $this->expenses()->sum('amount');
    }
     protected $appends = ['expenses_sum_amount_formatted'];
    
    /**
     * Get the formatted expenses sum amount.
     *
     * @return float
     */
    public function getExpensesSumAmountFormattedAttribute()
    {
        return $this->expenses_sum_amount ? (float)$this->expenses_sum_amount : 0;
    }
}