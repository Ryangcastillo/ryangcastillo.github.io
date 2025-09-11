// Example: Bring the Admin module into another app by providing your own services.
// Copy this file and adapt to your backend/API. Then wrap <AdminApp /> in AdminServicesProvider.

import type { AdminServices, IProjectService, ISiteSettingsService, ICmsSettingsService } from '../services/types';

// Replace with your API base
const API_BASE = 'https://api.example.com';

async function http<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts?.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}

export const customProjectService: IProjectService = {
  getProjects: () => http('/projects'),
  addProject: (p) => http('/projects', { method: 'POST', body: JSON.stringify(p) }),
  updateProject: (p) => http(`/projects/${p.id}`, { method: 'PUT', body: JSON.stringify(p) }),
  deleteProject: async (id) => { await http(`/projects/${id}`, { method: 'DELETE' }); },
};

export const customSiteSettingsService: ISiteSettingsService = {
  getSiteSettings: () => http('/site-settings'),
  saveSiteSettings: (s) => http('/site-settings', { method: 'PUT', body: JSON.stringify(s) }),
};

export const customCmsSettingsService: ICmsSettingsService = {
  getCmsSettings: () => http('/cms-settings'),
  saveCmsSettings: (s) => http('/cms-settings', { method: 'PUT', body: JSON.stringify(s) }),
};

export const customAdminServices: AdminServices = {
  projectService: customProjectService,
  siteSettingsService: customSiteSettingsService,
  cmsSettingsService: customCmsSettingsService,
};

