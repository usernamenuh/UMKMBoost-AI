import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Folder, 
    LayoutGrid, 
    ChartArea, 
    ChartPie, 
    Building2, 
    ChartBarStacked, 
    WalletMinimal, 
    BadgeCent, 
    ChartNoAxesCombined,
    ChevronRight,
    DollarSign,
    Receipt,
    Tag,
    Settings
} from 'lucide-react';
import AppLogo from './app-logo';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

// Interface untuk Business
interface Business {
    id: number;
    name: string;
    type: string | null;
    is_active: boolean;
}

// Menu utama
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    { 
        title: 'Bisnis', 
        href: '/business', 
        icon: Building2 
    },
];

// Component untuk Business Navigation di Sidebar
function BusinessSidebarSection() {
    const { props } = usePage();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    
    useEffect(() => {
        // Cari businesses dari berbagai sumber props
        const data = props.businesses || props.user_businesses || props.global_businesses || [];
        setBusinesses(Array.isArray(data) ? data : []);
    }, [props]);

    if (businesses.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    AKSES CEPAT BISNIS
                </h3>
            </div>
            
            <div className="space-y-2">
                {businesses.map((business) => (
                    <div key={business.id} className="group">
                        {/* Business Header */}
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${
                                    business.is_active 
                                        ? 'bg-green-500' 
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                    {business.name}
                                </span>
                            </div>
                            <ChevronRight className="h-3 w-3 text-gray-400" />
                        </div>
                        
                        {/* Business Quick Actions - Collapsible */}
                        <div className="ml-6 space-y-1 mt-1">
                            <Link
                                href={`/business/${business.id}`}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                            >
                                <Building2 className="h-3 w-3" />
                                <span>Detail Bisnis</span>
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/capital`}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                            >
                                <DollarSign className="h-3 w-3" />
                                <span>Modal</span>
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/expense`}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                            >
                                <Receipt className="h-3 w-3" />
                                <span>Pengeluaran</span>
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/categories`}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                            >
                                <Tag className="h-3 w-3" />
                                <span>Kategori</span>
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/edit`}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                            >
                                <Settings className="h-3 w-3" />
                                <span>Settings</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Atau versi yang lebih simple (tanpa collapsible):
function SimpleBusinessSidebar() {
    const { props } = usePage();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    
    useEffect(() => {
        const data = props.businesses || props.user_businesses || props.global_businesses || [];
        setBusinesses(Array.isArray(data) ? data : []);
    }, [props]);

    if (businesses.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    AKSES CEPAT BISNIS
                </h3>
            </div>
            
            <div className="space-y-3">
                {businesses.map((business) => (
                    <div key={business.id} className="px-4">
                        {/* Business Info */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`h-2 w-2 rounded-full ${
                                business.is_active 
                                    ? 'bg-green-500' 
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                {business.name}
                            </span>
                            {business.type && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    ({business.type})
                                </span>
                            )}
                        </div>
                        
                        {/* Quick Actions - Horizontal */}
                        <div className="flex flex-wrap gap-1 ml-3">
                            <Link
                                href={`/business/${business.id}`}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50"
                                title="Detail Bisnis"
                            >
                                <Building2 className="h-3 w-3" />
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/capital`}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-100 dark:hover:bg-green-900/50"
                                title="Modal"
                            >
                                <DollarSign className="h-3 w-3" />
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/expense`}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-900/50"
                                title="Pengeluaran"
                            >
                                <Receipt className="h-3 w-3" />
                            </Link>
                            
                            <Link
                                href={`/business/${business.id}/categories`}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-100 dark:hover:bg-purple-900/50"
                                title="Kategori"
                            >
                                <Tag className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                
                {/* Pilih salah satu: */}
                {/* <BusinessSidebarSection /> */}
                <SimpleBusinessSidebar />
            </SidebarContent>

            <SidebarFooter>
                
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}