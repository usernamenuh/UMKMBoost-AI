<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && is_null(Auth::user()->email_verified_at)) {
            // Jika user belum verifikasi, logout dan redirect ke verify
            $email = Auth::user()->email;
            Auth::logout();
            
            return redirect()->route('verify.code', ['email' => $email])
                ->with('status', 'Silakan verifikasi email Anda terlebih dahulu.');
        }

        return $next($request);
    }
}