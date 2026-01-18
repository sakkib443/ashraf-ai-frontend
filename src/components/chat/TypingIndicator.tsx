'use client';

import React from 'react';
import { Sparkles, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="py-[18px] px-4 md:px-6 animate-fadeIn">
            <div className="max-w-3xl mx-auto flex gap-4">
                {/* Avatar with gradient - matching MessageBubble */}
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="font-semibold text-[14px] mb-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                        Ashraf AI is thinking...
                    </div>

                    {/* Bouncing Dots Processing Animation */}
                    <div className="flex items-center gap-1.5 h-6">
                        <div className="flex gap-1 px-3 py-2 bg-violet-50 rounded-2xl rounded-tl-none border border-violet-100 shadow-sm transition-all duration-300">
                            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-dot-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-dot-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-dot-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                        <span className="text-[12px] text-slate-400 italic ml-1">Typing...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
