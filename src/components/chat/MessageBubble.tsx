'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, Sparkles, User, Share2, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types';

interface MessageBubbleProps {
    message: Message;
    isLast?: boolean;
    onRegenerate?: () => void;
}

// Typing effect component
const TypewriterText: React.FC<{ content: string; speed?: number; onComplete?: () => void }> = ({
    content,
    speed = 10,
    onComplete
}) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isComplete) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < content.length) {
                setDisplayedContent(content.slice(0, index + 1));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [content, speed, isComplete, onComplete]);

    return (
        <MarkdownRenderer content={displayedContent} />
    );
};

// Image component with loading state
const GeneratedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleDownload = async () => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ashrafai-generated-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="my-4 relative group">
            {isLoading && (
                <div className="w-full h-64 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-xl flex items-center justify-center animate-pulse">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-violet-600 font-medium">🎨 Generating image...</p>
                    </div>
                </div>
            )}
            {hasError ? (
                <div className="w-full h-48 bg-red-50 rounded-xl flex items-center justify-center border border-red-200">
                    <p className="text-red-500">❌ Failed to load image</p>
                </div>
            ) : (
                <div className={cn("relative", isLoading && "hidden")}>
                    <img
                        src={src}
                        alt={alt}
                        className="rounded-xl shadow-lg max-w-full h-auto border border-gray-200 hover:shadow-xl transition-shadow"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setHasError(true);
                        }}
                    />
                    {/* Image overlay actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                            onClick={handleDownload}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
                            title="Download Image"
                        >
                            <Download className="w-4 h-4 text-gray-700" />
                        </button>
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
                            title="Open in new tab"
                        >
                            <ExternalLink className="w-4 h-4 text-gray-700" />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

// Markdown renderer component
const MarkdownRenderer: React.FC<{ content: string; onCopy?: () => void }> = ({ content, onCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ReactMarkdown
            components={{
                p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                img: ({ src, alt }) => (
                    <GeneratedImage src={src || ''} alt={alt || 'Generated image'} />
                ),
                strong: ({ children }) => (
                    <strong className="font-semibold text-[#171717]">{children}</strong>
                ),
                em: ({ children }) => (
                    <em className="italic text-[#4a4a4a]">{children}</em>
                ),
                h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-[#171717] mt-6 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-[#171717] mt-5 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-[#171717] mt-4 mb-2">{children}</h3>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                    <li className="text-[#171717]">{children}</li>
                ),
                hr: () => (
                    <hr className="my-4 border-gray-200" />
                ),
                code: ({ node, className, children, ...props }: any) => {
                    const isInline = !className;
                    const codeText = String(children).replace(/\n$/, '');

                    return isInline ? (
                        <code className="px-1.5 py-0.5 bg-violet-50 rounded text-sm font-mono text-violet-700 border border-violet-100" {...props}>
                            {children}
                        </code>
                    ) : (
                        <div className="code-block my-5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-gray-700">
                                <span className="text-xs text-gray-400 font-mono">
                                    {className?.replace('language-', '') || 'code'}
                                </span>
                                <button
                                    onClick={() => handleCopy(codeText)}
                                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Copied!' : 'Copy code'}
                                </button>
                            </div>
                            <pre className="!bg-[#0D0D0D] !p-4 !m-0 overflow-x-auto">
                                <code className="text-[#e5e5e5] text-[13px] font-mono" {...props}>
                                    {children}
                                </code>
                            </pre>
                        </div>
                    );
                }
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isLast = false,
    onRegenerate,
}) => {
    const [copied, setCopied] = useState(false);
    const [showTyping, setShowTyping] = useState(isLast && message.role !== 'user');
    const isUser = message.role === 'user';

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="py-[18px] px-4 md:px-6">
            <div className="max-w-3xl mx-auto flex gap-4">
                {/* Avatar Area - Colorful gradient for AI */}
                <div className={cn(
                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-bold",
                    isUser
                        ? "border border-[#e5e5e5] bg-white text-[#171717]"
                        : "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30"
                )}>
                    {isUser ? 'AS' : <Sparkles className="w-4 h-4 text-white" />}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden">
                    <div className={cn(
                        "font-semibold text-[14px] mb-1",
                        isUser
                            ? "text-[#171717]"
                            : "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent"
                    )}>
                        {isUser ? 'You' : 'Ashraf AI'}
                    </div>

                    <div className="prose text-[#171717] text-[16px] leading-[1.6] markdown-content">
                        {/* Typing effect for AI responses when it's the last message */}
                        {!isUser && showTyping ? (
                            <TypewriterText
                                content={message.content}
                                speed={8}
                                onComplete={() => setShowTyping(false)}
                            />
                        ) : (
                            <MarkdownRenderer content={message.content} />
                        )}
                    </div>

                    {/* Assistant Actions */}
                    {!isUser && (
                        <div className="flex items-center gap-1.5 mt-3 transition-opacity">
                            <button
                                onClick={handleCopy}
                                className="p-1.5 text-[#b4b4b4] hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                                title="Copy response"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                            <button
                                className="p-1.5 text-[#b4b4b4] hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                                title="Regenerate response"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                                className="p-1.5 text-[#b4b4b4] hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Good response"
                            >
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                                className="p-1.5 text-[#b4b4b4] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Bad response"
                            >
                                <ThumbsDown className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
