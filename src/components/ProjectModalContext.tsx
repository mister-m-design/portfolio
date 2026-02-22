"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { projects } from '@/data/projects';
import { ProjectModal } from './ProjectModal';

interface ProjectContextType {
    openProject: (projectId: string) => void;
    closeProject: () => void;
    activeProject: typeof projects[0] | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

    const openProject = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            setActiveProject(project);
            document.body.style.overflow = 'hidden';
        }
    };

    const closeProject = () => {
        setActiveProject(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <ProjectContext.Provider value={{ openProject, closeProject, activeProject }}>
            {children}
            {activeProject && <ProjectModal project={activeProject} onClose={closeProject} />}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
}
