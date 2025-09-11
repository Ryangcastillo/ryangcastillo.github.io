import type { Project } from '@/types';
import type { SiteSettings } from '@/services/siteSettingsService';
import type { CmsSettings } from '@/services/cmsSettingsService';

export interface IProjectService {
  getProjects(): Promise<Project[]>;
  addProject(p: Omit<Project, 'id'>): Promise<Project>;
  updateProject(p: Project): Promise<Project>;
  deleteProject(id: number): Promise<void>;
}

export interface ISiteSettingsService {
  getSiteSettings(): Promise<SiteSettings>;
  saveSiteSettings(s: SiteSettings): Promise<SiteSettings>;
}

export interface ICmsSettingsService {
  getCmsSettings(): Promise<CmsSettings>;
  saveCmsSettings(s: CmsSettings): Promise<CmsSettings>;
}

export interface AdminServices {
  projectService: IProjectService;
  siteSettingsService: ISiteSettingsService;
  cmsSettingsService: ICmsSettingsService;
}

