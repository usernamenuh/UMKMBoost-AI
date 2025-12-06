import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { IconBuilding, IconCategory, IconChartBar, IconChartPie, IconCurrencyDollar, IconHome, IconTrendingUp, IconWallet } from '@tabler/icons-react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

// Contoh di AppLayout.tsx atau navigation.tsx
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: IconHome },
    { name: 'Bisnis', href: '/business', icon: IconBuilding },
    { name: 'Pengeluaran', href: '/expenses', icon: IconCurrencyDollar },
    { name: 'Pendapatan', href: '/revenues', icon: IconTrendingUp },
    { name: 'Modal', href: '/capitals', icon: IconWallet },
    { name: 'Kategori', href: '/categories', icon: IconCategory },
    { name: 'Laporan', href: '/reports', icon: IconChartBar },
    { name: 'Analytics', href: '/analytics', icon: IconChartPie },
];

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
