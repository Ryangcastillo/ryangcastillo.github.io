// Example: Mount the Admin app into a host project at /admin/* using your services
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminApp from '../AdminApp';
import { AdminServicesProvider } from '../services/AdminServicesContext';
import { customAdminServices } from './customServicesExample';

export const AdminRoutes: React.FC = () => (
  <AdminServicesProvider services={customAdminServices}>
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  </AdminServicesProvider>
);

// Alternatively, for a standalone entry (separate admin.html), render <AdminApp /> at the root
// with <BrowserRouter> in your admin entrypoint, similar to src/admin/main-admin.tsx.

