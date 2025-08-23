import React from 'react';
import type { Project } from '../types';
import { XIcon } from './icons/XIcon';
import { ArrowUpRightIcon } from './icons/ArrowUpRightIcon';
import { GitHubIcon } from './icons/GitHubIcon';

interface ProjectPreviewProps {
    project: Project;
    onClose: () => void;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, onClose }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-full flex flex-col animate-fade-in">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <GitHubIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close project preview"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>

            <p className="text-slate-600 text-sm mb-4 flex-grow">{project.description}</p>
            
            <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                        <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-200">
                 <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 group text-sm">
                    View on GitHub
                    <ArrowUpRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
            </div>
        </div>
    );
};