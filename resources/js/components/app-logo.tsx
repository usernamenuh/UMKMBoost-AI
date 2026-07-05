import { useSidebar } from '@/components/ui/sidebar';

export default function AppLogo() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    if (isCollapsed) {
        return (
            <div className="flex items-center justify-center w-full">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    F
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="ml-1 grid flex-1 text-left text-sm">
    <div className="flex items-center gap-2">
        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            FinSight
        </span>
    </div>
    <span className="text-xs text-gray-500">
        Financial Insight
    </span>
</div>
        </>
    );
}
