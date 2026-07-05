import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    IconArrowLeft, 
    IconPlus, 
    IconEdit, 
    IconTrash, 
    IconCurrencyDollar,
    IconTrendingUp,
    IconWallet,
    IconCalendar,
    IconInfoCircle,
    IconChevronLeft,
    IconChevronRight
} from '@tabler/icons-react';

interface CapitalRecord {
    id: number;
    amount: number;
    source: string | null;
    description: string | null;
    recorded_at: string;
    created_at: string;
}

interface Business {
    id: number;
    name: string;
}

interface CapitalIndexProps {
    business: Business;
    capitals: CapitalRecord[] | {
        data: CapitalRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links?: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    total: number;
}

export default function CapitalIndex({ business, capitals, total }: CapitalIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const { delete: deleteCapital, processing: deleting } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus catatan modal ini?')) {
            deleteCapital(`/business/${business.id}/capital/${id}`, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    // Handle data capitals (bisa array biasa atau pagination object)
    let capitalData: CapitalRecord[] = [];
    let pagination = null;

    if (Array.isArray(capitals)) {
        capitalData = capitals;
    } else if (capitals && typeof capitals === 'object' && 'data' in capitals) {
        capitalData = capitals.data || [];
        pagination = capitals;
    }

    // Hitung total modal
    const calculatedTotal = capitalData.reduce((sum, record) => sum + record.amount, 0);
    const displayTotal = total || calculatedTotal;

    return (
        <AppLayout>
            <Head title={`Modal - ${business.name}`} />
            
            <div className="flex flex-col h-full gap-8 p-8">
                {/* Header */}
                <div>
                    <Link
                        href={`/business/${business.id}`}
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 mb-4"
                    >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Kembali ke Bisnis
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Modal - {business.name}
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        Kelola catatan modal bisnis Anda
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white/20 rounded-lg">
                                <IconWallet className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-100">Total Modal</p>
                                <p className="text-3xl font-bold mt-2">
                                    {formatCurrency(displayTotal)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                                <IconTrendingUp className="h-8 w-8 text-green-600 dark:text-green-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Jumlah Catatan</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                    {capitalData.length}
                                    {pagination && ` dari ${pagination.total}`}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <IconCurrencyDollar className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rata-rata per Catatan</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                    {capitalData.length > 0 
                                        ? formatCurrency(displayTotal / capitalData.length)
                                        : formatCurrency(0)
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Info Section */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <IconInfoCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tentang Modal</h2>
                            </div>
                            <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                Modal adalah dana awal yang Anda investasikan untuk memulai dan menjalankan bisnis Anda. 
                                Catat setiap tambahan modal untuk melacak total investasi Anda.
                            </p>
                            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                                <li className="flex items-start gap-3">
                                    <IconCurrencyDollar className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Modal awal untuk memulai bisnis</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconTrendingUp className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <span>Tambahan modal untuk ekspansi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconWallet className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <span>Investasi dari investor atau pinjaman</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href={`/business/${business.id}/capital/create`}
                            className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
                        >
                            <IconPlus className="h-5 w-5 mr-2" />
                            Tambah Modal Baru
                        </Link>
                    </div>

                    {/* Capital List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <IconCurrencyDollar className="h-6 w-6 text-green-600 dark:text-green-400" />
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Daftar Modal</h2>
                                    </div>
                                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-4 py-2 rounded-full font-semibold">
                                        {capitalData.length} catatan
                                        {pagination && ` dari ${pagination.total}`}
                                    </span>
                                </div>
                            </div>

                            {capitalData.length === 0 ? (
                                <div className="text-center py-12">
                                    <IconCurrencyDollar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        Belum ada catatan modal
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Tambah modal pertama untuk memulai
                                    </p>
                                    <div className="mt-4">
                                        <Link
                                            href={`/business/${business.id}/capital/create`}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            <IconPlus className="h-4 w-4 mr-2" />
                                            Tambah Modal Pertama
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="divide-y divide-gray-200">
                                        {capitalData.map((capital) => (
                                            <div
                                                key={capital.id}
                                                className="p-6 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="p-2 bg-green-100 rounded-lg">
                                                                    <IconCurrencyDollar className="h-5 w-5 text-green-600" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-medium text-gray-900">
                                                                        {capital.source || 'Tidak ada sumber'}
                                                                    </h3>
                                                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                                                        <IconCalendar className="h-4 w-4 mr-1" />
                                                                        {formatDate(capital.recorded_at)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-lg font-bold text-green-600">
                                                                    + {formatCurrency(capital.amount)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {capital.description && (
                                                            <div className="mt-3 ml-11">
                                                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                                    {capital.description}
                                                                </p>
                                                            </div>
                                                        )}
                                                        
                                                        <div className="flex justify-between items-center mt-4">
                                                            <div className="text-xs text-gray-400">
                                                                Dibuat: {formatDate(capital.created_at)}
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <Link
                                                                    href={`/business/${business.id}/capital/${capital.id}/edit`}
                                                                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                                                                >
                                                                    <IconEdit className="h-4 w-4 mr-1" />
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(capital.id)}
                                                                    disabled={deleting}
                                                                    className="inline-flex items-center px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 disabled:opacity-50"
                                                                >
                                                                    <IconTrash className="h-4 w-4 mr-1" />
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {pagination && pagination.last_page > 1 && (
                                        <div className="px-6 py-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-700">
                                                    Menampilkan {capitalData.length} dari {pagination.total} catatan
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {pagination.current_page > 1 && (
                                                        <Link
                                                            href={`/business/${business.id}/capital?page=${pagination.current_page - 1}`}
                                                            className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                                                        >
                                                            <IconChevronLeft className="h-4 w-4 mr-1" />
                                                            Sebelumnya
                                                        </Link>
                                                    )}
                                                    
                                                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                                        <Link
                                                            key={page}
                                                            href={`/business/${business.id}/capital?page=${page}`}
                                                            className={`px-3 py-1 text-sm border rounded ${
                                                                pagination.current_page === page
                                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                                    : 'border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {page}
                                                        </Link>
                                                    ))}
                                                    
                                                    {pagination.current_page < pagination.last_page && (
                                                        <Link
                                                            href={`/business/${business.id}/capital?page=${pagination.current_page + 1}`}
                                                            className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                                                        >
                                                            Selanjutnya
                                                            <IconChevronRight className="h-4 w-4 ml-1" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Summary */}
                                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-600">
                                                Total {capitalData.length} catatan modal
                                                {pagination && ` dari ${pagination.total}`}
                                            </div>
                                            <div className="text-lg font-bold text-green-600">
                                                {formatCurrency(displayTotal)}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
