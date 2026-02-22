"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);

    useEffect(() => {
        // Entrance animation
        const tl = gsap.timeline();

        tl.fromTo('.modal-backdrop',
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        ).fromTo('.modal-content',
            { opacity: 0, scale: 0.98, y: 10 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.2"
        );

        // Escape to close
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (lightboxImg) setLightboxImg(null);
                else closeWithAnimation();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxImg]);

    const closeWithAnimation = () => {
        const tl = gsap.timeline({ onComplete: onClose });
        tl.to('.modal-content', { opacity: 0, scale: 0.98, y: 10, duration: 0.3, ease: "power2.in" })
            .to('.modal-backdrop', { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.1");
    };

    const vimeoIds = Array.isArray(project.vimeo) ? project.vimeo : [project.vimeo];

    return (
        <div className="fixed inset-0 z-[2000] flex flex-col items-center overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-bg p-[4rem] opacity-98 transition-colors duration-500 modal-backdrop"
                onClick={closeWithAnimation}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1400px] min-h-screen py-24 px-8 md:px-16 flex flex-col items-center modal-content">

                {/* Close Button */}
                <button
                    onClick={closeWithAnimation}
                    className="absolute top-12 right-8 md:right-16 text-text hover:text-accent transition-colors z-50 p-2"
                >
                    <X size={32} strokeWidth={1.5} />
                </button>

                {/* Videos */}
                <div className="w-full flex flex-col gap-8 mb-24">
                    {vimeoIds.map((vid: string, idx: number) => (
                        <div key={idx} className="w-full aspect-video bg-card shadow-2xl relative overflow-hidden rounded-sm border border-text/5">
                            <iframe
                                src={`https://player.vimeo.com/video/${vid}?autoplay=${idx === 0 ? 1 : 0}&title=0&byline=0&portrait=0&color=ffffff`}
                                allow="autoplay; fullscreen"
                                className="absolute inset-0 w-full h-full border-none"
                                allowFullScreen
                            />
                        </div>
                    ))}
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-32 w-full">
                    <div className="md:col-span-6 flex flex-col justify-start">
                        <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tighter mb-10 leading-[0.9] text-text">
                            {project.title}
                        </h1>
                        <div className="flex flex-col gap-4 text-muted text-[0.65rem] uppercase tracking-[0.2em] font-medium border-t border-text/10 pt-8">
                            <p><span className="opacity-40 mr-4">Role</span> <span className="text-text/80">{project.role}</span></p>
                            <p><span className="opacity-40 mr-4">Client</span> <span className="text-text/80">{project.studio}</span></p>
                            <p><span className="opacity-40 mr-4">Year</span> <span className="text-text/80">{project.year}</span></p>
                            <p className="flex flex-wrap items-start"><span className="opacity-40 mr-4">Tasks</span> <span className="text-text/90 normal-case tracking-normal text-sm font-body max-w-xs">{project.deliverables}</span></p>
                        </div>
                    </div>
                    <div className="md:col-span-6 pt-4 md:pt-4">
                        <p className="font-body text-base lg:text-lg text-text/80 leading-relaxed font-light">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Style Frames */}
                {project.frames && project.frames.length > 0 && (
                    <div className="pb-32 w-full">
                        <h2 className="font-display font-bold tracking-[0.3em] uppercase text-[0.65rem] mb-10 opacity-40 border-b border-text/10 pb-4 text-text">
                            Style Frames
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {project.frames.map((frame: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={frame.startsWith('/') ? frame : '/' + frame}
                                    alt={`${project.title} frame ${idx + 1}`}
                                    className="w-full h-auto rounded-sm cursor-zoom-in hover:scale-[1.02] transition-transform"
                                    onClick={() => setLightboxImg(frame.startsWith('/') ? frame : '/' + frame)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Overlay (highest z-index) */}
            {lightboxImg && (
                <div
                    className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center cursor-zoom-out p-4"
                    onClick={() => setLightboxImg(null)}
                >
                    <button className="absolute top-8 right-8 text-white hover:text-white/70 transition-colors z-50">
                        <X size={40} strokeWidth={1} />
                    </button>
                    <img src={lightboxImg} className="max-w-full max-h-[90vh] object-contain relative z-40" alt="Expanded frame" />
                </div>
            )}
        </div>
    );
}
