import React, { useEffect, useState } from 'react';
import type { CmsSettings, CmsLink, CmsSection, SectionType } from '@/services/cmsSettingsService';
import { useAdminServices } from '../services/AdminServicesContext';

export const ContentAdmin: React.FC = () => {
  const { cmsSettingsService } = useAdminServices();
  const [settings, setSettings] = useState<CmsSettings>({ skills: [], links: [], hero: {} });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try { setSettings(await cmsSettingsService.getCmsSettings()); } catch (e: any) { setError(e?.message || 'Failed to load'); }
    })();
  }, []);

  const addSkill = () => setSettings(s => ({ ...s, skills: [...(s.skills || []), ''] }));
  const updateSkill = (i: number, v: string) => setSettings(s => ({ ...s, skills: (s.skills || []).map((x, idx) => idx === i ? v : x) }));
  const removeSkill = (i: number) => setSettings(s => ({ ...s, skills: (s.skills || []).filter((_, idx) => idx !== i) }));

  const addLink = () => setSettings(s => ({ ...s, links: [...(s.links || []), { label: '', url: '' }] }));
  const updateLink = (i: number, patch: Partial<CmsLink>) => setSettings(s => ({ ...s, links: (s.links || []).map((x, idx) => idx === i ? { ...x, ...patch } : x) }));
  const removeLink = (i: number) => setSettings(s => ({ ...s, links: (s.links || []).filter((_, idx) => idx !== i) }));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(''); setSaved(false);
    try {
      await cmsSettingsService.saveCmsSettings(settings);
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || 'Failed to save');
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Content</h2>
      <p className="text-sm text-slate-600 mb-4">Manage hero text, skills and external links.</p>
      {error && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Hero</h3>
          <div className="grid gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input value={settings.hero?.title || ''} onChange={e => setSettings(s => ({ ...s, hero: { ...(s.hero || {}), title: e.target.value } }))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Subtitle</label>
              <input value={settings.hero?.subtitle || ''} onChange={e => setSettings(s => ({ ...s, hero: { ...(s.hero || {}), subtitle: e.target.value } }))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Background Image URL</label>
              <input value={settings.hero?.backgroundUrl || ''} onChange={e => setSettings(s => ({ ...s, hero: { ...(s.hero || {}), backgroundUrl: e.target.value } }))} placeholder="https://.../image.jpg" className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
              <p className="text-xs text-slate-500 mt-1">Optional. If set, the hero section uses it as a full-bleed background.</p>
            </div>
            {settings.hero?.backgroundUrl ? (
              <div className="mt-2">
                <div className="text-sm text-slate-600 mb-1">Background Preview</div>
                <div className="w-full max-w-md h-32 rounded-lg border border-slate-200 bg-slate-100 overflow-hidden"
                     style={{ backgroundImage: `url(${settings.hero.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
            <button type="button" onClick={addSkill} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">Add Skill</button>
          </div>
          <div className="space-y-2">
            {(settings.skills || []).map((skill, i) => (
              <div key={i} className="flex gap-2">
                <input value={skill} onChange={e => updateSkill(i, e.target.value)} className="flex-1 border border-slate-300 rounded-md px-3 py-2" />
                <button type="button" onClick={() => removeSkill(i)} className="px-3 py-2 rounded-md border border-red-300 bg-red-50 hover:bg-red-100 text-red-700">Remove</button>
              </div>
            ))}
            {(settings.skills || []).length === 0 && <p className="text-sm text-slate-500">No skills yet.</p>}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900">Links</h3>
            <button type="button" onClick={addLink} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">Add Link</button>
          </div>
          <div className="space-y-2">
            {(settings.links || []).map((link, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <input value={link.label} onChange={e => updateLink(i, { label: e.target.value })} placeholder="Label" className="md:col-span-4 border border-slate-300 rounded-md px-3 py-2" />
                <input value={link.url} onChange={e => updateLink(i, { url: e.target.value })} placeholder="URL" className="md:col-span-7 border border-slate-300 rounded-md px-3 py-2" />
                <button type="button" onClick={() => removeLink(i)} className="md:col-span-1 px-3 py-2 rounded-md border border-red-300 bg-red-50 hover:bg-red-100 text-red-700">Remove</button>
              </div>
            ))}
            {(settings.links || []).length === 0 && <p className="text-sm text-slate-500">No links yet.</p>}
          </div>
        </div>

        {/* Sections Builder */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900">Sections</h3>
            <div className="flex gap-2">
              <AddSectionButtons onAdd={(type) => {
                const newSection: CmsSection = { id: String(Date.now()), type, title: '', body: '', items: [], ctaLabel: '', ctaHref: '' };
                setSettings(s => ({ ...s, sections: [...(s.sections || []), newSection] }));
              }} />
            </div>
          </div>
          <div className="space-y-4">
            {(settings.sections || []).map((sec, idx) => (
              <SectionEditor key={sec.id}
                section={sec}
                index={idx}
                onChange={(patch) => setSettings(s => ({ ...s, sections: (s.sections || []).map((x, i) => i === idx ? { ...x, ...patch } as CmsSection : x) }))}
                onRemove={() => setSettings(s => ({ ...s, sections: (s.sections || []).filter((_, i) => i !== idx) }))}
                onMoveUp={() => setSettings(s => ({ ...s, sections: moveIndex(s.sections || [], idx, Math.max(0, idx - 1)) }))}
                onMoveDown={() => setSettings(s => ({ ...s, sections: moveIndex(s.sections || [], idx, Math.min((s.sections || []).length - 1, idx + 1)) }))}
              />
            ))}
            {(settings.sections || []).length === 0 && <p className="text-sm text-slate-500">No sections yet. Add one using the buttons above.</p>}
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">Save Content</button>
          {saved && <span className="text-green-700 text-sm">Saved!</span>}
        </div>
      </form>
    </div>
  );
};

function moveIndex<T>(arr: T[], from: number, to: number): T[] {
  if (from === to) return arr.slice();
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

const AddSectionButtons: React.FC<{ onAdd: (t: SectionType) => void }> = ({ onAdd }) => (
  <div className="flex flex-wrap gap-2">
    <button type="button" onClick={() => onAdd('text')} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">Add Text</button>
    <button type="button" onClick={() => onAdd('featureList')} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">Add Feature List</button>
    <button type="button" onClick={() => onAdd('cta')} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">Add CTA</button>
  </div>
);

const SectionEditor: React.FC<{
  section: CmsSection;
  index: number;
  onChange: (patch: Partial<CmsSection>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}> = ({ section, index, onChange, onRemove, onMoveUp, onMoveDown }) => {
  return (
    <div className="border border-slate-200 rounded-md p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Section #{index + 1} — <span className="font-medium">{section.type}</span></div>
        <div className="flex gap-2">
          <button type="button" onClick={onMoveUp} className="px-2 py-1 rounded-md border border-slate-300">Up</button>
          <button type="button" onClick={onMoveDown} className="px-2 py-1 rounded-md border border-slate-300">Down</button>
          <button type="button" onClick={onRemove} className="px-2 py-1 rounded-md border border-red-300 bg-red-50 text-red-700">Remove</button>
        </div>
      </div>

      <div className="grid gap-3 mt-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Type</label>
          <select value={section.type} onChange={e => onChange({ type: e.target.value as SectionType })} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2">
            <option value="text">Text</option>
            <option value="featureList">Feature List</option>
            <option value="cta">Call To Action</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input value={section.title || ''} onChange={e => onChange({ title: e.target.value })} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
        </div>

        {(section.type === 'text' || section.type === 'featureList') && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Body</label>
            <textarea value={section.body || ''} onChange={e => onChange({ body: e.target.value })} rows={4} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
          </div>
        )}

        {section.type === 'featureList' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Items</label>
            <ItemList items={section.items || []} onChange={(items) => onChange({ items })} />
          </div>
        )}

        {section.type === 'cta' && (
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">CTA Label</label>
              <input value={section.ctaLabel || ''} onChange={e => onChange({ ctaLabel: e.target.value })} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">CTA Href</label>
              <input value={section.ctaHref || ''} onChange={e => onChange({ ctaHref: e.target.value })} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ItemList: React.FC<{ items: string[]; onChange: (items: string[]) => void }> = ({ items, onChange }) => {
  const add = () => onChange([...items, '']);
  const update = (i: number, v: string) => onChange(items.map((x, idx) => idx === i ? v : x));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <input value={it} onChange={e => update(i, e.target.value)} className="flex-1 border border-slate-300 rounded-md px-3 py-2" />
          <button type="button" onClick={() => remove(i)} className="px-3 py-2 rounded-md border border-red-300 bg-red-50 text-red-700">Remove</button>
        </div>
      ))}
      <button type="button" onClick={add} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">Add Item</button>
    </div>
  );
};
