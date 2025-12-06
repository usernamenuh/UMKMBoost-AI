import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconCoin, IconDeviceFloppy } from '@tabler/icons-react';
import { FormEventHandler } from 'react';

interface Business {
    id: number;
    name: string;
    type: string;
}

interface Props {
    business: Business;
}

export default function CreateRevenue({ business }: Props) {
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/business/${business.id}/revenues`);
    };

    const categories = [
        'Penjualan',
        'Jasa',
        'Komisi',
        'Investasi',
        'Lainnya',
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tambah Pendapatan - ${business.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Pendapatan</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Catat pendapatan baru untuk <span className="font-medium text-gray-700">{business.name}</span>
                        </p>
                    </div>
                    <Link
                        href={`/business/${business.id}/revenues`}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <IconArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <IconCoin className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Form Pendapatan</h2>
                            <p className="text-sm text-gray-500">Isi detail pendapatan yang diterima</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Deskripsi */}
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi Pendapatan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Contoh: Penjualan produk, Pembayaran jasa, dll"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Jumlah */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Jumlah Pendapatan <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                                    <input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="0"
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label htmlFor="revenue_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Pendapatan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="revenue_date"
                                    type="date"
                                    value={data.revenue_date}
                                    onChange={(e) => setData('revenue_date', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                {errors.revenue_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.revenue_date}</p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div className="md:col-span-2">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            {/* Catatan */}
                            <div className="md:col-span-2">
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                    Catatan (Opsional)
                                </label>
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={4}
                                    placeholder="Tambahkan catatan tambahan jika diperlukan..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                />
                                {errors.notes && (
                                    <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                            <Link
                                href={`/business/${business.id}/revenues`}
                                className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                <IconDeviceFloppy className="h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Pendapatan'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-blue-900">Tips Mencatat Pendapatan</h3>
                            <div className="mt-2 text-sm text-blue-800">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Catat pendapatan segera setelah transaksi terjadi</li>
                                    <li>Pastikan jumlah yang dicatat akurat dan sesuai bukti</li>
                                    <li>Gunakan kategori yang konsisten untuk memudahkan analisis</li>
                                    <li>Tambahkan catatan untuk transaksi yang perlu penjelasan khusus</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}