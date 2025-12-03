import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

interface Props {
    email?: string;
    status?: string;
}

export default function VerifyCode({ email = '', status }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: email,
        code: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/verify/code', {
            onError: () => {
                reset('code');
            }
        });
    };

    const resendCode = (e: React.MouseEvent) => {
        e.preventDefault();
        post('/verify/code/resend', {
            preserveScroll: true,
            onSuccess: () => {
                
            },
        });
    };

    return (
        <AuthLayout
            title="Verifikasi Email"
            description="Masukkan 6 digit kode yang telah kami kirim ke email Anda."
            variant="login"
        >
            <Head title="Verifikasi Email" />

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                    >
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        readOnly
                        className="h-12 border-gray-200 bg-gray-100"
                    />
                    <InputError message={errors.email} />
                    {data.email && (
                        <p className="text-xs text-gray-500">
                            Kode verifikasi telah dikirim ke email ini
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="code"
                        className="text-sm font-medium text-gray-700"
                    >
                        Kode Verifikasi
                    </Label>
                    <Input
                        id="code"
                        type="text"
                        maxLength={6}
                        inputMode="numeric"
                        autoFocus
                        required
                        value={data.code}
                        onChange={(e) =>
                            setData('code', e.target.value.replace(/\D/g, ''))
                        }
                        className="h-12 border-gray-200 bg-gray-50 text-center text-2xl tracking-widest focus:bg-white"
                        placeholder="● ● ● ● ● ●"
                    />
                    <InputError message={errors.code} />
                </div>

                <Button
                    type="submit"
                    className="h-12 w-full bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800"
                    disabled={processing || data.code.length !== 6}
                >
                    {processing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        'Verifikasi'
                    )}
                </Button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={resendCode}
                        disabled={processing}
                        className="text-sm text-sky-600 hover:text-sky-700 hover:underline disabled:opacity-50"
                    >
                        Kirim ulang kode verifikasi
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}