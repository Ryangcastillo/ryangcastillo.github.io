
import React from 'react';
import { LightBulbIcon } from './icons/LightBulbIcon';

export const ProTip: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-3 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800">
            <LightBulbIcon className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0" />
            <span className="font-semibold mr-1">ProTip!</span>
            <span>Use the URL of this page when adding it as a remote. It makes sharing your profile a breeze.</span>
        </div>
    )
}
