<?php

use App\Http\Controllers\EmailVerificationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User as ModelsUser;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');


 // Route verifikasi email - satu set saja
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
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


require __DIR__ . '/settings.php';
