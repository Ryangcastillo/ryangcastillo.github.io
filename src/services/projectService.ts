import type { Project } from '../types';
import { api } from './api';

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'procurement-analytics-dashboard',
    description: 'Comprehensive Power BI dashboard to visualize procurement spending, supplier performance, and commercial metrics. Utilizes data from D365, SQL, and SharePoint.',
    repoUrl: 'https://github.com/Ryangcastillo/procurement-dashboard',
    techStack: ['Power BI', 'DAX', 'SQL', 'D365 FinOps', 'Dataverse'],
    lastCommit: 'feat: add new vendor KPI visuals'
  },
  {
    id: 2,
    name: 'data-quality-automation-pipeline',
    description: 'An automated pipeline using Azure DevOps and Python scripts to perform data extraction, cleansing, and validation, ensuring high data integrity for reporting.',
    repoUrl: 'https://github.com/Ryangcastillo/data-automation',
    techStack: ['Python', 'Azure DevOps', 'SQL Server', 'ETL'],
    lastCommit: 'fix: improve error handling for aggregation'
  },
  {
    id: 3,
    name: 'operational-efficiency-powerapp',
    description: 'Developed a PowerApps solution to streamline the vendor onboarding process, reducing manual data entry and improving approval workflows within the D365 ecosystem.',
    repoUrl: 'https://github.com/Ryangcastillo/vendor-onboarding-app',
    techStack: ['PowerApps', 'Power Automate', 'SharePoint', 'Dynamics 365'],
    lastCommit: 'refactor: optimize data connections'
  },
];

// In a real application, this would be an async API call.
// For now, it returns a promise that resolves with mock data.
export const getProjects = async (): Promise<Project[]> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      return await api.get<Project[]>('/projects');
    } catch (e) {
      console.warn('Falling back to mock projects due to API error:', e);
    }
  }
  return new Promise(resolve => setTimeout(() => resolve(mockProjects), 300));
};

// This function would handle creating a new project via an API call.
// The UI does not currently use this, but it's here for future integration.
export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      return await api.post<Project, Omit<Project, 'id'>>('/projects', project);
    } catch (e) {
      console.warn('API addProject failed, using mock add:', e);
    }
  }
  const newProject: Project = { ...project, id: Date.now() } as Project;
  mockProjects.push(newProject);
  return new Promise(resolve => setTimeout(() => resolve(newProject), 300));
}
