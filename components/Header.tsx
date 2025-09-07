
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { StarIcon } from './icons/StarIcon';
import { ForkIcon } from './icons/ForkIcon';
import { BellIcon } from './icons/BellIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div className="flex items-center space-x-2 text-xl text-slate-800 dark:text-slate-200">
        <BookOpenIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
          Ryangcastillo
        </a>
        <span>/</span>
        <a href="#" className="font-semibold">
          portfolio
        </a>
        <span className="px-2 py-0.5 text-xs font-semibold text-sky-700 bg-sky-100 dark:bg-sky-900/50 dark:text-sky-300 rounded-full border border-sky-300 dark:border-sky-700">
          Public
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <BellIcon className="w-4 h-4" />
          <span>Notifications</span>
        </button>
        <div className="flex rounded-md border border-slate-300 dark:border-slate-700">
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-800 rounded-l-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <ForkIcon className="w-4 h-4" />
                <span>Fork</span>
                <span className="px-1.5 py-0.5 text-xs font-bold bg-slate-200 dark:bg-slate-700 rounded-full">12</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-800 rounded-r-md border-l border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <StarIcon className="w-4 h-4" />
                <span>Star</span>
                 <span className="px-1.5 py-0.5 text-xs font-bold bg-slate-200 dark:bg-slate-700 rounded-full">42</span>
            </button>
        </div>
      </div>
    </header>
  );
};
