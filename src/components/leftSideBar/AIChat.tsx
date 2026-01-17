import { Sparkles, Send, X, History, Plus } from "lucide-react";

interface AIChatProps {
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

export default function AIChat({ isChatOpen, setIsChatOpen }: AIChatProps) {
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
                className={`flex-1 w-full px-4 flex flex-col transition-all duration-500 delay-100 ${isChatOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute bottom-0 left-0"
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
                <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {/* AI Message */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <div className="text-gray-300 text-sm leading-relaxed">
                                <p>Hello! I'm Gemini. How can I help you today?</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Input */}
                <div className="relative mt-auto mb-4">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Plus size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Ask Gemini"
                        className="w-full bg-[#0f172a] text-white rounded-full py-3 pr-12 pl-10 border border-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
                        <Send size={16} fill="currentColor" />
                    </button>
                </div>
            </div>
        </>
    );
}
