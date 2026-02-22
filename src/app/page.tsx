"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ProjectGrid } from '@/components/ProjectGrid';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

import { usePlayer } from '@/components/PlayerContext';
import { Play } from 'lucide-react';
import { projects } from '@/data/projects';

export default function Home() {
    const heroContentRef = useRef(null);
    const { openPlayer } = usePlayer();

    useEffect(() => {
        // High-end entrance animation
        const tl = gsap.timeline();
        tl.fromTo('.hero-text-line',
            { y: 100, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
        )
            .fromTo('.hero-meta',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
                "-=0.8"
            )
            .fromTo('.hero-bg-image',
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 2, stagger: 0.05, ease: 'power2.out' },
                "-=1.5"
            );

        // Slow pan effect for the background grid
        gsap.to('.hero-bg-grid', {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        // Infinite Marquee Animations
        gsap.to('.marquee-left', {
            xPercent: -50,
            ease: 'none',
            duration: 60,
            repeat: -1
        });

        gsap.fromTo('.marquee-right',
            { xPercent: -50 },
            { xPercent: 0, ease: 'none', duration: 60, repeat: -1 }
        );

    }, []);

    return (
        <main className="min-h-screen bg-bg text-text flex flex-col selection:bg-accent selection:text-white relative">

            {/* Ambient Noise / Grain overlay for premium texture */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png)', backgroundSize: '200px' }}></div>

            {/* CINEMATIC HERO SECTION */}
            <section className="hero-section relative min-h-[100svh] w-full flex flex-col justify-end px-6 md:px-12 pt-32 pb-12 md:pb-24 overflow-hidden z-10 bg-bg">

                {/* Dynamic Duotone Thumbnail Mosaic Background */}
                <div className="absolute inset-[-30%] w-[160%] h-[160%] z-0 overflow-hidden pointer-events-none opacity-90">
                    <div className="hero-bg-grid w-full h-full flex flex-col justify-center gap-2 md:gap-4 origin-center rotate-[-8deg] scale-100 transition-all duration-1000">
                        {/* 5 rows moving in opposite directions */}
                        {[0, 1, 2, 3, 4].map((rowIdx) => (
                            <div key={`row-${rowIdx}`} className={`flex w-[200%] gap-2 md:gap-4 ${rowIdx % 2 === 0 ? 'marquee-left' : 'marquee-right'}`}>
                                {/* Repeat projects significantly to ensure seamless infinite scroll across wide viewports */}
                                {[...projects, ...projects, ...projects, ...projects, ...projects, ...projects].slice(0, 30).map((project, idx) => (
                                    <div key={`bg-${rowIdx}-${idx}`} className="hero-bg-image relative aspect-[16/9] w-[8%] md:w-[6%] lg:w-[4%] flex-shrink-0 bg-[#111] overflow-hidden rounded-sm">
                                        <img src={project.file} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* Grayish Duotone Overlay Layer (Neutral) */}
                    <div className="absolute inset-0 bg-transparent dark:bg-zinc-950/70 mix-blend-multiply transition-colors duration-500"></div>
                    <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 mix-blend-screen transition-colors duration-500"></div>
                </div>

                {/* Subtle Lighting / Gradient Background to blend text */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent opacity-100 pointer-events-none z-10 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--card),var(--bg))] opacity-40 pointer-events-none z-10 transition-colors duration-500"></div>

                <div ref={heroContentRef} className="relative z-20 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">

                    {/* Main Headline */}
                    <div className="max-w-[100vw] lg:max-w-5xl" style={{ perspective: '1000px' }}>
                        <h1 className="font-display font-black uppercase leading-none tracking-tighter text-[min(12.5vw,22vh)] lg:text-[min(9vw,26vh)] text-text flex flex-col relative left-[-0.5vw]">
                            <span className="hero-text-line overflow-hidden pb-4 pt-2 leading-[0.95] w-full">Cinematic</span>
                            <span className="hero-text-line overflow-hidden pb-4 pt-2 leading-[0.95] text-transparent bg-clip-text bg-gradient-to-br from-text via-text/80 to-text/20 w-full">Motion</span>
                            <span className="hero-text-line overflow-hidden pb-4 pt-2 leading-[0.95] w-full">Design</span>
                        </h1>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="hero-meta flex flex-col items-start lg:items-end gap-10 max-w-sm lg:text-right">
                        <p className="font-body text-base md:text-lg text-muted leading-relaxed font-light lg:text-right">
                            Art direction and motion design for film, television, and gaming. Focusing on world-building through sequential design.
                        </p>

                        <button
                            onClick={() => openPlayer('74537740')}
                            className="group flex items-center justify-center gap-4 bg-white text-black px-8 py-5 rounded-full font-display text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#eee] hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] whitespace-nowrap"
                        >
                            <span>Play Showreel</span>
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-[#ff3b3b] transition-colors">
                                <Play size={12} fill="currentColor" className="ml-0.5" />
                            </div>
                        </button>
                    </div>

                </div>
            </section>

            {/* WORK GRID */}
            <section id="work" className="pt-24 pb-32 px-6 md:px-12 bg-bg z-10 transition-colors duration-500">
                <div className="flex justify-between items-end mb-16 opacity-40 border-b border-text/20 pb-6 uppercase tracking-[0.2em] font-display text-[0.65rem] font-bold">
                    <h2 className="text-text">Selected Archives</h2>
                    <span className="text-text">Index—2026</span>
                </div>

                <ProjectGrid />
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-bg z-10 border-t border-text/5 relative transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--card)_0%,var(--bg)_100%)] opacity-50 pointer-events-none"></div>
                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-[-0.02em] mb-4 text-text">Get in touch</h2>
                        <p className="font-body text-muted font-light">Available for freelance opportunities and collaborations.</p>
                    </div>

                    <form action="https://formsubmit.co/mmurtha@gmail.com" method="POST" className="flex flex-col gap-6">
                        {/* Honeypot & Config for FormSubmit to prevent spam and captcha if possible */}
                        <input type="hidden" name="_subject" value="New message from MRM Portfolio!" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="text" name="_honey" style={{ display: 'none' }} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Name" required className="bg-card border border-text/10 p-5 text-text focus:outline-none focus:border-text/40 font-body text-sm rounded-sm transition-colors" />
                            <input type="email" name="email" placeholder="Email" required className="bg-card border border-text/10 p-5 text-text focus:outline-none focus:border-text/40 font-body text-sm rounded-sm transition-colors" />
                        </div>
                        <input type="text" name="subject" placeholder="Subject" required className="bg-card border border-text/10 p-5 text-text focus:outline-none focus:border-text/40 font-body text-sm rounded-sm transition-colors" />
                        <textarea name="message" placeholder="Message" required rows={5} className="bg-card border border-text/10 p-5 text-text focus:outline-none focus:border-text/40 font-body text-sm rounded-sm resize-none transition-colors"></textarea>

                        <button type="submit" className="bg-text text-bg font-display font-bold uppercase tracking-[0.1em] text-sm py-5 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] mt-4">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 md:px-12 py-16 lg:py-24 border-t border-text/10 flex flex-col md:flex-row justify-between items-start md:items-end bg-bg z-10 gap-12 transition-colors duration-500">
                <div className="flex flex-col gap-4">
                    <h3 className="font-display uppercase tracking-[0.3em] text-[0.65rem] text-muted font-bold mb-2">Location</h3>
                    <p className="font-display font-medium text-lg text-text opacity-80 transition-all tracking-tight">
                        Los Angeles, CA
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 font-display text-[0.65rem] tracking-[0.2em] uppercase text-muted">
                    <p className="text-text/50 mb-2 hover:text-text transition-colors cursor-pointer" onClick={() => window.location.href = 'mailto:mmurtha@gmail.com'}>mmurtha@gmail.com</p>
                    <p className="text-text/50">© 2026 Michael Rush Murtha</p>
                </div>
            </footer>
        </main>
    );
}
