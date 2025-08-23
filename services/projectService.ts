
import type { Project } from '../types';

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
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 500); // Simulate network delay
  });
};

// This function would handle creating a new project via an API call.
// The UI does not currently use this, but it's here for future integration.
export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
    console.log("Adding project:", project);
    // In a real app, you would post this to your backend and get the new project back.
    const newProject = { ...project, id: Date.now() };
    mockProjects.push(newProject);
    return new Promise(resolve => setTimeout(() => resolve(newProject), 500));
}
