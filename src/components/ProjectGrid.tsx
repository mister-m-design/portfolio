"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MoveRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useProject } from "./ProjectModalContext";

export function ProjectGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 lg:gap-x-10 lg:gap-y-20">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
}

function ProjectCard({ project, index, className }: { project: any, index: number, className?: string }) {
    const { openProject } = useProject();

    const cardRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial state for the image to allow for scale-down effect
        gsap.set(imageRef.current, { scale: 1.1 });
    }, []);

    const handleMouseEnter = () => {
        gsap.to(imageRef.current, { scale: 1, duration: 1.2, ease: "power3.out" });
        gsap.to(overlayRef.current, { opacity: 0.2, duration: 0.6, ease: "power2.out" });
        gsap.to(textContainerRef.current, { y: -5, duration: 0.4, ease: "power2.out" });
        gsap.to(arrowRef.current, { x: 10, opacity: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, { scale: 1.1, duration: 1.2, ease: "power3.out" });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
        gsap.to(textContainerRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(arrowRef.current, { x: 0, opacity: 0.3, duration: 0.4, ease: "power2.out" });
    };

    return (
        <div
            ref={cardRef}
            onClick={() => openProject(project.id)}
            className={`relative flex flex-col group cursor-pointer ${className || ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={imageContainerRef}
                className="overflow-hidden aspect-[16/9] bg-card relative mb-8 shadow-2xl rounded-sm"
            >
                <img
                    ref={imageRef}
                    src={project.file}
                    alt={project.title}
                    className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black opacity-0 pointer-events-none"
                />
            </div>

            <div className="flex justify-between items-start" ref={textContainerRef}>
                <div className="flex flex-col gap-1">
                    <h3
                        ref={titleRef}
                        className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter text-text/90 group-hover:text-text transition-colors duration-300"
                    >
                        {project.title}
                    </h3>
                    <p className="text-muted text-[0.65rem] uppercase tracking-[0.2em] font-medium">
                        {project.category}
                    </p>
                </div>

                <div ref={arrowRef} className="opacity-30 mt-2">
                    <MoveRight size={24} strokeWidth={1} />
                </div>
            </div>
        </div>
    );
}
