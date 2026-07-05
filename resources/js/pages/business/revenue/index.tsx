import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconPlus, IconCoin, IconTrash, IconEdit, IconArrowLeft } from '@tabler/icons-react';

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
    notes: string | null;
}

interface PaginatedRevenues {
    data: Revenue[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    business: Business;
    revenues: PaginatedRevenues;
}

export default function RevenueIndex({ business, revenues }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: business.name, href: `/business/${business.id}` },
        { title: 'Pendapatan', href: '#' },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pendapatan ini?')) {
            router.delete(`/business/${business.id}/revenues/${id}`);
        }
    };

    const totalRevenue = revenues.data.reduce((sum, rev) => sum + Number(rev.amount), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pendapatan - ${business.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Pendapatan - {business.name}</h1>
                        <p className="text-base text-gray-600 mt-2">
                            Kelola semua pendapatan bisnis Anda
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/business/${business.id}`}
                            className="flex items-center gap-2 px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                        >
                            <IconArrowLeft className="h-5 w-5" />
                            Kembali
                        </Link>
                        <Link
                            href={`/business/${business.id}/revenues/create`}
                            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            <IconPlus className="h-5 w-5" />
                            Tambah Pendapatan
                        </Link>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white/20 rounded-lg">
                                <IconCoin className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-green-100">Total Pendapatan</p>
                                <h3 className="text-3xl font-bold mt-2">{formatCurrency(totalRevenue)}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8">
                        <p className="text-sm font-medium text-gray-600">Jumlah Transaksi</p>
                        <h3 className="text-3xl font-bold mt-3">{revenues.total}</h3>
                        <p className="text-xs text-gray-500 mt-2">Total pencatatan</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8">
                        <p className="text-sm font-medium text-gray-600">Rata-rata per Transaksi</p>
                        <h3 className="text-3xl font-bold mt-3">
                            {revenues.total > 0 ? formatCurrency(totalRevenue / revenues.total) : formatCurrency(0)}
                        </h3>
                        <p className="text-xs text-gray-500 mt-2">Nilai rata-rata</p>
                    </div>
                </div>

                {/* Revenue List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
                    <div className="p-8 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Daftar Pendapatan</h2>
                        <p className="text-base text-gray-600 mt-2">Semua pendapatan yang telah dicatat</p>
                    </div>

                    {revenues.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left py-4 px-8 text-sm font-semibold text-gray-700">Tanggal</th>
                                            <th className="text-left py-4 px-8 text-sm font-semibold text-gray-700">Deskripsi</th>
                                            <th className="text-left py-4 px-8 text-sm font-semibold text-gray-700">Kategori</th>
                                            <th className="text-right py-4 px-8 text-sm font-semibold text-gray-700">Jumlah</th>
                                            <th className="text-center py-4 px-8 text-sm font-semibold text-gray-700">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenues.data.map((revenue) => (
                                            <tr key={revenue.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                                <td className="py-5 px-8">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {formatDate(revenue.revenue_date)}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-8">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{revenue.description}</p>
                                                        {revenue.notes && (
                                                            <p className="text-sm text-gray-600 mt-1">{revenue.notes}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-5 px-8">
                                                    <span className="inline-flex px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
                                                        {revenue.category}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-8 text-right">
                                                    <span className="text-lg font-bold text-green-600">
                                                        {formatCurrency(Number(revenue.amount))}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-8">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <Link
                                                            href={`/business/${business.id}/revenues/${revenue.id}/edit`}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <IconEdit className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(revenue.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <IconTrash className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {revenues.last_page > 1 && (
                                <div className="p-8 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-700">
                                            Menampilkan <span className="font-semibold">{revenues.data.length}</span> dari{' '}
                                            <span className="font-semibold">{revenues.total}</span> data
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: revenues.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={`/business/${business.id}/revenues?page=${page}`}
                                                    className={`px-4 py-2 rounded font-medium transition ${
                                                        page === revenues.current_page
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {page}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <IconCoin className="h-20 w-20 text-gray-300 mx-auto" />
                            <h3 className="mt-6 text-xl font-bold text-gray-900">Belum ada pendapatan</h3>
                            <p className="mt-3 text-base text-gray-600">
                                Mulai catat pendapatan pertama Anda untuk bisnis ini
                            </p>
                            <Link
                                href={`/business/${business.id}/revenues/create`}
                                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-base"
                            >
                                <IconPlus className="h-5 w-5" />
                                Tambah Pendapatan Pertama
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
