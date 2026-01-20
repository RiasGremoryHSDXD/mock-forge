import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "../firebase";
import { chatService } from "../services/chatService";
import type { Conversation } from "../services/chatService";
import { onAuthStateChanged } from "firebase/auth";
import { aiConfig } from "../../api/aiConfig";

interface Message {
    role: 'user' | 'model';
    text: string;
}

export default function useAIChat(isChatOpen: boolean) {

    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm Gemini. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [history, setHistory] = useState<Conversation[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserId(user ? user.uid : null);
        });
        return () => unsubscribe();
    }, []);

    // Save conversation when messages change (if user is logged in)
    useEffect(() => {
        const saveChat = async () => {
            if (userId && messages.length > 1) { // Don't save if only initial greeting
                try {
                    const id = await chatService.saveConversation(userId, conversationId, messages);
                    if (!conversationId) {
                        setConversationId(id);
                    }
                } catch (error) {
                    console.error("Failed to save chat:", error);
                }
            }
        };
        const timer = setTimeout(saveChat, 1000); // Debounce save
        return () => clearTimeout(timer);
    }, [messages, userId, conversationId]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (isChatOpen) {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isChatOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const apiKey = aiConfig.apiKey;
            if (!apiKey) {
                throw new Error("API Key not found");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: aiConfig.model,
                systemInstruction: "You are a specialized AI assistant for the 'mock-forge' application. Your expertise is strictly limited to data APIs, mock data generation, database management, and related technical topics. If a user asks a question outside of this scope (e.g., cooking, general life advice, entertainment), politely refuse and explain that you only answer questions related to data APIs and the mockup application."
            });
            const result = await model.generateContent(userText);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'model', text: text }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your API key and try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleHistory = async () => {
        if (!showHistory) {
            if (userId) {
                const chats = await chatService.getUserConversations(userId);
                setHistory(chats);
            }
        }
        setShowHistory(!showHistory);
    };

    const loadConversation = (conv: Conversation) => {
        setMessages(conv.messages);
        setConversationId(conv.id);
        setShowHistory(false);
    };

    const startNewChat = () => {
        setMessages([{ role: 'model', text: "Hello! I'm Gemini. How can I help you today?" }]);
        setConversationId(null);
        setShowHistory(false);
    };

    return {
        messages,
        input,
        setInput,
        isLoading,
        scrollRef,
        handleSend,
        history,
        showHistory,
        toggleHistory,
        loadConversation,
        startNewChat
    };
}
