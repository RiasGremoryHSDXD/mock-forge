import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Sparkles, Send, X, History, Plus } from "lucide-react"; // Removed unused User import
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "../../firebase";
import { chatService } from "../../services/chatService";
import type { Conversation } from "../../services/chatService";
import { onAuthStateChanged } from "firebase/auth";
import { aiConfig } from "../../../api/aiConfig";


interface AIChatProps {
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

export default function AIChat({ isChatOpen, setIsChatOpen }: AIChatProps) {
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Collapsed Trigger Button - Now below profile */}
            {/* Collapsed Trigger Button - Now below profile */}
            <div
                onClick={() => setIsChatOpen(true)}
                className={`mt-4 relative group w-10 h-10 transition-all duration-500 transform ${isChatOpen ? "opacity-0 scale-50 pointer-events-none absolute" : "opacity-100 scale-100 relative"
                    } cursor-pointer`}
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#0F9D58] rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] animate-gradient-x"></div>
                <div className="relative w-full h-full bg-[#0f172a] rounded-full flex items-center justify-center border border-gray-800">
                    <Sparkles className="w-5 h-5 text-blue-400 group-hover:text-[#4285F4] transition-colors" />
                </div>
            </div>

            {/* Chat Interface Container */}
            <div
                className={`flex-1 min-h-0 w-full px-4 flex flex-col transition-all duration-500 delay-100 ${isChatOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute bottom-0 left-0"
                    }`}
            >
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-lg">Gemini</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleHistory}
                            className="p-2 hover:bg-gray-800 rounded-full text-white transition-colors relative"
                            title="Chat History"
                        >
                            <History size={18} />
                        </button>
                        <button
                            onClick={startNewChat}
                            className="p-2 hover:bg-gray-800 rounded-full text-white transition-colors"
                            title="New Chat"
                        >
                            <Plus size={18} />
                        </button>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-600 relative">
                    {showHistory && (
                        <div className="absolute inset-0 bg-[#0f172a] z-20 overflow-y-auto">
                            <h3 className="text-white font-medium mb-4 sticky top-0 bg-[#0f172a] py-2">Chat History</h3>
                            <div className="space-y-2">
                                {history.length === 0 ? (
                                    <p className="text-gray-400 text-sm">No previous conversations.</p>
                                ) : (
                                    history.map((chat) => (
                                        <div
                                            key={chat.id}
                                            onClick={() => loadConversation(chat)}
                                            className="p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors border border-gray-800"
                                        >
                                            <p className="text-sm text-white font-medium truncate">{chat.title}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {chat.updatedAt?.seconds ? new Date(chat.updatedAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className="relative w-9 h-9 flex items-center justify-center shrink-0 group cursor-pointer">
                                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#DB4437] to-[#0F9D58] opacity-30 blur-[1px] group-hover:opacity-80 group-hover:blur-sm transition-all duration-500"></div>
                                <div className="relative w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full overflow-hidden border border-gray-700/50 bg-[#0f172a] z-10 flex items-center justify-center">
                                    {msg.role === 'model' ? (
                                        <Sparkles className="w-4 h-4 text-blue-400" />
                                    ) : (
                                        localStorage.getItem("user_photoURL") ? (
                                            <img
                                                src={localStorage.getItem("user_photoURL")!}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                                U
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                <div className={`inline-block text-sm leading-relaxed px-4 py-2 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800/50 text-gray-300'
                                    }`}>
                                    <ReactMarkdown
                                        components={{
                                            ul: ({ node, ...props }: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                            ol: ({ node, ...props }: any) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                            li: ({ node, ...props }: any) => <li className="mb-0.5" {...props} />,
                                            h1: ({ node, ...props }: any) => <h1 className="text-lg font-bold mb-2 mt-4" {...props} />,
                                            h2: ({ node, ...props }: any) => <h2 className="text-base font-bold mb-2 mt-3" {...props} />,
                                            h3: ({ node, ...props }: any) => <h3 className="text-sm font-bold mb-1 mt-2" {...props} />,
                                            strong: ({ node, ...props }: any) => <span className="font-bold text-white" {...props} />,
                                            p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="relative w-9 h-9 flex items-center justify-center shrink-0 group cursor-pointer">
                                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#DB4437] to-[#0F9D58] opacity-80 blur-[1px] transition-all duration-500"></div>
                                <div className="relative w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full overflow-hidden border border-gray-700/50 bg-[#0f172a] z-10 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 border border-gray-700/30 shadow-lg">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-loader-dots [animation-delay:0ms]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#DB4437] animate-loader-dots [animation-delay:150ms]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#F4B400] animate-loader-dots [animation-delay:300ms]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] animate-loader-dots [animation-delay:450ms]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Chat Input */}
                <div className="relative mt-auto mb-4 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4285F4] via-[#DB4437] to-[#0F9D58] rounded-full opacity-75 group-focus-within:opacity-100 transition-opacity duration-300 blur-[1px] animate-gradient-x -z-10"></div>
                    <div className="relative bg-[#0f172a] rounded-full flex items-center">
                        <div className="pl-4 pr-2 text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={startNewChat}>
                            <Plus size={18} />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Gemini"
                            disabled={isLoading}
                            className="w-full bg-transparent text-white py-3 pr-12 focus:outline-none placeholder:text-gray-500 disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
