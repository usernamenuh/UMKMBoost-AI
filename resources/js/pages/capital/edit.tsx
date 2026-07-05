import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IconArrowLeft, IconCoin, IconDeviceFloppy, IconInfoCircle } from '@tabler/icons-react';

interface CapitalRecord {
    id: number;
    amount: number;
    source: string | null;
    description: string | null;
    recorded_at: string;
}

interface Business {
    id: number;
    name: string;
}

interface CapitalEditProps {
    business: Business;
    capital: CapitalRecord;
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

export default function CapitalEdit({ business, capital }: CapitalEditProps) {
    const [amountDisplay, setAmountDisplay] = useState(formatCurrencyInput(String(capital.amount ?? '')));

    const { data, setData, put, processing, errors } = useForm({
        amount: String(capital.amount ?? ''),
        source: capital.source || '',
        description: capital.description || '',
        recorded_at: normalizeDate(capital.recorded_at || ''),
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: business.name, href: `/business/${business.id}` },
        { title: 'Modal', href: `/business/${business.id}/capital` },
        { title: 'Edit Modal', href: '#' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/business/${business.id}/capital/${capital.id}`);
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const digitsOnly = rawValue.replace(/\D/g, '');

        setData('amount', digitsOnly);
        setAmountDisplay(formatCurrencyInput(rawValue));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Modal" />

            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Modal</h1>
                        <p className="mt-2 text-base text-gray-600">
                            Perbarui catatan modal untuk <span className="font-semibold text-gray-900">{business.name}</span>
                        </p>
                    </div>
                    <Link
                        href={`/business/${business.id}/capital`}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <IconArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
                        <div className="rounded-lg bg-amber-100 p-4">
                            <IconCoin className="h-7 w-7 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Form Edit Modal</h2>
                            <p className="mt-1 text-sm text-gray-600">Perbarui data modal yang sudah tercatat</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div>
                            <label htmlFor="amount" className="mb-3 block text-sm font-semibold text-gray-700">
                                Jumlah Modal <span className="text-red-500">*</span>
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

                        <div>
                            <label htmlFor="source" className="mb-3 block text-sm font-semibold text-gray-700">
                                Sumber Modal
                            </label>
                            <input
                                id="source"
                                type="text"
                                value={data.source}
                                onChange={(e) => setData('source', e.target.value)}
                                placeholder="Contoh: Tabungan pribadi, pinjaman, investor"
                                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                disabled={processing}
                            />
                            {errors.source && <p className="mt-2 text-sm text-red-600">{errors.source}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="mb-3 block text-sm font-semibold text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan singkat tentang perubahan modal ini..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                disabled={processing}
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label htmlFor="recorded_at" className="mb-3 block text-sm font-semibold text-gray-700">
                                Tanggal <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="recorded_at"
                                type="date"
                                value={data.recorded_at}
                                onChange={(e) => setData('recorded_at', normalizeDate(e.target.value))}
                                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                required
                                disabled={processing}
                            />
                            {errors.recorded_at && <p className="mt-2 text-sm text-red-600">{errors.recorded_at}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-8">
                            <Link
                                href={`/business/${business.id}/capital`}
                                className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-7 py-3 text-base font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                            <h3 className="text-sm font-semibold text-blue-900">Tips Mengedit Modal</h3>
                            <div className="mt-3 text-sm text-blue-800">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Perbarui modal jika ada perubahan jumlah atau sumber dana</li>
                                    <li>Pastikan data yang diisi sesuai dengan bukti terbaru</li>
                                    <li>Tambahkan deskripsi singkat agar riwayat lebih jelas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}