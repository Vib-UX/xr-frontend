'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
    DynamicWidget
} from '@dynamic-labs/sdk-react-core';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Layout({ children }: { children?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    const SidebarContent = () => (
        <ScrollArea className="h-full  rounded-md">
            <div className="flex items-start  h-full  justify-between">
                <div className="z-50 border-l-4 fixed top-0 border-blue-500 bg-white h-full text-gray-800">
                    <div className="flex items-center p-4">
                        <img
                            src="/images/progression.png"
                            alt="Progression XR Logo"
                            className="h-[57px] w-[220px]"
                        />
                    </div>
                    <nav className="mt-6 space-y-2 px-4">
                        {navItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </nav>
                </div>
                <div className="h-full md:pl-[256px] w-full">
                    <div className="md:flex hidden h-[100px] sticky top-0 bg-white items-center px-10 space-x-3 justify-end w-full z-50">
                        {/* <ChainSelector /> */}
                        <DynamicWidget />
                    </div>
                    <div className="h-full w-full p-10">{children}</div>
                </div>
            </div>
        </ScrollArea>
    );

    const navItems = [
        { href: '/health-gains', label: 'Health Gains' },
        { href: '/fitness-clubs', label: 'Fitness Clubs' },
        { href: '/betting-hub', label: 'Betting Hub' },
        { href: '/fan-token-showdowns', label: 'Fan Token Showdowns' },
        { href: '/vr-workouts', label: 'VR Workouts' },
        { href: '/ai-coaches', label: 'Coaches' },
        { href: '/profile', label: 'Profile' },
        { href: '/notifications', label: 'Notifications' },
    ];

    function NavItem({ href, label }: { href: string; label: string }) {
        const pathname = usePathname();
        const isSelected = pathname === href;

        return (
            <Link
                href={href}
                className={cn(
                    'block px-4 py-2 rounded-md transition-colors',
                    isSelected
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                )}
            >
                {label}
            </Link>
        );
    }

    return (
        <>
            {isDesktop ? (
                <div className="hidden h-screen w-full flex-col md:flex">
                    <SidebarContent />
                </div>
            ) : (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <div className="w-full bg-white flex justify-between items-center px-4 py-4">
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <div className="flex items-center space-x-2">
                            {/* <ChainSelector /> */}
                            <DynamicWidget />
                        </div>
                    </div>
                    <div className="h-full w-full p-8">{children}</div>
                    <SheetContent side="left" className="w-64 p-0">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            )}
        </>
    );
}
