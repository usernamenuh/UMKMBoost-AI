import React, { FormEvent, useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { IconArrowLeft, IconUpload, IconReceipt } from '@tabler/icons-react';

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
    receipt_path: string | null;
    expense_category_id: number;
}

interface Business {
    id: number;
    name: string;
    expense_categories: ExpenseCategory[];
}

interface ExpenseEditProps {
    business: Business;
    expense: Expense;
}

export default function ExpenseEdit({ business, expense }: ExpenseEditProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const { data, setData, put, processing, errors } = useForm({
        expense_category_id: expense.expense_category_id || '',
        amount: expense.amount || '',
        description: expense.description || '',
        notes: expense.notes || '',
        expense_date: expense.expense_date || new Date().toISOString().split('T')[0],
        receipt: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/business/${business.id}/expense/${expense.id}`, {
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('receipt', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Pengeluaran" />
            
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/business/${business.id}/expense`}
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 mb-4"
                    >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Kembali
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Edit Pengeluaran - {business.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Perbarui pengeluaran Anda
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Kategori */}
                            <div>
                                <label 
                                    htmlFor="expense_category_id" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Kategori *
                                </label>
                                <select
                                    id="expense_category_id"
                                    value={data.expense_category_id}
                                    onChange={(e) => setData('expense_category_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    disabled={processing}
                                >
                                    <option value="">Pilih Kategori</option>
                                    {business.expense_categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.expense_category_id && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.expense_category_id}
                                    </p>
                                )}
                            </div>

                            {/* Jumlah */}
                            <div>
                                <label 
                                    htmlFor="amount" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Jumlah Pengeluaran *
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    min="0"
                                    step="1"
                                    disabled={processing}
                                />
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.amount}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label 
                                    htmlFor="description" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Deskripsi *
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    disabled={processing}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Catatan */}
                            <div>
                                <label 
                                    htmlFor="notes" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Catatan
                                </label>
                                <textarea
                                    id="notes"
                                    rows={2}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    disabled={processing}
                                />
                                {errors.notes && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label 
                                    htmlFor="expense_date" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Tanggal *
                                </label>
                                <input
                                    type="date"
                                    id="expense_date"
                                    value={data.expense_date}
                                    onChange={(e) => setData('expense_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    disabled={processing}
                                />
                                {errors.expense_date && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.expense_date}
                                    </p>
                                )}
                            </div>

                            {/* Bukti Pembayaran */}
                            <div>
                                <label 
                                    htmlFor="receipt" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Bukti Pembayaran (optional)
                                </label>
                                {expense.receipt_path && !previewUrl && (
                                    <div className="mt-2 mb-4">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Bukti saat ini:
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <IconReceipt className="h-8 w-8 text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                File terupload
                                            </span>
                                            <Link
                                                href={`/storage/${expense.receipt_path}`}
                                                target="_blank"
                                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Lihat
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <IconUpload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                            <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                <span>Upload file baru</span>
                                                <input
                                                    id="receipt"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    disabled={processing}
                                                />
                                            </label>
                                            <p className="pl-1">atau drag & drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG, GIF up to 2MB
                                        </p>
                                    </div>
                                </div>
                                {previewUrl && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
                                        <img 
                                            src={previewUrl} 
                                            alt="Preview" 
                                            className="max-h-48 rounded-md"
                                        />
                                    </div>
                                )}
                                {errors.receipt && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.receipt}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={`/business/${business.id}/expense`}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={processing}
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <IconReceipt className="h-4 w-4 mr-2" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}