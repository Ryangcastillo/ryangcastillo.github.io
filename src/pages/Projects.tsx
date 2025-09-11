import React, { useState, useEffect } from 'react';
import { getProjects } from '@/services/projectService';
import { ProjectsSection } from '@/components/ProjectsSection';
import type { Project } from '@/types';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProjects = async () => {
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
        };
        fetchProjects();
    }, []);

    return (
        <div className="w-full animate-fade-in">
            <ProjectsSection projects={projects} />
        </div>
    );
};

export default Projects;
