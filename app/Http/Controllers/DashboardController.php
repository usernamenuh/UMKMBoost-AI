<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Expense;
use App\Models\Revenue;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Ambil ID bisnis user terlebih dahulu
        $businessIds = $user->businesses->pluck('id')->toArray();
        
        // Ambil semua bisnis user dengan relasi
        $businesses = $user->businesses()
            ->withSum('capitalRecords', 'amount')
            ->withSum('expenses', 'amount')
            ->withSum('revenues', 'amount')
            ->get()
            ->map(function ($business) {
                $totalRevenue = $business->revenues_sum_amount ?? 0;
                $totalExpenses = $business->expenses_sum_amount ?? 0;
                $netProfit = $totalRevenue - $totalExpenses;
                
                return [
                    'id' => $business->id,
                    'name' => $business->name,
                    'type' => $business->type ?? 'Tidak ada',
                    'description' => $business->description,
                    'total_capital' => $business->capital_records_sum_amount ?? 0,
                    'total_expenses' => $totalExpenses,
                    'total_revenue' => $totalRevenue,
                    'net_profit' => $netProfit,
                    'initial_investment' => $business->initial_investment ?? 0,
                    'created_at' => $business->created_at->format('Y-m-d'),
                ];
            });

        // Hitung total statistik
        $total_capital = $businesses->sum('total_capital');
        $total_expenses = $businesses->sum('total_expenses');
        $total_revenue = $businesses->sum('total_revenue');
        $total_profit = $total_revenue - $total_expenses;
        
        // Hitung total investasi awal
        $total_investment = $businesses->sum('initial_investment');

        // Hitung ROI percentage
        $roi_percentage = $total_investment > 0 
            ? min(100, ($total_profit / $total_investment) * 100)
            : 0;

        // Ambil kategori pengeluaran teratas
        $top_expense_categories = $this->getTopExpenseCategories($businessIds);

        // Ambil pendapatan terbaru
        $recent_revenues = $this->getRecentRevenues($businessIds);

        // Hitung estimasi balik modal
        $roi_estimation = $this->calculateROIEstimation($businesses, $total_investment, $total_profit);

        return Inertia::render('dashboard', [
            'businesses' => $businesses,
            'total_capital' => $total_capital,
            'total_expenses' => $total_expenses,
            'total_revenue' => $total_revenue,
            'total_profit' => $total_profit,
            'roi_percentage' => round($roi_percentage, 1),
            'top_expense_categories' => $top_expense_categories,
            'recent_revenues' => $recent_revenues,
            'roi_estimation' => $roi_estimation,
        ]);
    }

    private function getTopExpenseCategories($businessIds)
    {
        $top_expense_categories = collect();
        
        if (empty($businessIds)) {
            return $top_expense_categories;
        }
        
        // Ambil semua expenses user
        $userExpenses = Expense::whereIn('business_id', $businessIds)->get();
        
        if ($userExpenses->isEmpty()) {
            return $top_expense_categories;
        }

        // Kelompokkan berdasarkan kategori
        $categoryTotals = [];
        
        foreach ($userExpenses as $expense) {
            $categoryName = $expense->category?->name ?? 'Tanpa Kategori';
            
            if (!isset($categoryTotals[$categoryName])) {
                $categoryTotals[$categoryName] = 0;
            }
            
            $categoryTotals[$categoryName] += $expense->amount;
        }
        
        // Urutkan dari terbesar ke terkecil
        arsort($categoryTotals);
        
        // Ambil 5 teratas
        $topCategories = array_slice($categoryTotals, 0, 5, true);
        
        $total_expenses = array_sum($categoryTotals);
        
        // Format data
        $top_expense_categories = collect($topCategories)->map(function ($total, $name) use ($total_expenses) {
            $percentage = $total_expenses > 0 ? ($total / $total_expenses) * 100 : 0;
            
            return [
                'name' => $name,
                'total' => $total,
                'percentage' => round($percentage, 1),
            ];
        })->values();

        return $top_expense_categories;
    }

    private function getRecentRevenues($businessIds)
    {
        if (empty($businessIds)) {
            return collect();
        }
        
        return Revenue::with('business')
            ->whereIn('business_id', $businessIds)
            ->latest('revenue_date')
            ->take(5)
            ->get()
            ->map(function($revenue) {
                return [
                    'id' => $revenue->id,
                    'business_id' => $revenue->business_id,
                    'business_name' => $revenue->business->name ?? 'Unknown Business',
                    'description' => $revenue->description,
                    'amount' => $revenue->amount,
                    'revenue_date' => $revenue->revenue_date->format('Y-m-d'),
                    'category' => $revenue->category ?? 'Uncategorized',
                ];
            });
    }

    private function calculateROIEstimation($businesses, $totalInvestment, $totalProfit)
    {
        $roiEstimation = [
            'percentage' => 0.0,
            'remaining' => (float) $totalInvestment,
            'is_profitable' => false,
            'months' => 0.0,
            'days' => 0,
            'monthly_profit' => 0.0,
        ];

        if ($totalInvestment <= 0 || $businesses->isEmpty()) {
            return $roiEstimation;
        }

        // Hitung persentase ROI (max 100%)
        $roiEstimation['percentage'] = (float) min(100, ($totalProfit / $totalInvestment) * 100);
        $roiEstimation['remaining'] = (float) max(0, $totalInvestment - $totalProfit);
        $roiEstimation['is_profitable'] = $totalProfit >= $totalInvestment;

        // Jika sudah balik modal
        if ($roiEstimation['is_profitable']) {
            return $roiEstimation;
        }

        // Hitung estimasi waktu balik modal berdasarkan profit rata-rata per bulan
        if ($totalProfit > 0 && $businesses->isNotEmpty()) {
            // Cari bisnis tertua untuk menghitung durasi operasional
            $oldestBusiness = $businesses->sortBy('created_at')->first();
            
            if ($oldestBusiness) {
                $createdAt = Carbon::parse($oldestBusiness['created_at']);
                $now = Carbon::now();
                
                // Hitung bulan operasional (minimal 1 bulan)
                $monthsOperating = max(1, $createdAt->diffInMonths($now));
                
                // Jika kurang dari 1 bulan, hitung berdasarkan hari
                if ($monthsOperating < 1 || $createdAt->diffInDays($now) < 30) {
                    $daysOperating = max(1, $createdAt->diffInDays($now));
                    $dailyProfit = $totalProfit / $daysOperating;
                    
                    if ($dailyProfit > 0 && $roiEstimation['remaining'] > 0) {
                        $daysToROI = $roiEstimation['remaining'] / $dailyProfit;
                        $roiEstimation['days'] = (int) round($daysToROI);
                        $roiEstimation['months'] = (float) round($daysToROI / 30, 1);
                        $roiEstimation['monthly_profit'] = (float) ($dailyProfit * 30);
                    }
                } else {
                    // Hitung profit rata-rata per bulan
                    $avgMonthlyProfit = $totalProfit / $monthsOperating;
                    $roiEstimation['monthly_profit'] = (float) $avgMonthlyProfit;
                    
                    if ($avgMonthlyProfit > 0 && $roiEstimation['remaining'] > 0) {
                        $monthsToROI = $roiEstimation['remaining'] / $avgMonthlyProfit;
                        $roiEstimation['months'] = (float) round($monthsToROI, 1);
                        $roiEstimation['days'] = (int) round($monthsToROI * 30);
                    }
                }
            }
        }

        return $roiEstimation;
    }
}