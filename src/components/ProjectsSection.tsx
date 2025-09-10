import React from 'react';
import type { Project } from '../types';
import { ArrowUpRightIcon } from './icons/ArrowUpRightIcon';

interface ProjectsSectionProps {
    projects: Project[];
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: `${400 + index * 100}ms`, opacity: 0 }}>
        <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold text-slate-900">{project.name}</h3>
            <p className="text-slate-600 mt-2 flex-grow">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                        {tech}
                    </span>
                ))}
            </div>
            <div className="mt-6">
                 <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 group">
                    View on GitHub
                    <ArrowUpRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
            </div>
        </div>
    </div>
);


export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-16 md:py-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Projects</h2>
            <p className="mt-2 text-lg text-slate-600">A selection of my work. See something you like?</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            {projects.length > 0 ? (
                 projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)
            ) : (
                <div className="col-span-full text-center py-8 text-slate-500">Loading projects...</div>
            )}
        </div>
    </section>
  );
};
