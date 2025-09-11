import { addProject, deleteProject, getProjects, updateProject } from '@/services/projectService';
import { getSiteSettings, saveSiteSettings } from '@/services/siteSettingsService';
import { getCmsSettings, saveCmsSettings } from '@/services/cmsSettingsService';
import type { AdminServices } from './types';

export const defaultAdminServices: AdminServices = {
  projectService: { getProjects, addProject, updateProject, deleteProject },
  siteSettingsService: { getSiteSettings, saveSiteSettings },
  cmsSettingsService: { getCmsSettings, saveCmsSettings },
};

