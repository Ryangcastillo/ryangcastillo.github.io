import type { Project } from '@/types';
import { api } from './api';

const LS_KEY = 'portfolio.projects';

function readLocal(): Project[] | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Project[];
  } catch {
    return null;
  }
}

function writeLocal(projects: Project[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(projects));
  } catch {
    // ignore
  }
}

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
      console.warn('Falling back to local/mock projects due to API error:', e);
    }
  }
  const local = readLocal();
  if (local) return local;
  return new Promise(resolve => setTimeout(() => resolve(mockProjects), 200));
};

// This function would handle creating a new project via an API call.
// The UI does not currently use this, but it's here for future integration.
export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      return await api.post<Project, Omit<Project, 'id'>>('/projects', project);
    } catch (e) {
      console.warn('API addProject failed, using local add:', e);
    }
  }
  const current = (await getProjects()).slice();
  const newProject: Project = { ...project, id: Date.now() } as Project;
  const isMock = current === mockProjects; // best-effort
  const updated = isMock ? [...mockProjects, newProject] : [...current, newProject];
  writeLocal(updated);
  return newProject;
}

export const updateProject = async (project: Project): Promise<Project> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      return await api.put<Project, Project>(`/projects/${project.id}`, project);
    } catch (e) {
      console.warn('API updateProject failed, using local update:', e);
    }
  }
  const list = (await getProjects()).slice();
  const idx = list.findIndex(p => p.id === project.id);
  if (idx >= 0) list[idx] = project; else list.push(project);
  writeLocal(list);
  return project;
}

export const deleteProject = async (id: number): Promise<void> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      await api.delete<void>(`/projects/${id}`);
      return;
    } catch (e) {
      console.warn('API deleteProject failed, using local delete:', e);
    }
  }
  const list = (await getProjects()).filter(p => p.id !== id);
  writeLocal(list);
}
