<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi - UMKMBoot AI</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" style="padding: 40px 40px 30px 40px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 16px 16px 0 0;">
                            <h1 style="
    margin: 0; 
    color: #dfe0e0; /* Biru Google/Aksen yang Kuat */
    font-size: 28px; 
    font-weight: 700; /* Lebih tebal */
    text-align: center; /* Pastikan berada di tengah */
    padding: 10px 0;
">
    UMKMBoost AI
</h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 22px; font-weight: 600; text-align: center;">
                                Kode Verifikasi Email
                            </h2>
                            <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6; text-align: center;">
                                Gunakan kode berikut untuk memverifikasi alamat email Anda. Kode ini berlaku selama 10 menit.
                            </p>
                            
                            <!-- Verification Code Box -->
                            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px dashed #3b82f6; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
                                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                    Kode Verifikasi Anda
                                </p>
                                <h1 style="margin: 0; color: #1e40af; font-size: 42px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                    {{ $code }}
                                </h1>
                            </div>
                            
                            <!-- Warning -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 16px; margin-bottom: 30px;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    <strong>⚠️ Penting:</strong> Jangan bagikan kode ini kepada siapa pun. Tim UMKMBoot AI tidak akan pernah meminta kode verifikasi Anda.
                                </p>
                            </div>
                            
                            <p style="margin: 0; color: #94a3b8; font-size: 14px; text-align: center; line-height: 1.6;">
                                Jika Anda tidak meminta kode verifikasi ini, abaikan email ini atau hubungi tim dukungan kami.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 16px 16px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; text-align: center;">
                                &copy; {{ date('Y') }} UMKMBoot AI. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">
                                Email ini dikirim secara otomatis, mohon tidak membalas email ini.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
