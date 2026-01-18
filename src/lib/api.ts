const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ashraf-ai-backend.vercel.app/api';

export const api = {
    // Send a chat message
    sendMessage: async (message: string, conversationId?: string, userId?: string) => {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, conversationId, userId }),
        });
        return response.json();
    },

    // Get all conversations for a specific user
    getConversations: async (userId?: string) => {
        const url = userId ? `${API_BASE_URL}/chat/conversations?userId=${userId}` : `${API_BASE_URL}/chat/conversations`;
        const response = await fetch(url);
        return response.json();
    },

    // Get a single conversation
    getConversation: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`);
        return response.json();
    },

    // Delete a conversation
    deleteConversation: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },

    // Update conversation title
    updateConversationTitle: async (id: string, title: string) => {
        const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        return response.json();
    },

    // Clear all conversations for a specific user
    clearConversations: async (userId?: string) => {
        const url = userId ? `${API_BASE_URL}/chat/conversations?userId=${userId}` : `${API_BASE_URL}/chat/conversations`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return response.json();
    },
};
