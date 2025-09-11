import React, { useMemo, useState } from 'react';

const SESSION_KEY = 'portfolio.admin.auth';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const configuredPassword = (import.meta as any).env?.VITE_ADMIN_PASSWORD as string | undefined;
  const disabled = !configuredPassword; // if no password is set, allow access
  const [authed, setAuthed] = useState<boolean>(() => {
    if (disabled) return true;
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
  });
  const [error, setError] = useState<string>('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!configuredPassword) return setAuthed(true);
    const data = new FormData(e.currentTarget);
    const pw = String(data.get('password') || '');
    if (pw === configuredPassword) {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
      setAuthed(true);
    } else {
      setError('Incorrect password');
    }
  };

  const LoginForm = useMemo(() => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md border border-slate-200 w-full max-w-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Admin Login</h2>
        <p className="text-sm text-slate-600 mb-4">Enter the admin password to continue.</p>
        <input
          type="password"
          name="password"
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">Sign in</button>
      </form>
    </div>
  ), [error]);

  if (!authed) return LoginForm;
  return <>{children}</>;
};

