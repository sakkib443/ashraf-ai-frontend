'use client';

import React from 'react';
import { ChevronDown, Cloud, Zap, User, MoreHorizontal, Sparkles, Brain } from 'lucide-react';

interface HeaderProps {
    conversationTitle?: string;
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    conversationTitle,
    onMenuClick,
}) => {
    return (
        <header className="flex items-center justify-between h-[60px] px-4 bg-white/50 backdrop-blur-md sticky top-0 z-30">
            {/* Left */}
            <div className="flex items-center gap-2">
                <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-[#f9f9f9] rounded-lg">
                    <MoreHorizontal className="w-5 h-5 text-[#676767]" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#f9f9f9] rounded-xl transition-colors group">
                    {/* Colorful AI Icon */}
                    <div className="w-7 h-7 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-shadow">
                        <Brain className="w-4 h-4 text-white" />
                    </div>
                    {/* Colorful Text */}
                    <span className="font-semibold text-[18px] bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                        Ashraf AI
                    </span>
                    <ChevronDown className="w-4 h-4 text-purple-400" />
                </button>
            </div>

            {/* Center - Promo Badge */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 rounded-full border border-purple-200 cursor-pointer hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[13px] font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:from-violet-700 group-hover:to-fuchsia-700">
                    Ashraf AI Pro
                </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-[#676767] text-[13px] font-medium">
                    <Cloud className="w-4 h-4" />
                    Cloud Sync
                </div>
                {/* User Avatar with gradient border */}
                <div className="relative group">
                    <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[12px] font-bold text-purple-600">
                            AS
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
