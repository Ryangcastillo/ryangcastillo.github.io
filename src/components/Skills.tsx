import React from 'react';

export const Skills: React.FC = () => {
    const skills = ['TypeScript', 'React', 'Vite', 'Tailwind'];
    return (
        <div className="grid grid-cols-2 gap-3">
            {skills.map((s) => (
                <div key={s} className="bg-white p-3 rounded shadow text-sm">{s}</div>
            ))}
        </div>
    );
};
