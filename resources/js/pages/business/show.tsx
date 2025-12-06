import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    IconBuilding, 
    IconCurrencyDollar, 
    IconPencil,
    IconArrowLeft,
    IconTrendingUp,
    IconTrendingDown,
    IconWallet,
    IconCategory
} from '@tabler/icons-react';

interface ExpenseCategory {
    id: number;
    name: string;
    color: string;
}

interface CapitalRecord {
    id: number;
    amount: number;
    source: string | null;
    description: string | null;
    recorded_at: string;
}

interface Expense {
    id: number;
    amount: number;
    description: string;
    expense_date: string;
    category?: ExpenseCategory;
}

interface BusinessShowProps {
    business: {
        id: number;
        name: string;
        type: string | null;
        description: string | null;
        is_active: boolean;
        capital_records: CapitalRecord[];
        expenses: Expense[];
        expense_categories: ExpenseCategory[];
    };
    summary: {
        total_capital: number;
        total_expenses: number;
        remaining_capital: number;
        expense_by_category: Array<{
            id: number;
            name: string;
            amount: number;
            color: string;
        }>;
    };
}

export default function BusinessShow({ business, summary }: BusinessShowProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title={`${business.name} - Detail`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/business"
                            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        >
                            <IconArrowLeft className="h-4 w-4 mr-1" />
                            Kembali
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {business.name}
                            </h1>
                            <div className="flex items-center mt-1 space-x-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {business.type || 'Tidak ada tipe'}
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    business.is_active 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                    {business.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/business/${business.id}/edit`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <IconPencil className="h-4 w-4 mr-2" />
                            Edit
                        </Link>
                        <Link
                            href={`/business/${business.id}/capital`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                        >
                            <IconCurrencyDollar className="h-4 w-4 mr-2" />
                            Modal
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Modal */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <IconTrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Modal</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(summary.total_capital)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                href={`/business/${business.id}/capital`}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Kelola modal →
                            </Link>
                        </div>
                    </div>

                    {/* Total Pengeluaran */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                                <IconTrendingDown className="h-6 w-6 text-red-600 dark:text-red-300" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(summary.total_expenses)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                href={`/business/${business.id}/expense`}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Lihat pengeluaran →
                            </Link>
                        </div>
                    </div>

                    {/* Sisa Modal */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <IconWallet className="h-6 w-6 text-green-600 dark:text-green-300" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Sisa Modal</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(summary.remaining_capital)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Recent Capital */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Catatan Modal Terbaru
                                </h2>
                                <Link
                                    href={`/business/${business.id}/capital/create`}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    + Tambah
                                </Link>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            {business.capital_records.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    Belum ada catatan modal
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {business.capital_records.slice(0, 5).map((record) => (
                                        <div 
                                            key={record.id}
                                            className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {record.source || 'Tidak ada sumber'}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {record.description}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-green-600 dark:text-green-400">
                                                    + {formatCurrency(record.amount)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(record.recorded_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Recent Expenses */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Pengeluaran Terbaru
                                </h2>
                                <Link
                                    href={`/business/${business.id}/expense/create`}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    + Tambah
                                </Link>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            {business.expenses.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    Belum ada pengeluaran
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {business.expenses.slice(0, 5).map((expense) => (
                                        <div 
                                            key={expense.id}
                                            className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {expense.description}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <span 
                                                        className="inline-block w-3 h-3 rounded-full mr-2"
                                                        style={{ backgroundColor: expense.category?.color || '#ccc' }}
                                                    />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {expense.category?.name || 'Tanpa kategori'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-red-600 dark:text-red-400">
                                                    - {formatCurrency(expense.amount)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(expense.expense_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Expense by Category */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <IconCategory className="h-5 w-5 mr-2 text-gray-500" />
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                Pengeluaran per Kategori
                            </h2>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            {summary.expense_by_category.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <div className="w-32">
                                        <div className="flex items-center">
                                            <div 
                                                className="w-3 h-3 rounded-full mr-2"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {category.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full"
                                                style={{ 
                                                    width: `${(category.amount / summary.total_expenses) * 100}%`,
                                                    backgroundColor: category.color 
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-32 text-right">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(category.amount)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}