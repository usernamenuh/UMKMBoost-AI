import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IconArrowLeft, IconBuildingStore, IconDeviceFloppy, IconInfoCircle } from '@tabler/icons-react';
import { type FormEvent } from 'react';

export default function BusinessCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        description: '',
        started_at: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Bisnis', href: '/business' },
        { title: 'Tambah Bisnis', href: '#' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/business');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Bisnis Baru" />

            <div className="flex h-full flex-1 flex-col gap-8 p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Buat Bisnis Baru</h1>
                        <p className="mt-2 text-base text-gray-600">
                            Isi informasi bisnis Anda agar semua pencatatan lebih terorganisir
                        </p>
                    </div>
                    <Link
                        href="/business"
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <IconArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                    <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
                        <div className="rounded-lg bg-blue-100 p-4">
                            <IconBuildingStore className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Form Informasi Bisnis</h2>
                            <p className="mt-1 text-sm text-gray-600">Lengkapi data utama bisnis Anda</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-3 block text-sm font-semibold text-gray-700">
                                    Nama Bisnis <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Toko Sari Jaya"
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
                                    id="type"
                                    type="text"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    placeholder="Contoh: Retail, Jasa, Kuliner"
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
                                placeholder="Jelaskan singkat tentang bisnis Anda..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                disabled={processing}
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label htmlFor="started_at" className="mb-3 block text-sm font-semibold text-gray-700">
                                Tanggal Mulai
                            </label>
                            <input
                                id="started_at"
                                type="date"
                                value={data.started_at}
                                onChange={(e) => setData('started_at', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                disabled={processing}
                            />
                            {errors.started_at && <p className="mt-2 text-sm text-red-600">{errors.started_at}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-8">
                            <Link
                                href="/business"
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
                                {processing ? 'Menyimpan...' : 'Simpan Bisnis'}
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
                            <h3 className="text-sm font-semibold text-blue-900">Tips Mengisi Data Bisnis</h3>
                            <div className="mt-3 text-sm text-blue-800">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Isi nama bisnis dengan jelas agar mudah dikenali di dashboard</li>
                                    <li>Tambah tipe bisnis untuk memudahkan pengelompokan</li>
                                    <li>Masukkan tanggal mulai jika Anda ingin melihat riwayat pertumbuhan bisnis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}