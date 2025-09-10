import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '/about', label: 'About' },
        { to: '/projects', label: 'Projects' },
        { to: '/contact', label: 'Contact' },
    ];
    
    const navLinkClasses = "text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors";
    const activeNavLinkClasses = "text-blue-600";

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 shadow-sm backdrop-blur-lg' : 'bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-lg font-bold text-slate-900 transition-colors hover:text-blue-600">
                        Ryan Castillo
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.to} 
                                to={link.to} 
                                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};
