import React, { useEffect, useState } from 'react';
import { useAdminServices } from '../services/AdminServicesContext';

export const DashboardAdmin: React.FC = () => {
  const { projectService, siteSettingsService, cmsSettingsService } = useAdminServices();
  const [counts, setCounts] = useState({ projects: 0, skills: 0, links: 0 });
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [hero, setHero] = useState<{ title?: string; subtitle?: string }>({});

  useEffect(() => {
    (async () => {
      const [projects, site, cms] = await Promise.all([
        projectService.getProjects(), siteSettingsService.getSiteSettings(), cmsSettingsService.getCmsSettings()
      ]);
      setCounts({ projects: projects.length, skills: (cms.skills || []).length, links: (cms.links || []).length });
      setEmail(site.contactEmail);
      setHero(cms.hero || {});
    })();
  }, []);

  const Card: React.FC<{ title: string; value: string | number; href: string }>
    = ({ title, value, href }) => (
      <a href={href} className="block bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md">
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
      </a>
    );

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
        <p className="text-sm text-slate-600">Quick snapshot of your content.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Projects" value={counts.projects} href="/admin/projects" />
        <Card title="Skills" value={counts.skills} href="/admin/content" />
        <Card title="Links" value={counts.links} href="/admin/content" />
      </div>
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-slate-900">Highlights</h3>
        <ul className="mt-2 text-sm text-slate-700 space-y-1">
          <li><span className="font-medium">Contact Email:</span> {email || 'not set'}</li>
          <li><span className="font-medium">Hero Title:</span> {hero.title || 'default'}</li>
          <li><span className="font-medium">Hero Subtitle:</span> {hero.subtitle || 'default'}</li>
        </ul>
      </div>
    </div>
  );
};
