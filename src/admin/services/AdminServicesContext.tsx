import React, { createContext, useContext } from 'react';
import type { AdminServices } from './types';
import { defaultAdminServices } from './adapters';

const AdminServicesContext = createContext<AdminServices>(defaultAdminServices);

export const AdminServicesProvider: React.FC<{ services?: AdminServices; children: React.ReactNode }>
  = ({ services, children }) => (
    <AdminServicesContext.Provider value={services || defaultAdminServices}>
      {children}
    </AdminServicesContext.Provider>
  );

export function useAdminServices(): AdminServices {
  return useContext(AdminServicesContext);
}

export { defaultAdminServices };

