<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyEmailCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;

    /**
     * Create a new message instance.
     *
     * @param  string|int  $code
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Build the message.
     */
    public function build()
{
    return $this->subject('Kode Verifikasi Email Anda')
                ->view('emails.verify-code')
                ->with([
                    'code' => $this->code,
                ]);
    // Hapus blok attachData di sini.
}
}
