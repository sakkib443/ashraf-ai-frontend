'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar, Header, ChatArea, ChatInput } from '@/components/chat';
import { api } from '@/lib/api';
import { Message, Conversation } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Handle User Privacy - Get or Create Anonymous ID
  useEffect(() => {
    let anonymousId = localStorage.getItem('ashrafai_user_id');
    if (!anonymousId) {
      anonymousId = `user_${uuidv4()}`;
      localStorage.setItem('ashrafai_user_id', anonymousId);
    }
    setUserId(anonymousId);
  }, []);

  // Load conversations when userId is ready
  useEffect(() => {
    if (userId) {
      loadConversations();
    }
  }, [userId]);

  const loadConversations = async () => {
    try {
      // Send userId to only get this user's conversations
      const response = await api.getConversations(userId);
      if (response.success && response.data) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      const response = await api.getConversation(id);
      if (response.success && response.data) {
        setMessages(response.data.messages);
        setActiveConversationId(id);
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
    setIsSidebarOpen(false);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    loadConversation(id);
    setIsSidebarOpen(false);
  }, []);

  const handleDeleteConversation = useCallback(async (id: string) => {
    try {
      await api.deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id));
      if (activeConversationId === id) {
        handleNewChat();
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  }, [activeConversationId, handleNewChat]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message optimistically
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message with userId for privacy
      const response = await api.sendMessage(content, activeConversationId || undefined, userId);

      if (response.success && response.data) {
        // Add AI response
        const aiMessage: Message = {
          role: 'model',
          content: response.data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Update conversation ID if new
        if (!activeConversationId) {
          setActiveConversationId(response.data.conversationId);
        }

        // Refresh conversations list to show the new/updated one
        loadConversations();
      } else {
        setMessages((prev) => [...prev, {
          role: 'model',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      console.error('Send message error:', error);
      setMessages((prev) => [...prev, {
        role: 'model',
        content: 'Sorry, I couldn\'t connect to the server. Please check your internet connection.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId, isLoading, userId]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSendMessage(suggestion);
  }, [handleSendMessage]);

  const activeConversation = conversations.find((c) => c._id === activeConversationId);

  return (
    <div className="flex h-screen bg-white overflow-hidden relative font-sans">
      {/* Blurry Stylized Background */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative bg-white/40 backdrop-blur-[2px]">
        {/* Header */}
        <Header
          conversationTitle={activeConversation?.title}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Chat Area */}
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Input */}
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
