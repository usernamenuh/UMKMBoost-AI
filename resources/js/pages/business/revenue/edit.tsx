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

interface Revenue {
    id: number;
    description: string;
    amount: number;
    revenue_date: string;
    category: string;
    notes: string;
}

interface Props {
    business: Business;
    revenue: Revenue;
}

export default function EditRevenue({ business, revenue }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        description: revenue.description || '',
        amount: revenue.amount || '',
        revenue_date: revenue.revenue_date || new Date().toISOString().split('T')[0],
        category: revenue.category || 'Penjualan',
        notes: revenue.notes || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: business.name, href: `/business/${business.id}` },
        { title: 'Pendapatan', href: `/business/${business.id}/revenues` },
        { title: 'Edit Pendapatan', href: '#' },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/business/${business.id}/revenues/${revenue.id}`);
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
            <Head title={`Edit Pendapatan - ${business.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Pendapatan</h1>
                        <p className="text-base text-gray-600 mt-2">
                            Perbarui pendapatan untuk <span className="font-semibold text-gray-900">{business.name}</span>
                        </p>
                    </div>
                    <Link
                        href={`/business/${business.id}/revenues`}
                        className="flex items-center gap-2 px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                        <IconArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                        <div className="p-4 bg-green-100 rounded-lg">
                            <IconCoin className="h-7 w-7 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Edit Pendapatan</h2>
                            <p className="text-sm text-gray-600 mt-1">Perbarui detail pendapatan yang diterima</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-7">
                        {/* Deskripsi */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                                Deskripsi Pendapatan <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Contoh: Penjualan produk, Pembayaran jasa, dll"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base transition"
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Jumlah, Tanggal, Kategori - 3 Column Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Jumlah */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Jumlah Pendapatan <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                                    <input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="0"
                                        className="w-full pl-14 pr-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base transition"
                                    />
                                </div>
                                {errors.amount && (
                                    <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label htmlFor="revenue_date" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Tanggal Pendapatan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="revenue_date"
                                    type="date"
                                    value={data.revenue_date}
                                    onChange={(e) => setData('revenue_date', e.target.value)}
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base transition"
                                />
                                {errors.revenue_date && (
                                    <p className="mt-2 text-sm text-red-600">{errors.revenue_date}</p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Kategori
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base transition"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>
                        </div>

                        {/* Catatan - Full Width */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-3">
                                Catatan (Opsional)
                            </label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={4}
                                placeholder="Tambahkan catatan tambahan jika diperlukan..."
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none text-base transition resize-none"
                            />
                            {errors.notes && (
                                <p className="mt-2 text-sm text-red-600">{errors.notes}</p>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-200">
                            <Link
                                href={`/business/${business.id}/revenues`}
                                className="px-7 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-base"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-7 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-base"
                            >
                                <IconDeviceFloppy className="h-5 w-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
