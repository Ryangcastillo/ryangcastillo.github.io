import React from 'react';
import { Link } from 'react-router-dom';
import { GitHubIcon } from './icons/GitHubIcon';
import { MailIcon } from './icons/MailIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

export const Footer: React.FC = () => {
    return (
        <footer id="contact-footer" className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Let's Connect</h2>
                    <p className="mt-2 text-lg text-slate-600">
                        I'm open to new opportunities and collaborations. Feel free to reach out.
                    </p>
                    <Link to="/contact" className="mt-6 inline-block text-xl font-medium text-blue-600 hover:underline">
                        ryangcastillo@outlook.com
                    </Link>
                </div>
                <div className="mt-8 flex justify-center space-x-6">
                    <a href="mailto:ryangcastillo@outlook.com" className="text-slate-500 hover:text-blue-600">
                        <span className="sr-only">Email</span>
                        <MailIcon className="h-6 w-6" />
                    </a>
                    <a href="https://github.com/Ryangcastillo" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">
                        <span className="sr-only">GitHub</span>
                        <GitHubIcon className="h-6 w-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/castillo-ryan/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">
                        <span className="sr-only">LinkedIn</span>
                        <LinkedInIcon className="h-6 w-6" />
                    </a>
                </div>
                <div className="mt-10 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Ryan Castillo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};