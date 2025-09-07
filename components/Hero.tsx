import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/ryan-profile.png';

interface HeroProps {
    bio: string;
}

export const Hero: React.FC<HeroProps> = ({ bio }) => {
    return (
        <section id="hero" className="pt-8 md:pt-10 pb-2 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center">
                <div className="md:col-span-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Hi, I'm Ryan!
                    </h1>
                    <p className="mt-2 text-lg md:text-xl text-slate-700 font-semibold">
                        Data Analyst - Data and AI Enthusiast
                    </p>
                    <div className="mt-4 text-slate-600 max-w-2xl text-base">
                        <p>{bio}</p>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/contact" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 text-center">
                            Get in Touch
                        </Link>
                        <Link to="/projects" className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-lg shadow-md hover:bg-slate-100 border border-slate-200 transition-all transform hover:scale-105 text-center">
                            View My Work
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center order-first md:order-last">
                    <img
                        src={profileImage}
                        alt="Ryan Castillo"
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg border-2 border-slate-100"
                    />
                </div>
            </div>
        </section>
    );
};