'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Gear from '../../../public/images/gear.png';
interface PulsatingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pulseColor?: string;
    duration?: string;
}

export function PulsatingButton({
    className,
    children,
    pulseColor = '#0096ff',
    duration = '1.5s',
    ...props
}: PulsatingButtonProps) {
    return (
        <button
            className={cn(
                'relative text-center cursor-pointer flex justify-center items-center rounded-lg text-[#0051FE] bg-[#0051FE1A] p-[4px]',
                className
            )}
            style={
                {
                    '--pulse-color': pulseColor,
                    '--duration': duration,
                } as React.CSSProperties
            }
            {...props}
        >
            <div className="relative z-10 flex items-center gap-x-2">
                <Image src={Gear} alt="gear" />
                {children}
            </div>
            <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
        </button>
    );
}
