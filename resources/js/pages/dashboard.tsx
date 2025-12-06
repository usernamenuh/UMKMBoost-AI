import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    IconBuilding, 
    IconPlus,
    IconArrowRight,
    IconTrendingUp,
    IconTrendingDown,
    IconCalendar,
    IconCash,
    IconWallet,
    IconChartPie,
    IconBusinessplan,
    IconReport,
    IconReceipt,
    IconCoin,
    IconListDetails,
    IconMoneybag,
    IconChartLine
} from '@tabler/icons-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Business {
    id: number;
    name: string;
    type: string;
    description: string;
    total_capital: number;
    total_expenses: number;
    total_revenue: number;
    net_profit: number;
    initial_investment: number;
    created_at: string;
}

interface RecentRevenue {
    id: number;
    business_id: number;
    business_name: string;
    description: string;
    amount: number;
    revenue_date: string;
    category: string;
}

interface DashboardProps {
    businesses: Business[];
    total_capital: number;
    total_expenses: number;
    total_revenue: number;
    total_profit: number;
    roi_percentage: number;
    top_expense_categories: Array<{
        name: string;
        total: number;
        percentage: number;
    }>;
    recent_revenues: RecentRevenue[];
    roi_estimation?: {
        months: number;
        days: number;
        percentage: number;
        remaining: number;
        is_profitable: boolean;
        monthly_profit: number;
    };
}

export default function Dashboard({ 
    businesses, 
    total_capital, 
    total_expenses, 
    total_revenue, 
    total_profit, 
    roi_percentage,
    top_expense_categories,
    recent_revenues,
    roi_estimation = {
        months: 0,
        days: 0,
        percentage: 0,
        remaining: 0,
        is_profitable: false,
        monthly_profit: 0,
    }
}: DashboardProps) {
    // Debug: Log data yang diterima
    console.log('ROI Estimation Data:', roi_estimation);
    console.log('Businesses:', businesses);
    console.log('Total Profit:', total_profit);
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard FinSight</h1>
                            <p className="mt-2 text-blue-100">
                                Monitoring keuangan bisnis UMKM dengan estimasi balik modal
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <IconMoneybag className="h-12 w-12 text-blue-200 opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Statistik Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Total Modal */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Modal</p>
                                <h3 className="text-2xl font-bold mt-1">{formatCurrency(total_capital)}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <IconWallet className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                            Modal keseluruhan bisnis
                        </div>
                    </div>

                    {/* Total Pendapatan */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Pendapatan</p>
                                <h3 className="text-2xl font-bold mt-1 text-green-600">{formatCurrency(total_revenue)}</h3>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <IconTrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                            Pendapatan kotor
                        </div>
                    </div>

                    {/* Total Pengeluaran */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Pengeluaran</p>
                                <h3 className="text-2xl font-bold mt-1 text-red-600">{formatCurrency(total_expenses)}</h3>
                            </div>
                            <div className="p-3 bg-red-100 rounded-lg">
                                <IconTrendingDown className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                            Pengeluaran operasional
                        </div>
                    </div>

                    {/* Laba Bersih */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Laba Bersih</p>
                                <h3 className={`text-2xl font-bold mt-1 ${total_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(total_profit)}
                                </h3>
                            </div>
                            <div className={`p-3 ${total_profit >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-lg`}>
                                <IconCash className={`h-6 w-6 ${total_profit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                            Pendapatan - Pengeluaran
                        </div>
                    </div>

                    {/* ROI Progress */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Progress ROI</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <h3 className="text-2xl font-bold text-purple-600">
                                        {roi_estimation.percentage.toFixed(1)}%
                                    </h3>
                                    {roi_estimation.is_profitable && (
                                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
                                            BALIK MODAL ✓
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <IconBusinessplan className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-3">
                            {roi_estimation.is_profitable ? (
                                <div className="text-xs text-emerald-600 font-medium">
                                    🎉 Modal sudah kembali!
                                </div>
                            ) : (
                                <div className="text-xs text-gray-500">
                                    Kurang {formatCurrency(roi_estimation.remaining)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content: Pendapatan Terbaru & Estimasi */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Pendapatan Terbaru - 2 kolom */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <IconChartLine className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-lg">Pendapatan Terbaru</h3>
                            </div>
                            {businesses.length > 0 && (
                                <Link 
                                    href={businesses.length === 1 
                                        ? `/business/${businesses[0].id}/revenues` 
                                        : '/business'}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lihat Semua
                                </Link>
                            )}
                        </div>
                        
                        {recent_revenues.length > 0 ? (
                            <div className="space-y-3">
                                {recent_revenues.map((revenue) => (
                                    <div key={revenue.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                                                <IconCoin className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{revenue.description}</p>
                                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                    <span className="text-xs text-gray-500 truncate">{revenue.business_name}</span>
                                                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                                        {revenue.category}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {formatDate(revenue.revenue_date)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right ml-3 flex-shrink-0">
                                            <p className="font-bold text-green-600 text-sm">
                                                +{formatCurrency(revenue.amount)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <IconReceipt className="h-12 w-12 text-gray-300 mx-auto" />
                                <p className="text-gray-500 mt-2 font-medium">Belum ada pendapatan tercatat</p>
                                <p className="text-sm text-gray-400 mt-1">Mulai catat pendapatan pertama Anda</p>
                            </div>
                        )}
                        
                        {/* Quick Add Revenue Button */}
                        {businesses.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                {businesses.length === 1 ? (
                                    <Link 
                                        href={`/business/${businesses[0].id}/revenues/create`}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        <IconPlus className="h-4 w-4" />
                                        <span className="text-sm font-medium">Tambah Pendapatan Baru</span>
                                    </Link>
                                ) : (
                                    <div className="text-center text-sm text-gray-500">
                                        <p>Pilih bisnis di tabel untuk menambah pendapatan</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Estimasi & Kategori */}
                    <div className="space-y-4">
                        {/* Estimasi Balik Modal */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <IconCalendar className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Estimasi Balik Modal</h3>
                                    <p className="text-xs text-gray-500">Berdasarkan profit rata-rata</p>
                                </div>
                            </div>
                            
                            {roi_estimation && !roi_estimation.is_profitable ? (
                                <div>
                                    {roi_estimation.days > 0 ? (
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600">
                                                {roi_estimation.days}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Hari lagi</p>
                                            <p className="text-xs text-gray-400">
                                                ≈ {roi_estimation.months.toFixed(1)} bulan
                                            </p>
                                            
                                            {/* Progress Bar */}
                                            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all"
                                                    style={{ width: `${Math.min(100, Math.max(0, roi_estimation.percentage))}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {roi_estimation.percentage.toFixed(1)}% tercapai
                                            </p>
                                            
                                            {/* Profit Info */}
                                            {roi_estimation.monthly_profit > 0 && (
                                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                                    <p className="text-xs text-gray-600">Profit rata-rata/bulan</p>
                                                    <p className="text-sm font-bold text-blue-600">
                                                        {formatCurrency(roi_estimation.monthly_profit)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ) : total_profit < 0 ? (
                                        <div className="text-center py-4">
                                            <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-50 rounded-lg">
                                                <span className="text-2xl">⚠️</span>
                                                <div className="text-left">
                                                    <p className="font-bold text-red-900">Bisnis Masih Rugi</p>
                                                    <p className="text-sm text-red-700">
                                                        Loss: {formatCurrency(Math.abs(total_profit))}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                <p className="text-xs text-gray-600">Untuk melihat estimasi balik modal:</p>
                                                <p className="text-sm font-medium text-gray-700 mt-1">
                                                    Pendapatan harus &gt; Pengeluaran
                                                </p>
                                                <div className="mt-2 text-xs text-gray-500">
                                                    <p>Pendapatan: {formatCurrency(total_revenue)}</p>
                                                    <p>Pengeluaran: {formatCurrency(total_expenses)}</p>
                                                    <p className="font-medium text-red-600 mt-1">
                                                        Kurang: {formatCurrency(total_expenses - total_revenue)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-gray-500">Belum bisa menghitung estimasi</p>
                                            <p className="text-xs text-gray-400 mt-1">Catat pendapatan untuk melihat estimasi</p>
                                        </div>
                                    )}
                                </div>
                            ) : roi_estimation && roi_estimation.is_profitable ? (
                                <div className="text-center py-3">
                                    <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-lg">
                                        <span className="text-3xl">🎉</span>
                                        <div className="text-left">
                                            <p className="font-bold text-lg">Modal Sudah Kembali!</p>
                                            <p className="text-sm">Bisnis sudah profit</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500">Data tidak tersedia</p>
                                    <p className="text-xs text-gray-400 mt-1">Tambahkan bisnis dan pendapatan</p>
                                </div>
                            )}
                        </div>

                        {/* Kategori Pengeluaran */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <IconChartPie className="h-5 w-5 text-pink-600" />
                                </div>
                                <h3 className="font-semibold">Top Pengeluaran</h3>
                            </div>
                            <div className="space-y-3">
                                {top_expense_categories.length > 0 ? (
                                    top_expense_categories.slice(0, 5).map((category, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                                    index === 0 ? 'bg-red-500' : 
                                                    index === 1 ? 'bg-orange-500' : 
                                                    index === 2 ? 'bg-yellow-500' :
                                                    index === 3 ? 'bg-blue-500' : 'bg-gray-400'
                                                }`}></div>
                                                <span className="text-sm truncate">{category.name}</span>
                                            </div>
                                            <div className="text-right ml-2 flex-shrink-0">
                                                <div className="text-sm font-medium">
                                                    {formatCurrency(category.total)}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {category.percentage.toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-sm text-gray-400">Belum ada data pengeluaran</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daftar Bisnis */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Daftar Bisnis Anda</h3>
                        <div className="flex items-center gap-3">
                            <Link 
                                href="/business" 
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-700 text-sm font-medium"
                            >
                                <IconListDetails className="h-4 w-4" />
                                Lihat Semua
                            </Link>
                            <Link 
                                href="/business/create" 
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                                <IconPlus className="h-4 w-4" />
                                Tambah Bisnis
                            </Link>
                        </div>
                    </div>
                    
                    {businesses.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Bisnis</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Modal</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Pendapatan</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Pengeluaran</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Laba</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businesses.map((business) => (
                                        <tr key={business.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <Link href={`/business/${business.id}`} className="font-medium text-blue-600 hover:text-blue-700">
                                                    {business.name}
                                                </Link>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {business.type}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-right font-medium">{formatCurrency(business.total_capital)}</td>
                                            <td className="py-3 px-4 text-right font-medium text-green-600">
                                                {formatCurrency(business.total_revenue)}
                                            </td>
                                            <td className="py-3 px-4 text-right font-medium text-red-600">
                                                {formatCurrency(business.total_expenses)}
                                            </td>
                                            <td className={`py-3 px-4 text-right font-medium ${business.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatCurrency(business.net_profit)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2 justify-center">
                                                    <Link 
                                                        href={`/business/${business.id}`}
                                                        className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link 
                                                        href={`/business/${business.id}/revenues`}
                                                        className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                                    >
                                                        Pendapatan
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <IconBuilding className="h-16 w-16 text-gray-300 mx-auto" />
                            <h4 className="mt-4 text-lg font-medium text-gray-700">Belum ada bisnis</h4>
                            <p className="text-gray-500 text-sm mt-2">Mulai dengan menambahkan bisnis pertama Anda</p>
                            <Link 
                                href="/business/create" 
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                <IconPlus className="h-5 w-5" />
                                Tambah Bisnis Pertama
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link 
                        href="/business" 
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-500 transition-all hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <IconBuilding className="h-6 w-6 text-blue-600" />
                            </div>
                            <IconArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            Kelola Bisnis
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Lihat dan kelola semua bisnis Anda
                        </p>
                    </Link>

                    <Link 
                        href="#" 
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 hover:border-purple-500 transition-all hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <IconReport className="h-6 w-6 text-purple-600" />
                            </div>
                            <IconArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            Laporan Detail
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Analisis keuangan lengkap
                        </p>
                    </Link>

                    <Link 
                        href={businesses.length > 0 ? `/business/${businesses[0].id}/expense` : '/business'}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 hover:border-red-500 transition-all hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <IconTrendingDown className="h-6 w-6 text-red-600" />
                            </div>
                            <IconArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            Pengeluaran
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Catat dan kelola pengeluaran
                        </p>
                    </Link>

                    <Link 
                        href={businesses.length === 1 
                            ? `/business/${businesses[0].id}/revenues` 
                            : '/business'}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 hover:border-green-500 transition-all hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <IconTrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <IconArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            Pendapatan
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Catat dan kelola pendapatan
                        </p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}