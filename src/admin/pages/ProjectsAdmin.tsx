import React, { useEffect, useState } from 'react';
import type { Project } from '@/types';
import { ProjectForm } from '../components/ProjectForm';
import { useAdminServices } from '../services/AdminServicesContext';

export const ProjectsAdmin: React.FC = () => {
  const { projectService } = useAdminServices();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const list = await projectService.getProjects();
      setProjects(list);
    } catch (e: any) {
      setError(e?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (data: Omit<Project, 'id'> | Project) => {
    try {
      await projectService.addProject(data as Omit<Project, 'id'>);
      setShowNew(false);
      await load();
    } catch (e: any) {
      setError(e?.message || 'Failed to add project');
    }
  };

  const onUpdate = async (data: Omit<Project, 'id'> | Project) => {
    try {
      await projectService.updateProject(data as Project);
      setEditing(null);
      await load();
    } catch (e: any) {
      setError(e?.message || 'Failed to update project');
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectService.deleteProject(id);
      await load();
    } catch (e: any) {
      setError(e?.message || 'Failed to delete project');
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-600">Add, edit, or remove portfolio projects.</p>
        </div>
        <button onClick={() => { setShowNew(true); setEditing(null); }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-md">Add Project</button>
      </div>
      {error && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>}
      {loading ? (
        <div className="text-slate-600">Loading…</div>
      ) : (
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Tech</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Repo</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-t border-slate-200">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{p.name}</div>
                    <div className="text-slate-500 line-clamp-2 max-w-[40ch]">{p.description}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.techStack.join(', ')}</td>
                  <td className="px-4 py-3 text-blue-600 truncate max-w-[28ch]">
                    <a href={p.repoUrl} target="_blank" rel="noreferrer" className="hover:underline">{p.repoUrl}</a>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => { setEditing(p); setShowNew(false); }} className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700">Edit</button>
                    <button onClick={() => onDelete(p.id)} className="px-3 py-1.5 rounded-md border border-red-300 bg-red-50 hover:bg-red-100 text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showNew || editing) && (
        <div className="mt-6 bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{editing ? 'Edit Project' : 'New Project'}</h3>
          <ProjectForm
            value={editing}
            onCancel={() => { setEditing(null); setShowNew(false); }}
            onSave={editing ? onUpdate : onCreate}
          />
        </div>
      )}
    </div>
  );
};
