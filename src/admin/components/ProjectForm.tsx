import React, { useEffect, useState } from 'react';
import type { Project } from '@/types';

interface ProjectFormProps {
  value?: Project | null;
  onCancel?: () => void;
  onSave: (data: Omit<Project, 'id'> | Project) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ value, onCancel, onSave }) => {
  const isEdit = !!(value && value.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [techStack, setTechStack] = useState('');
  const [lastCommit, setLastCommit] = useState('');

  useEffect(() => {
    if (value) {
      setName(value.name || '');
      setDescription(value.description || '');
      setRepoUrl(value.repoUrl || '');
      setTechStack((value.techStack || []).join(', '));
      setLastCommit(value.lastCommit || '');
    } else {
      setName('');
      setDescription('');
      setRepoUrl('');
      setTechStack('');
      setLastCommit('');
    }
  }, [value]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      description: description.trim(),
      repoUrl: repoUrl.trim(),
      techStack: techStack.split(',').map(s => s.trim()).filter(Boolean),
      lastCommit: lastCommit.trim(),
    } as Omit<Project, 'id'>;

    if (isEdit && value) {
      onSave({ ...payload, id: value.id } as Project);
    } else {
      onSave(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" rows={4} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Repo URL</label>
        <input type="url" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Tech Stack (comma separated)</label>
        <input value={techStack} onChange={e => setTechStack(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" placeholder="Python, SQL, Power BI" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Last Commit</label>
        <input value={lastCommit} onChange={e => setLastCommit(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">{isEdit ? 'Update' : 'Add'} Project</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-md">Cancel</button>
        )}
      </div>
    </form>
  );
};

