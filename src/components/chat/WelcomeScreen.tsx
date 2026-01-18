'use client';

import React from 'react';
import { Brain, Sparkles, MessageSquare, Zap, Target, Image as ImageIcon } from 'lucide-react';

interface WelcomeScreenProps {
    onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
    {
        icon: Target,
        title: 'Explain quantum physics',
        subtitle: 'in simple terms for a beginner',
        gradient: 'from-orange-500 to-pink-500',
    },
    {
        icon: Zap,
        title: 'Help me plan',
        subtitle: "a 10 year old's birthday party",
        gradient: 'from-yellow-500 to-orange-500',
    },
    {
        icon: ImageIcon,
        title: 'Create an image',
        subtitle: 'of a futuristic city with flying cars',
        gradient: 'from-cyan-500 to-blue-500',
    },
    {
        icon: MessageSquare,
        title: 'Write a blog post',
        subtitle: 'about the future of AI technology',
        gradient: 'from-green-500 to-emerald-500',
    },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full px-4 animate-fadeIn max-w-4xl mx-auto text-center">
            {/* Centered Brand Icon - Now Colorful with Animation */}
            <div className="mb-10 group cursor-default">
                <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
                    {/* Icon container */}
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 transform transition-all group-hover:scale-110 group-hover:rotate-3">
                        <Brain className="w-10 h-10 text-white drop-shadow-lg" />
                        {/* Sparkle decorations */}
                        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300 animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Title with Colorful "Ashraf AI" */}
            <h1 className="text-[40px] md:text-[48px] font-bold text-[#171717] mb-[40px] tracking-tight leading-tight">
                What can{' '}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-gradient">
                    Ashraf AI
                </span>{' '}
                help with?
            </h1>

            {/* Suggestion Cards with Colorful Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                {suggestions.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onSuggestionClick(`${item.title} ${item.subtitle}`)}
                        className="flex flex-col items-start p-5 bg-white border border-[#e5e5e5] rounded-2xl hover:bg-[#f9f9f9] transition-all text-left shadow-sm hover:shadow-lg hover:-translate-y-1 group"
                    >
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                            <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[15px] font-semibold text-[#171717]">
                            {item.title}
                        </span>
                        <span className="text-[14px] text-[#676767]">
                            {item.subtitle}
                        </span>
                    </button>
                ))}
            </div>

            {/* Bottom Badge - Colorful */}
            <div className="mt-12 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 rounded-full border border-purple-200">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-[13px] font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Sakib - Software engineer
                </span>
            </div>
        </div>
    );
};
