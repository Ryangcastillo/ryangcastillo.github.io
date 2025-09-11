export interface CmsLink { label: string; url: string; }
export interface CmsHero { title?: string; subtitle?: string; backgroundUrl?: string; }
export type SectionType = 'text' | 'featureList' | 'cta';
export interface CmsSection {
  id: string;
  type: SectionType;
  title?: string;
  body?: string;
  items?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}
export interface DataSourceConfig {
  type: 'none' | 'api' | 'database' | 'url';
  apiBase?: string;
  connectionString?: string;
  url?: string;
  notes?: string;
}
export interface CmsSettings {
  hero?: CmsHero;
  skills?: string[];
  links?: CmsLink[];
  sections?: CmsSection[];
  dataSource?: DataSourceConfig;
}

const LS_KEY = 'portfolio.cmsSettings';

function readLocal(): CmsSettings | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CmsSettings;
  } catch { return null; }
}
function writeLocal(s: CmsSettings) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
}

export const getCmsSettings = async (): Promise<CmsSettings> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/cms-settings`);
      if (res.ok) return (await res.json()) as CmsSettings;
    } catch (e) {
      console.warn('CMS settings API unavailable, using local:', e);
    }
  }
  return readLocal() || {};
}

export const saveCmsSettings = async (s: CmsSettings): Promise<CmsSettings> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/cms-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      });
      if (res.ok) return (await res.json()) as CmsSettings;
    } catch (e) {
      console.warn('CMS settings API save failed, using local save:', e);
    }
  }
  writeLocal(s);
  return s;
}
