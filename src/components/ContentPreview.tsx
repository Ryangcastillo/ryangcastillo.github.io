import React from 'react';
import type { ChatMessage } from '@/types';
import { XIcon } from './icons/XIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ContentPreviewProps {
    message: ChatMessage;
    onClose: () => void;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ message, onClose }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-full flex flex-col animate-fade-in">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <SparklesIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">AI Response</h3>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close preview"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="text-slate-600 text-sm mb-4 flex-grow overflow-y-auto pr-2">
                <p className="whitespace-pre-wrap">{message.parts}</p>
            </div>
            
            {message.sources && message.sources.length > 0 && (
                <div className="mt-auto pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sources</h4>
                    <ul className="space-y-1">
                        {message.sources.map((source, i) => (
                            <li key={i}>
                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate block">
                                    {i+1}. {source.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
