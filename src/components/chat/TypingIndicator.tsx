'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="py-6 bg-[#f7f7f8] animate-fadeIn">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-[#10a37f] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <p className="font-semibold text-sm text-[#0d0d0d] mb-1">
                            AshrafAI
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="typing-cursor text-[#0d0d0d]"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
