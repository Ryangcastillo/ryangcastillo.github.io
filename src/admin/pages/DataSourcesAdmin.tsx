import React, { useEffect, useState } from 'react';
import type { CmsSettings, DataSourceConfig } from '@/services/cmsSettingsService';
import { useAdminServices } from '../services/AdminServicesContext';

const typeOptions: DataSourceConfig['type'][] = ['none', 'api', 'database', 'url'];

export const DataSourcesAdmin: React.FC = () => {
  const { cmsSettingsService } = useAdminServices();
  const [settings, setSettings] = useState<CmsSettings>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { (async () => {
    try { setSettings(await cmsSettingsService.getCmsSettings()); } catch (e: any) { setError(e?.message || 'Failed to load'); }
  })(); }, []);

  const ds = settings.dataSource || { type: 'none' };
  const update = (patch: Partial<DataSourceConfig>) => setSettings(s => ({ ...s, dataSource: { ...(s.dataSource || { type: 'none' }), ...patch } }));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); setSaved(false); setError('');
    try { await cmsSettingsService.saveCmsSettings(settings); setSaved(true); } catch (e: any) { setError(e?.message || 'Failed to save'); }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Data Sources</h2>
      <p className="text-sm text-slate-600 mb-4">Configure how your content connects to external data. This UI stores configuration only; you can wire up the actual data source later.</p>
      {error && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4 bg-white border border-slate-200 rounded-lg p-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Type</label>
          <select value={ds.type} onChange={e => update({ type: e.target.value as DataSourceConfig['type'] })} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2">
            {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <p className="text-xs text-slate-500 mt-1">Choose the style of integration (no-op, REST API base, DB connection string, or a single URL).</p>
        </div>

        {ds.type === 'api' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">API Base URL</label>
            <input value={ds.apiBase || ''} onChange={e => update({ apiBase: e.target.value })} placeholder="https://api.example.com" className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            <p className="text-xs text-slate-500 mt-1">Matches Vite’s `VITE_API_BASE` when you’re ready to connect.</p>
          </div>
        )}

        {ds.type === 'database' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Connection String</label>
            <input value={ds.connectionString || ''} onChange={e => update({ connectionString: e.target.value })} placeholder="Server=...;Database=...;User Id=...;Password=...;" className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            <p className="text-xs text-slate-500 mt-1">Store your DB connection string here (not used directly by the client).</p>
          </div>
        )}

        {ds.type === 'url' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Source URL</label>
            <input value={ds.url || ''} onChange={e => update({ url: e.target.value })} placeholder="https://example.com/data.json" className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            <p className="text-xs text-slate-500 mt-1">If your content lives at a single URL.</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea value={ds.notes || ''} onChange={e => update({ notes: e.target.value })} rows={4} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" placeholder="Document any setup, credentials, or future steps."></textarea>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">Save</button>
          {saved && <span className="text-green-700 text-sm">Saved!</span>}
        </div>
      </form>
    </div>
  );
};
