import React, { FormEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { IconArrowLeft } from '@tabler/icons-react';

interface Business {
    id: number;
    name: string;
}

interface CapitalCreateProps {
    business: Business;
}

export default function CapitalCreate({ business }: CapitalCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        source: '',
        description: '',
        recorded_at: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(`/business/${business.id}/capital`);
    };

    return (
        <AppLayout>
            <Head title="Tambah Modal" />
            
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/business/${business.id}/capital`}
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 mb-4"
                    >
                        <IconArrowLeft className="h-4 w-4 mr-1" />
                        Kembali
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Tambah Modal - {business.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Catat modal baru untuk bisnis Anda
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Jumlah */}
                            <div>
                                <label 
                                    htmlFor="amount" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Jumlah Modal *
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

                            {/* Sumber */}
                            <div>
                                <label 
                                    htmlFor="source" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Sumber Modal
                                </label>
                                <input
                                    type="text"
                                    id="source"
                                    value={data.source}
                                    onChange={(e) => setData('source', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    disabled={processing}
                                />
                                {errors.source && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.source}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label 
                                    htmlFor="description" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Deskripsi
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    disabled={processing}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label 
                                    htmlFor="recorded_at" 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Tanggal *
                                </label>
                                <input
                                    type="date"
                                    id="recorded_at"
                                    value={data.recorded_at}
                                    onChange={(e) => setData('recorded_at', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                    disabled={processing}
                                />
                                {errors.recorded_at && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.recorded_at}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={`/business/${business.id}/capital`}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={processing}
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Modal'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}