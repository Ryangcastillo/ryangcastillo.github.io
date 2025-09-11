import express from 'express';
import cors from 'cors';
import { store } from './dataStore.js';

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

// Projects CRUD
app.get('/projects', async (req, res, next) => {
  try {
    const list = await store.getProjects();
    res.json(list);
  } catch (e) { next(e); }
});

app.post('/projects', async (req, res, next) => {
  try {
    const body = req.body || {};
    const list = await store.getProjects();
    const id = Date.now();
    const project = { id, ...body };
    list.push(project);
    await store.saveProjects(list);
    res.status(201).json(project);
  } catch (e) { next(e); }
});

app.put('/projects/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const list = await store.getProjects();
    const idx = list.findIndex(p => Number(p.id) === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    list[idx] = { ...req.body, id };
    await store.saveProjects(list);
    res.json(list[idx]);
  } catch (e) { next(e); }
});

app.delete('/projects/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const list = await store.getProjects();
    const nextList = list.filter(p => Number(p.id) !== id);
    await store.saveProjects(nextList);
    res.status(204).end();
  } catch (e) { next(e); }
});

// Site settings
app.get('/site-settings', async (req, res, next) => {
  try {
    const s = await store.getSiteSettings();
    res.json(s);
  } catch (e) { next(e); }
});

app.put('/site-settings', async (req, res, next) => {
  try {
    const s = req.body || {};
    await store.saveSiteSettings(s);
    res.json(s);
  } catch (e) { next(e); }
});

// CMS settings (hero/skills/links/data source)
app.get('/cms-settings', async (req, res, next) => {
  try {
    const s = await store.getCmsSettings();
    res.json(s);
  } catch (e) { next(e); }
});

app.put('/cms-settings', async (req, res, next) => {
  try {
    const s = req.body || {};
    await store.saveCmsSettings(s);
    res.json(s);
  } catch (e) { next(e); }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

