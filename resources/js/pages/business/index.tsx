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
    capital_records_count: number;
    expenses_count: number;
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
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Bisnis</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Kelola semua bisnis Anda di satu tempat
                        </p>
                    </div>
                    <Link 
                        href="/business/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <IconPlus className="h-5 w-5 mr-2" />
                        Bisnis Baru
                    </Link>
                </div>

                {/* Business Grid */}
                {businesses.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <IconBuilding className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                            Belum ada bisnis
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Mulai dengan membuat bisnis pertama Anda.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/business/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                <IconPlus className="h-5 w-5 mr-2" />
                                Buat Bisnis Baru
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {businesses.map((business) => (
                            <div
                                key={business.id}
                                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-md p-3">
                                                <IconBuilding className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {business.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {business.type || 'Tidak ada tipe'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                <IconTrendingUp className="h-4 w-4 mr-1 text-green-500" />
                                                Modal
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {formatCurrency(business.capital_records_count || 0)}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                <IconTrendingDown className="h-4 w-4 mr-1 text-red-500" />
                                                Pengeluaran
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {formatCurrency(business.expenses_count || 0)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                            {business.description || 'Tidak ada deskripsi'}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-6">
                                        <div className="flex justify-between items-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                business.is_active 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                                {business.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/business/${business.id}`}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                                >
                                                    Detail
                                                </Link>
                                                <Link
                                                    href={`/business/${business.id}/edit`}
                                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                        
                                        {/* Quick Action Links */}
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    href={`/business/${business.id}/capital`}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                                >
                                                    <IconCurrencyDollar className="h-3 w-3 mr-1" />
                                                    Modal
                                                </Link>
                                                <Link
                                                    href={`/business/${business.id}/expense`}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                                                >
                                                    <IconReceipt className="h-3 w-3 mr-1" />
                                                    Pengeluaran
                                                </Link>
                                                <Link
                                                    href={`/business/${business.id}/categories`}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
                                                >
                                                    <IconCategory className="h-3 w-3 mr-1" />
                                                    Kategori
                                                </Link>
                                                <Link
                                                    href={`/business/${business.id}/settings`}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                                >
                                                    <IconSettings className="h-3 w-3 mr-1" />
                                                    Settings
                                                </Link>
                                            </div>
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