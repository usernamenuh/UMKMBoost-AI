import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCoin, IconDeviceFloppy } from '@tabler/icons-react';
import { ChangeEvent, FormEventHandler, useState } from 'react';

interface Business {
    id: number;
    name: string;
    type: string;
}

interface Props {
    business: Business;
}

const formatCurrencyInput = (value: string) => {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');

    if (!digits) return '';

    return new Intl.NumberFormat('id-ID').format(Number(digits));
};

export default function CreateRevenue({ business }: Props) {
    const [amountDisplay, setAmountDisplay] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        description: '',
        amount: '',
        revenue_date: new Date().toISOString().split('T')[0],
        category: 'Penjualan',
        notes: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: business.name, href: `/business/${business.id}` },
        { title: 'Pendapatan', href: `/business/${business.id}/revenues` },
        { title: 'Tambah Pendapatan', href: '#' },
    ];

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const digitsOnly = rawValue.replace(/\D/g, '');

        setData('amount', digitsOnly);
        setAmountDisplay(formatCurrencyInput(rawValue));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/business/${business.id}/revenues`);
    };

    const categories = ['Penjualan', 'Jasa', 'Komisi', 'Investasi', 'Lainnya'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tambah Pendapatan - ${business.name}`} />

            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Tambah Pendapatan
                        </h1>
                        <p className="mt-2 text-base text-gray-600">
                            Catat pendapatan baru untuk{' '}
                            <span className="font-semibold text-gray-900">
                                {business.name}
                            </span>
                        </p>
                    </div>
                    <Link
                        href={`/business/${business.id}/revenues`}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <IconArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
                        <div className="rounded-lg bg-green-100 p-4">
                            <IconCoin className="h-7 w-7 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Form Pendapatan
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Isi detail pendapatan yang diterima
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-7">
                        {/* Deskripsi - Full Width */}
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-3 block text-sm font-semibold text-gray-700"
                            >
                                Deskripsi Pendapatan{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Contoh: Penjualan produk, Pembayaran jasa, dll"
                                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Jumlah, Tanggal, Kategori - 3 Column Grid */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Jumlah */}
                            <div>
                                <label
                                    htmlFor="amount"
                                    className="mb-3 block text-sm font-semibold text-gray-700"
                                >
                                    Jumlah Pendapatan{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-medium text-gray-500">
                                        Rp
                                    </span>
                                    <input
                                        id="amount"
                                        type="text"
                                        inputMode="numeric"
                                        value={amountDisplay}
                                        onChange={handleAmountChange}
                                        placeholder="0"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-14 pr-5 text-base transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                    />
                                </div>
                                {errors.amount && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.amount}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label
                                    htmlFor="revenue_date"
                                    className="mb-3 block text-sm font-semibold text-gray-700"
                                >
                                    Tanggal Pendapatan{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="revenue_date"
                                    type="date"
                                    value={data.revenue_date}
                                    onChange={(e) =>
                                        setData('revenue_date', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                />
                                {errors.revenue_date && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.revenue_date}
                                    </p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div>
                                <label
                                    htmlFor="category"
                                    className="mb-3 block text-sm font-semibold text-gray-700"
                                >
                                    Kategori
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Catatan - Full Width */}
                        <div>
                            <label
                                htmlFor="notes"
                                className="mb-3 block text-sm font-semibold text-gray-700"
                            >
                                Catatan (Opsional)
                            </label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                rows={4}
                                placeholder="Tambahkan catatan tambahan jika diperlukan..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                            />
                            {errors.notes && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.notes}
                                </p>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-8">
                            <Link
                                href={`/business/${business.id}/revenues`}
                                className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-lg bg-green-600 px-7 py-3 text-base font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <IconDeviceFloppy className="h-5 w-5" />
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Pendapatan'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-6 w-6 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-blue-900">
                                Tips Mencatat Pendapatan
                            </h3>
                            <div className="mt-3 text-sm text-blue-800">
                                <ul className="list-inside list-disc space-y-2">
                                    <li>
                                        Catat pendapatan segera setelah
                                        transaksi terjadi
                                    </li>
                                    <li>
                                        Pastikan jumlah yang dicatat akurat dan
                                        sesuai bukti
                                    </li>
                                    <li>
                                        Gunakan kategori yang konsisten untuk
                                        memudahkan analisis
                                    </li>
                                    <li>
                                        Tambahkan catatan untuk transaksi yang
                                        perlu penjelasan khusus
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
