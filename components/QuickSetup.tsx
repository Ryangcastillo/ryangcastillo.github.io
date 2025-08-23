
import React from 'react';
import { StarIcon } from './icons/StarIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface QuickSetupProps {
    bio: string;
    loading: boolean;
}

export const QuickSetup: React.FC<QuickSetupProps> = ({ bio, loading }) => {
  return (
    <section>
        <div className="flex items-center mb-4">
            <img src={require('../assets/ryan-profile.png')} alt="Ryan Castillo" className="w-12 h-12 rounded-full mr-4 border-2 border-slate-200 dark:border-slate-700 object-cover" />
            <div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hello, I'm Ryan Castillo</h2>
                 <p className="text-slate-500 dark:text-slate-400">Data-driven insights for business excellence.</p>
            </div>
        </div>
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Start with an introduction</h3>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            {loading ? (
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Generating creative bio...</span>
                </div>
            ) : (
                <p>{bio}</p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center"><StarIcon className="w-5 h-5 mr-2 text-yellow-500"/>Add collaborators</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">I'm open to collaboration on exciting data-driven projects.</p>
                <button className="mt-3 w-full text-sm font-medium px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                    Invite to Collaborate
                </button>
            </div>
             <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center"><ArrowRightIcon className="w-5 h-5 mr-2 text-green-500"/>Get in touch</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Have a project in mind or just want to connect?</p>
                <a href="mailto:ryangcastillo@outlook.com" className="mt-3 block w-full text-center text-sm font-medium px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors">
                    Contact Me
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};
