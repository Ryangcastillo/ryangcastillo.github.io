import React from 'react';
import type { Preview } from '../types';
import { XIcon } from './icons/XIcon';

interface PreviewSectionProps {
    preview: Preview | null;
    onClose: () => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ preview, onClose }) => {
    if (!preview) return null;

    return (
        <section className="pb-16 md:pb-20 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                    <p className="text-lg text-slate-600">{preview.summary}</p>
                </div>
                <div className="relative p-2 sm:p-4 rounded-3xl bg-gradient-to-br from-yellow-100 via-rose-100 to-sky-100 shadow-2xl">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
                        aria-label="Close preview"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                        <div className="h-10 bg-slate-100/50 border-b border-slate-200/80 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/50"></div>
                        </div>

                        <div className="p-4 sm:p-6 text-left">
                            {preview.contentType === 'code' ? (
                                <pre className="bg-slate-900 text-white p-4 rounded-lg text-sm overflow-x-auto font-mono">
                                    <code>{preview.content}</code>
                                </pre>
                            ) : (
                                <div className="prose prose-slate max-w-none">
                                    <p>{preview.content}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};