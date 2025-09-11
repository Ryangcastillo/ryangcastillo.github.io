export interface SiteSettings {
  bio?: string;
  contactEmail?: string;
}

const LS_KEY = 'portfolio.siteSettings';

function readLocal(): SiteSettings | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteSettings;
  } catch {
    return null;
  }
}

function writeLocal(settings: SiteSettings) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  // Optional future API
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/site-settings`);
      if (res.ok) return (await res.json()) as SiteSettings;
    } catch (e) {
      console.warn('Site settings API unavailable, using local:', e);
    }
  }
  return readLocal() || {};
}

export const saveSiteSettings = async (settings: SiteSettings): Promise<SiteSettings> => {
  const base = (import.meta as any).env?.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) return (await res.json()) as SiteSettings;
    } catch (e) {
      console.warn('Site settings API save failed, using local save:', e);
    }
  }
  writeLocal(settings);
  return settings;
}

