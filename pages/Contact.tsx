import React, { useEffect } from 'react';
import { MailIcon } from '../components/icons/MailIcon';
import { GitHubIcon } from '../components/icons/GitHubIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';

const Contact: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        I'm currently available for freelance work and open to discussing new projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                </header>

                <div className="text-center">
                    <a 
                        href="mailto:ryangcastillo@outlook.com" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        <MailIcon className="w-6 h-6 mr-3" />
                        ryangcastillo@outlook.com
                    </a>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Find me on other platforms</p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a href="https://github.com/Ryangcastillo" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors" aria-label="GitHub">
                            <GitHubIcon className="h-8 w-8" />
                        </a>
                        <a href="https://www.linkedin.com/in/castillo-ryan/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                            <LinkedInIcon className="h-8 w-8" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;