'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, ArrowUp, Plus, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
    placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    onSend,
    isLoading,
}) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [message]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full pb-6 pt-2 sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent">
            <div className="max-w-3xl mx-auto px-4">
                <form onSubmit={handleSubmit} className="main-input-container bg-white">
                    <div className="flex items-end gap-2 p-3 min-h-[52px]">
                        {/* Attach button */}
                        <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0 mb-0.5"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>

                        {/* Input area */}
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message Ashraf AI..."
                            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-[15px] leading-[1.6] py-2 text-slate-800 placeholder-slate-400 max-h-[200px]"
                        />

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 mb-0.5">
                            {!message.trim() && (
                                <button
                                    type="button"
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                    title="Voice input"
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={!message.trim() || isLoading}
                                className={cn(
                                    'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
                                    message.trim() && !isLoading
                                        ? 'bg-[#6366f1] text-white hover:bg-[#4f46e5] shadow-md hover:shadow-lg'
                                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                )}
                            >
                                <ArrowUp className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </form>

                <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">
                    Ashraf AI can make mistakes. Verify important information.
                </p>
            </div>
        </div>
    );
};
