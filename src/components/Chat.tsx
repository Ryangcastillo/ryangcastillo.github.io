import React, { useState, useRef, useEffect } from 'react';
import { chatWithRyanAI } from '@/services/geminiService';
import type { ChatMessage } from '@/types';
import { SearchIcon } from './icons/SearchIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { UserIcon } from './icons/UserIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ChatProps {
    setProjectPreview: (projectId: number) => void;
    setContentPreview: (message: ChatMessage) => void;
    clearPreviews: () => void;
}

export const Chat: React.FC<ChatProps> = ({ setProjectPreview, setContentPreview, clearPreviews }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        clearPreviews();

        const userMessage: ChatMessage = { role: 'user', parts: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatWithRyanAI(input);
            const charThreshold = 300;

            if (response.projectId) {
                const modelMessage: ChatMessage = { 
                    role: 'model', 
                    parts: response.text, 
                    sources: response.sources 
                };
                setMessages(prev => [...prev, modelMessage]);
                setProjectPreview(response.projectId);

            } else if (!response.preview && response.text.length > charThreshold) {
                const summaryMessage: ChatMessage = {
                    role: 'model',
                    parts: "I've generated a detailed response for you in the preview panel.",
                    sources: response.sources,
                };
                setMessages(prev => [...prev, summaryMessage]);
                
                const fullMessage: ChatMessage = {
                    role: 'model',
                    parts: response.text,
                    sources: response.sources,
                };
                setContentPreview(fullMessage);
            }
            else {
                const modelMessage: ChatMessage = { 
                    role: 'model', 
                    parts: response.text, 
                    sources: response.sources,
                    preview: response.preview,
                };
                setMessages(prev => [...prev, modelMessage]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: ChatMessage = {
                role: 'model',
                parts: "Sorry, I'm having a little trouble connecting right now. Please try again in a moment.",
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto h-[35vh]">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col h-full">
                <div className="flex-grow min-h-0 overflow-y-auto pr-2 space-y-4 mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <SparklesIcon className="w-5 h-5 text-blue-600" />
                                </div>
                            )}
                            <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.parts}</p>
                                 {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-3 border-t border-slate-200 pt-2">
                                        <ul className="space-y-1">
                                            {msg.sources.map((source, i) => (
                                                <li key={i}>
                                                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className={`text-xs ${msg.role === 'user' ? 'text-blue-200 hover:text-white' : 'text-slate-500 hover:underline'} truncate block`}>
                                                       {i+1}. {source.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                    <UserIcon className="w-5 h-5 text-slate-600" />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="relative mt-auto">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Hi! Ask about my projects, e.g. 'Show me your dashboard'"
                        className="w-full py-3 pl-11 pr-14 text-sm bg-slate-50 border border-slate-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <ArrowUpIcon className="w-5 h-5" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
