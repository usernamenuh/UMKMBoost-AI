<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\RevenueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GoogleAuthController;
use Laravel\Fortify\Features;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\CapitalRecordController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Models\Revenue;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('landing', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Google OAuth
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

// Email Verification
Route::get('/verify/code', function () {
    $email = request()->query('email', session('email'));
    return Inertia::render('auth/verify-code', [
        'email' => $email,
        'status' => session('status')
    ]);
})->name('verify.code');

Route::post('/verify/code', [EmailVerificationController::class, 'verify'])
    ->name('verify.code.submit');

Route::post('/verify/code/resend', [EmailVerificationController::class, 'resend'])
    ->name('verify.code.resend');

// Password Reset dengan OTP
Route::get('/forgot-password', [PasswordResetController::class, 'requestCode'])
    ->middleware('guest')
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetController::class, 'sendCode'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/password/verify-code', [PasswordResetController::class, 'showVerifyCode'])
    ->middleware('guest')
    ->name('password.verify.code');

Route::post('/password/verify-code', [PasswordResetController::class, 'verifyCode'])
    ->middleware('guest')
    ->name('password.verify.code.submit');

Route::post('/password/resend-code', [PasswordResetController::class, 'resendCode'])
    ->middleware('guest')
    ->name('password.resend.code');

Route::get('/reset-password', [PasswordResetController::class, 'showResetForm'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [PasswordResetController::class, 'reset'])
    ->middleware('guest')
    ->name('password.update');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Business Routes
    Route::resource('business', BusinessController::class);
    
    // Capital & Expense Routes untuk business tertentu
    Route::prefix('business/{business}')->group(function () {
        // Capital
        Route::get('capital', [CapitalRecordController::class, 'index'])->name('capital.index');
        Route::get('capital/create', [CapitalRecordController::class, 'create'])->name('capital.create');
        Route::post('capital', [CapitalRecordController::class, 'store'])->name('capital.store');
        Route::get('capital/{capital}/edit', [CapitalRecordController::class, 'edit'])->name('capital.edit');
        Route::put('capital/{capital}', [CapitalRecordController::class, 'update'])->name('capital.update');
        Route::delete('capital/{capital}', [CapitalRecordController::class, 'destroy'])->name('capital.destroy');
        
        // Expense
        Route::get('expense', [ExpenseController::class, 'index'])->name('expense.index');
        Route::get('expense/create', [ExpenseController::class, 'create'])->name('expense.create');
        Route::post('expense', [ExpenseController::class, 'store'])->name('expense.store');
        Route::get('expense/{expense}/edit', [ExpenseController::class, 'edit'])->name('expense.edit');
        Route::put('expense/{expense}', [ExpenseController::class, 'update'])->name('expense.update');
        Route::delete('expense/{expense}', [ExpenseController::class, 'destroy'])->name('expense.destroy');
        
        // Categories
        Route::get('categories', [ExpenseCategoryController::class, 'index'])->name('expense-category.index');
        Route::post('categories', [ExpenseCategoryController::class, 'store'])->name('expense-category.store');
        Route::put('categories/{category}', [ExpenseCategoryController::class, 'update'])->name('expense-category.update');
        Route::delete('categories/{category}', [ExpenseCategoryController::class, 'destroy'])->name('expense-category.destroy');
        
        // Revenue routes - TAMBAH INI DI DALAM GROUP YANG SAMA
        Route::get('revenues', [RevenueController::class, 'index'])
            ->name('business.revenues.index');
        Route::get('revenues/create', [RevenueController::class, 'create'])
            ->name('business.revenues.create');
        Route::post('revenues', [RevenueController::class, 'store'])
            ->name('business.revenues.store');
        Route::get('revenues/{revenue}/edit', [RevenueController::class, 'edit'])
            ->name('business.revenues.edit');
        Route::put('revenues/{revenue}', [RevenueController::class, 'update'])
            ->name('business.revenues.update');
        Route::delete('revenues/{revenue}', [RevenueController::class, 'destroy'])
            ->name('business.revenues.destroy');
    });
});

require __DIR__ . '/settings.php';