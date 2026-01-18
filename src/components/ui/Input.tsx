'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    className,
    leftIcon,
    rightIcon,
    error,
    ...props
}) => {
    return (
        <div className="w-full">
            <div
                className={cn(
                    'flex items-center gap-3 bg-[#1a1a25] border border-white/10 rounded-xl px-4 py-3 transition-all duration-200 input-glow',
                    'focus-within:border-purple-500/50',
                    error && 'border-red-500/50',
                    className
                )}
            >
                {leftIcon && <span className="text-gray-500">{leftIcon}</span>}
                <input
                    className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                    {...props}
                />
                {rightIcon && <span className="text-gray-500">{rightIcon}</span>}
            </div>
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>
    );
};
