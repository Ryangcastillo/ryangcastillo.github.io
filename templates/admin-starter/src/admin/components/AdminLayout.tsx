import React from 'react';
import { NavLink } from 'react-router-dom';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const linkBase = "block px-3 py-2 rounded-md font-medium text-sm";
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${linkBase} bg-blue-600 text-white`
      : `${linkBase} text-slate-700 hover:bg-slate-100`;

  return (
    <div className="min-h-screen grid grid-cols-12 bg-slate-50">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-slate-200 bg-white">
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-lg font-bold text-slate-900">Portfolio Admin</h1>
          <p className="text-xs text-slate-500">Manage content</p>
        </div>
        <nav className="p-3 space-y-1">
          <NavLink to="/admin" end className={active}>Dashboard</NavLink>
          <NavLink to="/admin/projects" className={active}>Projects</NavLink>
          <NavLink to="/admin/content" className={active}>Content</NavLink>
          <NavLink to="/admin/data-sources" className={active}>Data Sources</NavLink>
          <NavLink to="/admin/site" className={active}>Site Settings</NavLink>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};
