import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react'; // ✅ Tambah router
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { FormEvent } from 'react';

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
        started_at: business.started_at || '',
        is_active: business.is_active || true,
    });

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
            router.delete(`/business/${business.id}`, {
                onSuccess: () => {
                    // Redirect akan otomatis handle oleh Inertia
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title={`Edit ${business.name}`} />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/business/${business.id}`}
                        className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <IconArrowLeft className="mr-1 h-4 w-4" />
                        Kembali
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Edit {business.name}
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Perbarui informasi bisnis Anda
                    </p>
                </div>

                {/* Form */}
                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Nama Bisnis */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Nama Bisnis *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                    disabled={processing}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Tipe Bisnis */}
                            <div>
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Tipe Bisnis
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData('type', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    disabled={processing}
                                />
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.type}
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
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    disabled={processing}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal Mulai */}
                            <div>
                                <label
                                    htmlFor="started_at"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    id="started_at"
                                    value={data.started_at}
                                    onChange={(e) =>
                                        setData('started_at', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    disabled={processing}
                                />
                                {errors.started_at && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.started_at}
                                    </p>
                                )}
                            </div>

                            {/* Status Aktif */}
                            {/* Status Aktif - Versi Sederhana */}
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => {
                                            console.log(
                                                'Checkbox changed:',
                                                e.target.checked,
                                            );
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            );
                                        }}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Bisnis aktif
                                    </span>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                                    >
                                        <IconTrash className="mr-2 h-4 w-4" />
                                        Hapus Bisnis
                                    </button>
                                </div>
                                <div className="flex space-x-3">
                                    <Link
                                        href={`/business/${business.id}`}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
