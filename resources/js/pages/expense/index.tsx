import React, { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    IconReceipt, 
    IconPlus, 
    IconArrowLeft, 
    IconEdit, 
    IconTrash,
    IconFilter,
    IconSearch,
    IconCategory
} from '@tabler/icons-react';

interface ExpenseCategory {
    id: number;
    name: string;
    color: string;
}

interface Expense {
    id: number;
    amount: number;
    description: string;
    notes: string | null;
    expense_date: string;
    category?: ExpenseCategory;
}

interface Business {
    id: number;
    name: string;
    expense_categories: ExpenseCategory[];
}

interface ExpenseIndexProps {
    business: Business;
    expenses: any; // Ubah ke any karena bisa object atau array
    total: number;
    filters: {
        category_id?: string;
        start_date?: string;
        end_date?: string;
    };
}

export default function ExpenseIndex({ business, expenses, total, filters: initialFilters }: ExpenseIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Fungsi untuk mendapatkan array expenses
    const getExpensesArray = () => {
        if (Array.isArray(expenses)) {
            return expenses;
        }
        
        if (expenses && typeof expenses === 'object') {
            // Cari property yang berisi array
            const possibleKeys = ['data', 'expenses', 'items', 'records', 'list', 'results'];
            for (const key of possibleKeys) {
                if (Array.isArray(expenses[key])) {
                    return expenses[key];
                }
            }
            
            // Jika tidak ada array, coba konversi object values ke array
            const values = Object.values(expenses);
            if (values.length > 0 && values.every(v => typeof v === 'object' && v !== null)) {
                return values;
            }
        }
        
        return [];
    };

    const expensesArray = getExpensesArray();

    const { data, setData, get, processing } = useForm({
        category_id: initialFilters.category_id || '',
        start_date: initialFilters.start_date || '',
        end_date: initialFilters.end_date || '',
    });

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        get(`/business/${business.id}/expense`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setData({
            category_id: '',
            start_date: '',
            end_date: '',
        });
        get(`/business/${business.id}/expense`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Pengeluaran" />
            
            <div className="flex flex-col h-full gap-8 p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Pengeluaran - {business.name}
                        </h1>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                            Total pengeluaran: <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(total)}</span>
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Link
                            href={`/business/${business.id}`}
                            className="inline-flex items-center px-5 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-base"
                        >
                            <IconArrowLeft className="h-4 w-4 mr-1" />
                            Kembali
                        </Link>
                        <Link 
                            href={`/business/${business.id}/expense/create`}
                            className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-base"
                        >
                            <IconPlus className="h-5 w-5 mr-2" />
                            Tambah Pengeluaran
                        </Link>
                    </div>
                </div>

                {/* Filter Card */}
                <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <IconFilter className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filter</h3>
                    </div>
                    <form onSubmit={handleFilter} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Kategori
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-base text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition"
                            >
                                <option value="">Semua Kategori</option>
                                {business.expense_categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Dari Tanggal
                            </label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-base text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Sampai Tanggal
                            </label>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-base text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-end gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium text-base disabled:opacity-50"
                            >
                                <IconSearch className="h-5 w-5 mr-2" />
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium text-base"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Expense List */}
                <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    {expensesArray.length === 0 ? (
                        <div className="text-center py-12">
                            <IconReceipt className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                Belum ada pengeluaran
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Mulai dengan menambahkan pengeluaran pertama.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={`/business/${business.id}/expense/create`}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <IconPlus className="h-5 w-5 mr-2" />
                                    Tambah Pengeluaran
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Catatan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {expensesArray.map((expense: any) => (
                                        <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {expense.expense_date 
                                                    ? new Date(expense.expense_date).toLocaleDateString('id-ID')
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center">
                                                    <span 
                                                        className="inline-block w-3 h-3 rounded-full mr-2"
                                                        style={{ backgroundColor: expense.category?.color || '#ccc' }}
                                                    />
                                                    <span className="text-gray-900 dark:text-white">
                                                        {expense.category?.name || 'Tanpa kategori'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {expense.description || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {expense.notes || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">
                                                - {formatCurrency(expense.amount || 0)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/business/${business.id}/expense/${expense.id}/edit`}
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        <IconEdit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/business/${business.id}/expense/${expense.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        onClick={(e) => {
                                                            if (!confirm('Apakah Anda yakin ingin menghapus pengeluaran ini?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <IconTrash className="h-4 w-4 mr-1" />
                                                        Hapus
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
