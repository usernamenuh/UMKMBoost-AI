<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailCodeMail;

class EmailVerificationController extends Controller
{
    /**
     * Verifikasi Kode OTP
     */
    public function verify(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'code' => 'required|digits:6'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan.']);
        }

        if ($user->email_verification_code != $validated['code']) {
            return back()->withErrors(['code' => 'Kode verifikasi salah.']);
        }

        // Tandai email sudah terverifikasi
        $user->update([
            'email_verified_at' => now(),
            'email_verification_code' => null,
        ]);

        // Login user setelah verifikasi berhasil
        Auth::login($user);

        return redirect()->route('dashboard')->with('status', 'Email berhasil diverifikasi!');
    }

    /**
     * Resend kode OTP
     */
    public function resend(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan.']);
        }

        // Generate kode baru
        $code = rand(100000, 999999);

        $user->update([
            'email_verification_code' => $code
        ]);

        // Kirim ulang email menggunakan Mailable
        Mail::to($user->email)->send(new VerifyEmailCodeMail($code));

        return back()->with('status', 'Kode verifikasi baru telah dikirim.');
    }
}