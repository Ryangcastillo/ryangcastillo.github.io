import React, { useEffect, useState } from 'react';
import type { SiteSettings } from '@/services/siteSettingsService';
import { useAdminServices } from '../services/AdminServicesContext';

export const SiteSettingsAdmin: React.FC = () => {
  const { siteSettingsService } = useAdminServices();
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const s = await siteSettingsService.getSiteSettings();
      setSettings(s);
    } catch (e: any) {
      setError(e?.message || 'Failed to load settings');
    } finally {
      setLoading(false);
      setSaved(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    try {
      await siteSettingsService.saveSiteSettings(settings);
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || 'Failed to save settings');
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Site Settings</h2>
      <p className="text-sm text-slate-600 mb-4">Manage global site content like your bio and contact email.</p>
      {error && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>}
      {loading ? (
        <div className="text-slate-600">Loading…</div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 bg-white border border-slate-200 rounded-lg p-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Bio</label>
            <textarea
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
              rows={5}
              placeholder="Short professional bio to show on the homepage"
              value={settings.bio || ''}
              onChange={e => setSettings(s => ({ ...s, bio: e.target.value }))}
            />
            <p className="mt-1 text-xs text-slate-500">This overrides the generated/default bio.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Contact Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
              placeholder="you@example.com"
              value={settings.contactEmail || ''}
              onChange={e => setSettings(s => ({ ...s, contactEmail: e.target.value }))}
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">Save Settings</button>
            {saved && <span className="text-green-700 text-sm">Saved!</span>}
          </div>
        </form>
      )}
    </div>
  );
};
