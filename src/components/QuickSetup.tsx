import React from 'react';

export const QuickSetup: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
            <h3 className="text-lg font-bold mb-2">Quick Setup</h3>
            <p className="text-sm text-slate-600">Clone the repo and run the dev server:</p>
            <pre className="bg-slate-50 p-3 rounded mt-3 text-xs text-slate-700">git clone ...</pre>
        </div>
    );
};
