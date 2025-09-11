import React from 'react';
import type { CmsSection } from '@/services/cmsSettingsService';

interface Props { sections: CmsSection[]; }

export const SectionsRenderer: React.FC<Props> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;
  return (
    <div className="content w-full py-8 space-y-8">
      {sections.map((s) => (
        <SectionItem key={s.id} section={s} />
      ))}
    </div>
  );
};

const SectionItem: React.FC<{ section: CmsSection }> = ({ section }) => {
  switch (section.type) {
    case 'text':
      return (
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {section.title && <h2 className="font-bold text-slate-900 mb-2">{section.title}</h2>}
          {section.body && <p className="text-slate-700">{section.body}</p>}
        </section>
      );
    case 'featureList':
      return (
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {section.title && <h2 className="font-bold text-slate-900 mb-2">{section.title}</h2>}
          {section.body && <p className="text-slate-700 mb-3">{section.body}</p>}
          <ul className="grid sm:grid-cols-2 gap-2 list-disc list-inside text-slate-700">
            {(section.items || []).map((it, idx) => <li key={idx}>{it}</li>)}
          </ul>
        </section>
      );
    case 'cta':
      return (
        <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          {section.title && <h2 className="font-bold text-slate-900 mb-2">{section.title}</h2>}
          {section.body && <p className="text-slate-700 mb-4">{section.body}</p>}
          {section.ctaHref && section.ctaLabel && (
            <a href={section.ctaHref} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">
              {section.ctaLabel}
            </a>
          )}
        </section>
      );
    default:
      return null;
  }
};

