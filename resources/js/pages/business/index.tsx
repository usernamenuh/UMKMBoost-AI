import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    IconBuilding, 
    IconPlus, 
    IconCurrencyDollar, 
    IconTrendingUp, 
    IconTrendingDown,
    IconCategory,
    IconSettings,
    IconReceipt 
} from '@tabler/icons-react';

interface Business {
    id: number;
    name: string;
    type: string | null;
    description: string | null;
    is_active: boolean;
    initial_investment: number;
    total_revenue: number;
    total_expense: number;
    net_profit: number;
}

interface BusinessIndexProps {
    businesses: Business[];
}

export default function BusinessIndex({ businesses }: BusinessIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title="Daftar Bisnis" />
            
            <div className="flex flex-col h-full gap-8 p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Bisnis</h1>
                        <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                            Kelola semua bisnis Anda di satu tempat
                        </p>
                    </div>
                    <Link 
                        href="/business/create"
                        className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-base"
                    >
                        <IconPlus className="h-5 w-5 mr-2" />
                        Bisnis Baru
                    </Link>
                </div>

                {/* Business Grid */}
                {businesses.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                        <IconBuilding className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Belum ada bisnis
                        </h3>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                            Mulai dengan membuat bisnis pertama Anda.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/business/create"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-base"
                            >
                                <IconPlus className="h-5 w-5 mr-2" />
                                Buat Bisnis Baru
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {businesses.map((business) => (
                            <div
                                key={business.id}
                                className="bg-white dark:bg-gray-800 overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                                            <IconBuilding className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {business.name}
                                            </h3>
                                            <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                                                {business.type || 'Tidak ada tipe'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                <IconTrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                Modal
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(business.initial_investment || 0)}
                                            </p>
                                        </div>
                                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                <IconTrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                Pengeluaran
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(business.total_expense || 0)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {business.description && (
                                        <div className="mb-6">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                                {business.description}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center justify-between mb-6">
                                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                                            business.is_active 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                            {business.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={`/business/${business.id}`}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
                                            >
                                                Detail
                                            </Link>
                                            <Link
                                                href={`/business/${business.id}/edit`}
                                                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-semibold"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Action Links */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link
                                                href={`/business/${business.id}/capital`}
                                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition"
                                            >
                                                <IconCurrencyDollar className="h-4 w-4 mr-2" />
                                                Modal
                                            </Link>
                                            <Link
                                                href={`/business/${business.id}/expense`}
                                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition"
                                            >
                                                <IconReceipt className="h-4 w-4 mr-2" />
                                                Pengeluaran
                                            </Link>
                                            <Link
                                                href={`/business/${business.id}/categories`}
                                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 transition"
                                            >
                                                <IconCategory className="h-4 w-4 mr-2" />
                                                Kategori
                                            </Link>
                                            <Link
                                                href={`/business/${business.id}/settings`}
                                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 transition"
                                            >
                                                <IconSettings className="h-4 w-4 mr-2" />
                                                Settings
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
