'use client';

import { useRouter, usePathname } from "next/navigation";
import { Droplets, Flame, Trophy, BarChart3, Receipt } from "lucide-react";

type NavItem = {
    label: string;
    icon: React.ReactNode;
    href: string;
};

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const items: NavItem[] = [
        { label: "Inicio",   icon: <Droplets size={22} />, href: "/dashboard" },
        { label: "Retos",    icon: <Flame size={22} />,    href: "/retos"     },
        { label: "Ranking",  icon: <Trophy size={22} />,   href: "/rank"   },
        { label: "Consumo",  icon: <BarChart3 size={22} />,href: "/consume"   },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-sm">
            <div className="flex justify-around items-center py-3">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => router.push(item.href)}
                        className={`flex flex-col items-center text-xs gap-1 transition-colors cursor-pointer
                            ${pathname === item.href
                            ? "text-teal-500"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}