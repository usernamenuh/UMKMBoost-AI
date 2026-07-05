import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IconArrowLeft, IconDeviceFloppy, IconInfoCircle, IconReceipt, IconUpload } from '@tabler/icons-react';

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

const formatCurrencyInput = (value: string) => {
    const digits = value.replace(/\D/g, '');

    if (!digits) {
        return '';
    }

    return new Intl.NumberFormat('id-ID').format(Number(digits));
};

const normalizeDate = (value: string) => {
    if (!value) {
        return new Date().toISOString().split('T')[0];
    }

    const normalized = value.split('T')[0].split(' ')[0];
    const [year, month, day] = normalized.split('-');

    if (!year || !month || !day) {
        return new Date().toISOString().split('T')[0];
    }

    return `${year}-${month}-${day}`;
};

export default function ExpenseEdit({ business, expense }: ExpenseEditProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [amountDisplay, setAmountDisplay] = useState(formatCurrencyInput(String(expense.amount ?? '')));

    const { data, setData, put, processing, errors } = useForm({
        expense_category_id: expense.expense_category_id || '',
        amount: String(expense.amount ?? ''),
        description: expense.description || '',
        notes: expense.notes || '',
        expense_date: normalizeDate(expense.expense_date || ''),
        receipt: null as File | null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: business.name, href: `/business/${business.id}` },
        { title: 'Pengeluaran', href: `/business/${business.id}/expense` },
        { title: 'Edit Pengeluaran', href: '#' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/business/${business.id}/expense/${expense.id}`, {
            forceFormData: true,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const digitsOnly = rawValue.replace(/\D/g, '');

        setData('amount', digitsOnly);
        setAmountDisplay(formatCurrencyInput(rawValue));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pengeluaran" />

            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Pengeluaran</h1>
                        <p className="mt-2 text-base text-gray-600">
                            Perbarui pengeluaran untuk <span className="font-semibold text-gray-900">{business.name}</span>
                        </p>
                    </div>
                    <Link
                        href={`/business/${business.id}/expense`}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <IconArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
                        <div className="rounded-lg bg-amber-100 p-4">
                            <IconReceipt className="h-7 w-7 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Form Edit Pengeluaran</h2>
                            <p className="mt-1 text-sm text-gray-600">Ubah detail pengeluaran yang sudah tercatat</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <label htmlFor="expense_category_id" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="expense_category_id"
                                    value={data.expense_category_id}
                                    onChange={(e) => setData('expense_category_id', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                                {errors.expense_category_id && <p className="mt-2 text-sm text-red-600">{errors.expense_category_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="amount" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Jumlah Pengeluaran <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                                    <input
                                        id="amount"
                                        type="text"
                                        inputMode="numeric"
                                        value={amountDisplay}
                                        onChange={handleAmountChange}
                                        placeholder="0"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-14 pr-5 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                        disabled={processing}
                                    />
                                </div>
                                {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="mb-3 block text-sm font-semibold text-gray-700">
                                Deskripsi <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Contoh: Beli bahan baku, bayar listrik, dll"
                                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                required
                                disabled={processing}
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <label htmlFor="expense_date" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Tanggal Pengeluaran <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="expense_date"
                                    type="date"
                                    value={data.expense_date}
                                    onChange={(e) => setData('expense_date', normalizeDate(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    required
                                    disabled={processing}
                                />
                                {errors.expense_date && <p className="mt-2 text-sm text-red-600">{errors.expense_date}</p>}
                            </div>

                            <div>
                                <label htmlFor="notes" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Catatan (Opsional)
                                </label>
                                <textarea
                                    id="notes"
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Tambahkan catatan tambahan jika diperlukan..."
                                    className="w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    disabled={processing}
                                />
                                {errors.notes && <p className="mt-2 text-sm text-red-600">{errors.notes}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="receipt" className="mb-3 block text-sm font-semibold text-gray-700">
                                Bukti Pembayaran (Opsional)
                            </label>

                            {expense.receipt_path && !previewUrl && (
                                <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <p className="mb-2 text-sm font-semibold text-gray-700">Bukti saat ini:</p>
                                    <div className="flex items-center gap-2">
                                        <IconReceipt className="h-6 w-6 text-gray-400" />
                                        <span className="text-sm text-gray-600">File terupload</span>
                                        <Link
                                            href={`/storage/${expense.receipt_path}`}
                                            target="_blank"
                                            className="text-sm font-medium text-blue-600 hover:underline"
                                        >
                                            Lihat
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                    <IconUpload className="h-6 w-6 text-gray-500" />
                                </div>
                                <div className="mt-4 flex justify-center text-sm text-gray-600">
                                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
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
                                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF hingga 2MB</p>
                            </div>

                            {previewUrl && (
                                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <p className="mb-2 text-sm font-semibold text-gray-700">Preview:</p>
                                    <img src={previewUrl} alt="Preview" className="max-h-48 rounded-md" />
                                </div>
                            )}
                            {errors.receipt && <p className="mt-2 text-sm text-red-600">{errors.receipt}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-8">
                            <Link
                                href={`/business/${business.id}/expense`}
                                className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3 text-base font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <IconDeviceFloppy className="h-5 w-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <IconInfoCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-blue-900">Tips Mengedit Pengeluaran</h3>
                            <div className="mt-3 text-sm text-blue-800">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Perbarui data sesegera mungkin jika ada perubahan transaksi</li>
                                    <li>Pastikan jumlah yang diisi sesuai bukti terbaru</li>
                                    <li>Upload bukti baru jika ada perubahan dokumen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}