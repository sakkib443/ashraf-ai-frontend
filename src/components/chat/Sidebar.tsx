'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Image as ImageIcon,
    LayoutGrid,
    MessageSquare,
    Trash2,
    Brain,
    Sparkles,
    ChevronRight,
    History,
    Settings,
    X
} from 'lucide-react';
import { cn, truncateText } from '@/lib/utils';
import { Conversation } from '@/types';

interface SidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    onDeleteConversation,
    isOpen,
    onClose,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in" onClick={onClose} />
            )}

            <aside className={cn(
                'fixed md:relative inset-y-0 left-0 z-50 w-[280px] bg-[#f8fafc] flex flex-col transition-transform duration-300 ease-in-out border-r border-[#e2e8f0]',
                isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            )}>
                {/* Brand Header */}
                <div className="p-4 pb-2">
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-[18px] bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">Ashraf AI</span>
                    </div>

                    <button
                        onClick={onNewChat}
                        className="flex items-center gap-2 w-full px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-[14px] font-medium text-[#0f172a] shadow-sm hover:shadow-md hover:border-[#cbd5e1] transition-all"
                    >
                        <Plus className="w-4 h-4 text-[#6366f1]" />
                        New Chat
                    </button>
                </div>

                {/* Search Interaction */}
                <div className="px-4 py-2">
                    <div className="relative group">
                        <Search className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                            searchQuery ? "text-violet-500" : "text-slate-400 group-focus-within:text-violet-500"
                        )} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 bg-white border border-[#e2e8f0] rounded-xl text-[13px] outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-full"
                            >
                                <X className="w-3 h-3 text-slate-400" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
                    <div className="sidebar-section-title flex items-center gap-2 mb-2">
                        <History className="w-3 h-3 text-violet-500" />
                        <span>{searchQuery ? 'Search Results' : 'Recent Conversations'}</span>
                    </div>

                    <div className="space-y-0.5">
                        {filteredConversations.map((conv) => (
                            <div
                                key={conv._id}
                                className={cn(
                                    'chat-history-item group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all',
                                    activeConversationId === conv._id
                                        ? 'bg-violet-50 text-violet-900 border-violet-100'
                                        : 'text-slate-600 hover:bg-white hover:border-slate-200 border border-transparent'
                                )}
                                onClick={() => onSelectConversation(conv._id)}
                            >
                                <MessageSquare className={cn(
                                    "w-4 h-4 flex-shrink-0",
                                    activeConversationId === conv._id ? "text-violet-500" : "text-slate-400 group-hover:text-violet-400"
                                )} />
                                <span className="flex-1 truncate text-[13.5px] font-medium">{truncateText(conv.title, 26)}</span>

                                {/* Delete Action */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteConversation(conv._id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}

                        {filteredConversations.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center px-4 bg-white/50 rounded-2xl border border-dashed border-slate-200 mx-1">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                    <Search className="w-6 h-6 text-slate-200" />
                                </div>
                                <p className="text-[13px] font-medium text-slate-500">
                                    {searchQuery ? 'No matches found' : 'Start your first chat'}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    {searchQuery ? 'Try a different keyword' : 'Your history will appear here'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer - Professional Profile */}
                <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc]/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-white border border-transparent hover:border-[#e2e8f0] hover:shadow-sm cursor-pointer transition-all group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-[2px] shadow-sm">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[13px] font-bold text-violet-600">
                                AS
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13.5px] font-bold text-[#0f172a] truncate group-hover:text-violet-600 transition-colors tracking-tight">Guest User</div>
                            <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Online
                            </div>
                        </div>
                        <Settings className="w-4 h-4 text-slate-400 group-hover:rotate-45 transition-transform" />
                    </div>
                </div>
            </aside>
        </>
    );
};
