import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    IconArrowLeft, 
    IconPlus, 
    IconEdit, 
    IconTrash, 
    IconCategory,
    IconReceipt,
    IconCurrencyDollar,
    IconCheck,
    IconX,
    IconPalette
} from '@tabler/icons-react';

interface ExpenseCategory {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
    is_default: boolean;
    expenses_count: number;
    expenses_sum_amount: number;
    created_at: string;
}

interface Business {
    id: number;
    name: string;
}

interface ExpenseCategoryIndexProps {
    business: Business;
    categories: ExpenseCategory[];
}

export default function ExpenseCategoryIndex({ business, categories: initialCategories }: ExpenseCategoryIndexProps) {
    const formatCurrency = (amount: number | string | null | undefined) => {
    // Konversi ke number dengan aman
    let numAmount = 0;
    
    if (typeof amount === 'number') {
        numAmount = amount;
    } else if (typeof amount === 'string') {
        numAmount = parseFloat(amount) || 0;
    } else if (amount) {
        numAmount = Number(amount) || 0;
    }
    
    // Validasi
    if (isNaN(numAmount) || !isFinite(numAmount)) {
        numAmount = 0;
    }
       return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(numAmount);
};


    const [editingId, setEditingId] = useState<number | null>(null);

    // Form untuk kategori baru
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        icon: 'category',
        color: '#3B82F6',
    });

    // Form untuk edit
    const editForm = useForm({
        name: '',
        icon: 'category',
        color: '#3B82F6',
    });
    
    // Form untuk delete
    const { delete: deleteCategory, processing: deleting } = useForm();

    // Normalize categories
    const categories = Array.isArray(initialCategories) ? initialCategories : [];

    // Hitung total pengeluaran dengan aman
   const totalExpenses = categories.reduce((sum, category) => {
    let amount = 0;
    
    // Handle berbagai tipe data
    if (typeof category.expenses_sum_amount === 'number') {
        amount = category.expenses_sum_amount;
    } else if (typeof category.expenses_sum_amount === 'string') {
        amount = parseFloat(category.expenses_sum_amount) || 0;
    } else if (category.expenses_sum_amount) {
        amount = Number(category.expenses_sum_amount) || 0;
    }
    
    return sum + amount;
}, 0);

    // Handle CREATE
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validasi
        if (!data.name.trim()) {
            alert('Nama kategori tidak boleh kosong');
            return;
        }
        
        post(`/business/${business.id}/categories`, {
            data: {
                name: data.name,
                icon: data.icon,
                color: data.color,
            },
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                alert('Gagal membuat kategori: ' + (errors.name || 'Unknown error'));
            },
        });
    };

    // Handle DELETE
    const handleDelete = (category: ExpenseCategory) => {
        if (category.is_default) {
            alert('Tidak bisa menghapus kategori default.');
            return;
        }
        
        if (category.expenses_count > 0) {
            alert('Tidak bisa menghapus kategori yang masih memiliki pengeluaran.');
            return;
        }

        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${category.name}"?`)) {
            deleteCategory(`/business/${business.id}/categories/${category.id}`, {
                preserveScroll: true,
                onError: () => {
                    alert('Gagal menghapus kategori');
                },
            });
        }
    };

    // START EDIT
    const startEdit = (category: ExpenseCategory) => {
        setEditingId(category.id);
        editForm.setData({
            name: category.name || '',
            icon: category.icon || 'category',
            color: category.color || '#3B82F6',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        editForm.reset();
    };

    // HANDLE EDIT SUBMIT
    const handleEditSubmit = (id: number) => {
        if (!editForm.data.name || editForm.data.name.trim() === '') {
            alert('Nama kategori tidak boleh kosong!');
            return;
        }
        
        editForm.put(`/business/${business.id}/categories/${id}`, {
            data: editForm.data,
            preserveScroll: true,
            onSuccess: () => {
                setEditingId(null);
                editForm.reset();
            },
            onError: (errors) => {
                alert('Gagal mengupdate kategori: ' + (errors.name || 'Unknown error'));
            },
        });
    };

    // Daftar icon yang tersedia
    const iconOptions = [
        { value: 'category', label: 'Category' },
        { value: 'receipt', label: 'Receipt' },
        { value: 'shopping-cart', label: 'Shopping' },
        { value: 'car', label: 'Transport' },
        { value: 'food', label: 'Food' },
        { value: 'home', label: 'Home' },
        { value: 'building', label: 'Building' },
        { value: 'tool', label: 'Tools' },
        { value: 'medical-cross', label: 'Medical' },
        { value: 'education', label: 'Education' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'clothes', label: 'Clothes' },
        { value: 'gift', label: 'Gift' },
        { value: 'phone', label: 'Phone' },
        { value: 'wifi', label: 'Internet' },
        { value: 'water', label: 'Water' },
        { value: 'electricity', label: 'Electricity' },
    ];

    // Warna preset
    const colorPresets = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F43F5E', '#A855F7', '#EAB308'
    ];

    return (
        <AppLayout>
            <Head title="Kategori Pengeluaran" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            href={`/business/${business.id}`}
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                        >
                            <IconArrowLeft className="h-4 w-4 mr-1" />
                            Kembali ke Bisnis
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Kategori Pengeluaran - {business.name}
                            </h1>
                            <p className="text-gray-600">
                                Kelola kategori untuk mengorganisir pengeluaran bisnis Anda
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Tambah/Edit Kategori */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-6">
                            {editingId ? (
                                <>
                                    <IconEdit className="h-5 w-5 mr-2 text-blue-500" />
                                    <h2 className="text-lg font-semibold">Edit Kategori</h2>
                                </>
                            ) : (
                                <>
                                    <IconPlus className="h-5 w-5 mr-2 text-blue-500" />
                                    <h2 className="text-lg font-semibold">Tambah Kategori Baru</h2>
                                </>
                            )}
                        </div>
                        
                        <form onSubmit={editingId ? (e) => { 
                            e.preventDefault(); 
                            if (editingId) handleEditSubmit(editingId); 
                        } : handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Kategori *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingId ? editForm.data.name : data.name}
                                        onChange={(e) => editingId 
                                            ? editForm.setData('name', e.target.value)
                                            : setData('name', e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder="Contoh: Bahan Baku, Transportasi, dll."
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                    {editingId && editForm.errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{editForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icon
                                    </label>
                                    <select
                                        value={editingId ? editForm.data.icon : data.icon}
                                        onChange={(e) => editingId 
                                            ? editForm.setData('icon', e.target.value)
                                            : setData('icon', e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {iconOptions.map((icon) => (
                                            <option key={icon.value} value={icon.value}>
                                                {icon.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Pilih icon untuk kategori
                                    </p>
                                    {errors.icon && (
                                        <p className="mt-1 text-sm text-red-600">{errors.icon}</p>
                                    )}
                                    {editingId && editForm.errors.icon && (
                                        <p className="mt-1 text-sm text-red-600">{editForm.errors.icon}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Warna Kategori
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="color"
                                                value={editingId ? editForm.data.color : data.color}
                                                onChange={(e) => editingId 
                                                    ? editForm.setData('color', e.target.value)
                                                    : setData('color', e.target.value)
                                                }
                                                className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                                            />
                                            <div className="text-sm text-gray-500">
                                                {editingId ? editForm.data.color : data.color}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="text-sm font-medium mb-2">Pilihan cepat:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {colorPresets.map((color, index) => (
                                                    <button
                                                        key={`color-${index}`}
                                                        type="button"
                                                        onClick={() => editingId 
                                                            ? editForm.setData('color', color)
                                                            : setData('color', color)
                                                        }
                                                        className={`h-8 w-8 rounded-full border-2 hover:scale-110 transition-transform ${
                                                            (editingId ? editForm.data.color : data.color) === color 
                                                                ? 'border-blue-500 scale-110' 
                                                                : 'border-gray-300'
                                                        }`}
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {errors.color && (
                                        <p className="mt-1 text-sm text-red-600">{errors.color}</p>
                                    )}
                                    {editingId && editForm.errors.color && (
                                        <p className="mt-1 text-sm text-red-600">{editForm.errors.color}</p>
                                    )}
                                </div>

                                <div className="pt-4 flex space-x-3">
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Batal
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={processing || editForm.processing}
                                        className={`${editingId ? 'flex-1' : 'w-full'} bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50`}
                                    >
                                        {processing || editForm.processing ? 'Menyimpan...' : editingId ? 'Update Kategori' : 'Tambah Kategori'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Daftar Kategori */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <IconCategory className="h-5 w-5 mr-2 text-purple-500" />
                                        <h2 className="text-lg font-semibold">Daftar Kategori</h2>
                                    </div>
                                    <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                                        {categories.length} kategori
                                    </span>
                                </div>
                            </div>

                            {categories.length === 0 ? (
                                <div className="text-center py-12">
                                    <IconCategory className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        Belum ada kategori pengeluaran
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Tambah kategori pertama di form sebelah
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {categories.map((category) => (
                                        <div
                                            key={`category-${category.id}`}
                                            className="p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            {editingId === category.id ? (
                                                // Edit Mode
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div
                                                            className="h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                                            style={{ 
                                                                backgroundColor: editForm.data.color,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <IconPalette className="h-6 w-6" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="space-y-3">
                                                                <input
                                                                    type="text"
                                                                    value={editForm.data.name}
                                                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    placeholder="Nama kategori"
                                                                    required
                                                                />
                                                                <div className="flex items-center space-x-2">
                                                                    <select
                                                                        value={editForm.data.icon}
                                                                        onChange={(e) => editForm.setData('icon', e.target.value)}
                                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    >
                                                                        {iconOptions.map((icon) => (
                                                                            <option key={icon.value} value={icon.value}>
                                                                                {icon.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <input
                                                                        type="color"
                                                                        value={editForm.data.color}
                                                                        onChange={(e) => editForm.setData('color', e.target.value)}
                                                                        className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2 ml-4">
                                                        <button
                                                            onClick={() => handleEditSubmit(category.id)}
                                                            disabled={editForm.processing}
                                                            className="text-green-600 hover:text-green-800 p-2 disabled:opacity-50"
                                                            title="Simpan"
                                                        >
                                                            <IconCheck className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            disabled={editForm.processing}
                                                            className="text-gray-600 hover:text-gray-800 p-2 disabled:opacity-50"
                                                            title="Batal"
                                                        >
                                                            <IconX className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // View Mode
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div
                                                            className="h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                                            style={{ 
                                                                backgroundColor: category.color || '#3B82F6',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <IconCategory className="h-6 w-6" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <h3 className="font-medium text-gray-900">
                                                                    {category.name}
                                                                </h3>
                                                                {category.is_default && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                        Default
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                                <div className="flex items-center">
                                                                    <IconReceipt className="h-4 w-4 mr-1" />
                                                                    <span>{category.expenses_count || 0} pengeluaran</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <IconCurrencyDollar className="h-4 w-4 mr-1" />
                                                                    <span>{formatCurrency(category.expenses_sum_amount || 0)}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2 mt-2">
                                                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                                                    {category.icon || 'category'}
                                                                </span>
                                                                <span 
                                                                    className="text-xs px-2 py-1 rounded flex items-center"
                                                                    style={{ 
                                                                        backgroundColor: `${category.color || '#3B82F6'}20`,
                                                                        color: category.color || '#3B82F6'
                                                                    }}
                                                                >
                                                                    {category.color || '#3B82F6'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => startEdit(category)}
                                                            className="text-blue-600 hover:text-blue-800 p-2"
                                                            title="Edit"
                                                            disabled={category.is_default}
                                                        >
                                                            <IconEdit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(category)}
                                                            className="text-red-600 hover:text-red-800 p-2"
                                                            title="Hapus"
                                                            disabled={category.is_default || category.expenses_count > 0}
                                                        >
                                                            <IconTrash className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Panel */}
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-2">Informasi:</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• <span className="font-medium">Kategori Default</span> tidak dapat diubah atau dihapus</li>
                                    <li>• <span className="font-medium">Kategori dengan pengeluaran</span> tidak dapat dihapus</li>
                                    <li>• Warna dan icon membantu identifikasi visual</li>
                                    <li>• Total pengeluaran dihitung otomatis per kategori</li>
                                </ul>
                            </div>
                            
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Statistik:</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-gray-600">Total Kategori</div>
                                        <div className="font-medium">{categories.length}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">Kategori Default</div>
                                        <div className="font-medium">{categories.filter(c => c.is_default).length}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">Total Pengeluaran</div>
                                        <div className="font-medium">{formatCurrency(totalExpenses)}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">Kategori Terbaru</div>
                                        <div className="font-medium">
                                            {categories.length > 0 
                                                ? new Date(Math.max(...categories.map(c => new Date(c.created_at).getTime()))).toLocaleDateString('id-ID')
                                                : '-'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}