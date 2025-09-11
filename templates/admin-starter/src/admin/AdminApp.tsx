import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { AuthGate } from './components/AuthGate';
import { ProjectsAdmin } from './pages/ProjectsAdmin';
import { SiteSettingsAdmin } from './pages/SiteSettingsAdmin';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { ContentAdmin } from './pages/ContentAdmin';
import { DataSourcesAdmin } from './pages/DataSourcesAdmin';
import { AdminServicesProvider } from './services/AdminServicesContext';

export const AdminApp: React.FC = () => {
  return (
    <AdminServicesProvider>
      <AuthGate>
        <AdminLayout>
          <Routes>
            <Route path="" element={<DashboardAdmin />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="content" element={<ContentAdmin />} />
            <Route path="data-sources" element={<DataSourcesAdmin />} />
            <Route path="site" element={<SiteSettingsAdmin />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </AdminLayout>
      </AuthGate>
    </AdminServicesProvider>
  );
};

export default AdminApp;
