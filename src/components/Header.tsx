"use client";

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-50 backdrop-blur-sm bg-bg/20 border-b border-text/5 transition-all duration-300">
            {/* Logo & Name */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-4 font-display font-black text-sm md:text-base uppercase tracking-[0.2em] text-text hover:opacity-70 transition-opacity">
                    <img src="/assets/portfolio/logo_assets/ICONWHITENOBOX.png" alt="Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain logo-img transition-all" />
                    <span className="hidden md:inline-block mt-0.5 whitespace-nowrap">Michael Rush Murtha</span>
                </Link>
            </div>

            {/* Navigation and Toggles */}
            <div className="flex items-center gap-8 md:gap-12">
                <nav className="hidden sm:flex items-center gap-8">
                    <Link href="/#work" className="font-display font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-text/50 hover:text-text transition-colors relative group">
                        Work
                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-text scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Link>
                    <Link href="/#contact" className="font-display font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-text/50 hover:text-text transition-colors relative group">
                        Contact
                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-text scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Link>
                </nav>

                {/* Embedded Interface Controls */}
                <div className="flex items-center gap-2 border-l border-text/10 pl-8">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
