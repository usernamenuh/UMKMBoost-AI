import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBuildingStore, IconDeviceFloppy, IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { FormEvent } from 'react';

const normalizeDate = (value: string) => {
    if (!value) {
        return new Date().toISOString().split('T')[0];
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0];
};

interface Business {
    id: number;
    name: string;
    type: string | null;
    description: string | null;
    started_at: string;
    is_active: boolean;
}

interface BusinessEditProps {
    business: Business;
}

export default function BusinessEdit({ business }: BusinessEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: business.name || '',
        type: business.type || '',
        description: business.description || '',
        started_at: normalizeDate(business.started_at || ''),
        is_active: business.is_active ?? true,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: business.name, href: `/business/${business.id}` },
        { title: 'Edit Bisnis', href: '#' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/business/${business.id}`);
    };

    const handleDelete = () => {
        if (
            confirm(
                'Apakah Anda yakin ingin menghapus bisnis ini? Semua data modal, pengeluaran, dan kategori akan ikut terhapus.',
            )
        ) {
            router.delete(`/business/${business.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${business.name}`} />

            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit {business.name}</h1>
                        <p className="mt-2 text-base text-gray-600">
                            Perbarui informasi bisnis Anda dengan lebih rapi dan terstruktur
                        </p>
                    </div>
                    <Link
                        href={`/business/${business.id}`}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <IconArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
                        <div className="rounded-lg bg-blue-100 p-4">
                            <IconBuildingStore className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Form Edit Bisnis</h2>
                            <p className="mt-1 text-sm text-gray-600">Perbarui profil dan status bisnis Anda</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Nama Bisnis <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    required
                                    disabled={processing}
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="type" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Tipe Bisnis
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    disabled={processing}
                                />
                                {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
                            </div>
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
                                className="w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                disabled={processing}
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <label htmlFor="started_at" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    id="started_at"
                                    value={data.started_at}
                                    onChange={(e) => setData('started_at', normalizeDate(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    disabled={processing}
                                />
                                {errors.started_at && <p className="mt-2 text-sm text-red-600">{errors.started_at}</p>}
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-semibold text-gray-700">
                                    Status Bisnis
                                </label>
                                <label className="flex items-center gap-3 rounded-lg border border-gray-300 px-5 py-3">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Bisnis aktif</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-8">
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={processing}
                                className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <IconTrash className="mr-2 h-4 w-4" />
                                Hapus Bisnis
                            </button>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/business/${business.id}`}
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
                        </div>
                    </form>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <IconInfoCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-blue-900">Tips Mengedit Bisnis</h3>
                            <div className="mt-3 text-sm text-blue-800">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Perbarui data bisnis secara berkala agar informasi tetap akurat</li>
                                    <li>Pastikan status bisnis sesuai dengan kondisi yang sedang berjalan</li>
                                    <li>Gunakan deskripsi singkat untuk memudahkan identifikasi bisnis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
