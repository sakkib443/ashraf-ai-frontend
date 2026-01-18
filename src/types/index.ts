export interface Message {
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
}

export interface Conversation {
    _id: string;
    title: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

export interface ChatResponse {
    success: boolean;
    message: string;
    data?: {
        response: string;
        conversationId: string;
        conversation: Conversation;
    };
    error?: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
