'use client';

import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';
import { Message } from '@/types';

interface ChatAreaProps {
    messages: Message[];
    isLoading: boolean;
    onSuggestionClick: (suggestion: string) => void;
    onRegenerate?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
    messages,
    isLoading,
    onSuggestionClick,
    onRegenerate,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="flex-1 flex flex-col justify-center overflow-y-auto">
                <WelcomeScreen onSuggestionClick={onSuggestionClick} />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto pt-4 pb-12">
            <div className="max-w-4xl mx-auto">
                {messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        message={message}
                        isLast={index === messages.length - 1}
                        onRegenerate={
                            message.role === 'model' && index === messages.length - 1
                                ? onRegenerate
                                : undefined
                        }
                    />
                ))}

                {isLoading && <TypingIndicator />}

                <div ref={messagesEndRef} className="h-4" />
            </div>
        </div>
    );
};
