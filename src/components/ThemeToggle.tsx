"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 hover:bg-text/10 rounded-full transition-all text-text/50 hover:text-text active:scale-95 pointer-events-auto"
            title="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}
