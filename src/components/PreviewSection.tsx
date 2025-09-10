import React from 'react';

export const PreviewSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <section className="space-y-4">{children}</section>;
};
