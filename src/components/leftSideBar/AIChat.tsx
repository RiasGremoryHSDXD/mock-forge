import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, History, Plus, Loader2 } from "lucide-react"; // Removed unused User import
import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const scrollRef = useRef<HTMLDivElement>(null);

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
            const model = genAI.getGenerativeModel({ model: aiConfig.model });
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Collapsed Trigger Button - Now below profile */}
            <div
                onClick={() => setIsChatOpen(true)}
                className={`mt-4 transition-all duration-500 transform ${isChatOpen ? "opacity-0 scale-50 pointer-events-none absolute" : "opacity-100 scale-100 relative"
                    } flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group`}
            >
                <Sparkles className="cursor-pointer w-6 h-6 text-blue-400 fill-blue-400/20 animate-breathe group-hover:scale-110 transition-transform" />
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
                        <button className="p-2 hover:bg-gray-800 rounded-full text-white transition-colors">
                            <History size={18} />
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
                <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-600">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.role === 'model' ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                                    <div className="w-4 h-4 rounded-full bg-gray-400" />
                                </div>
                            )}

                            <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                <div className={`inline-block text-sm leading-relaxed px-4 py-2 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800/50 text-gray-300'
                                    }`}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="flex items-center">
                                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Chat Input */}
                <div className="relative mt-auto mb-4">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Plus size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Gemini"
                        disabled={isLoading}
                        className="w-full bg-[#0f172a] text-white rounded-full py-3 pr-12 pl-10 border border-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-500 disabled:opacity-50"
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
        </>
    );
}
