import React from 'react';

export const CommandLineSection: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
            <h4 className="font-semibold mb-2">Command Line</h4>
            <code className="text-xs block bg-slate-50 p-3 rounded">npm run dev</code>
        </div>
    );
};
