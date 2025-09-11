import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.resolve(process.cwd(), 'server', 'data');

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson(file, defaultValue) {
  await ensureDir();
  const p = path.join(dataDir, file);
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if ((e && e.code) === 'ENOENT') return defaultValue;
    throw e;
  }
}

async function writeJson(file, value) {
  await ensureDir();
  const p = path.join(dataDir, file);
  await fs.writeFile(p, JSON.stringify(value, null, 2), 'utf8');
}

export const store = {
  async getProjects() {
    return readJson('projects.json', []);
  },
  async saveProjects(list) {
    await writeJson('projects.json', list);
  },
  async getSiteSettings() {
    return readJson('siteSettings.json', {});
  },
  async saveSiteSettings(settings) {
    await writeJson('siteSettings.json', settings);
  },
  async getCmsSettings() {
    const defaults = { hero: {}, skills: [], links: [], sections: [], dataSource: { type: 'none' } };
    return readJson('cmsSettings.json', defaults);
  },
  async saveCmsSettings(settings) {
    await writeJson('cmsSettings.json', settings);
  }
};
