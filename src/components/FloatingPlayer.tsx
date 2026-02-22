"use client";

import { usePlayer } from "./PlayerContext";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FloatingPlayer() {
    const { isOpen, vimeoId, closePlayer } = usePlayer();
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(playerRef.current, {
                y: 0,
                opacity: 1,
                display: "block",
                duration: 0.6,
                ease: "power3.out"
            });
        } else {
            gsap.to(playerRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    if (playerRef.current) playerRef.current.style.display = "none";
                }
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={playerRef}
            className="fixed bottom-4 md:bottom-8 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-full max-w-[800px] z-[9999] hidden"
            style={{ transform: "translateY(50px)", opacity: 0 }}
        >
            <div className="flex justify-end mb-3">
                <button
                    onClick={closePlayer}
                    className="flex items-center gap-2 text-white/70 hover:text-red-500 hover:text-white transition-colors bg-black/80 px-4 py-2 rounded-full cursor-pointer pointer-events-auto backdrop-blur-md border border-white/10 font-display text-xs uppercase tracking-[0.2em]"
                >
                    Close <X size={16} />
                </button>
            </div>
            <div className="aspect-video bg-black shadow-2xl rounded-sm overflow-hidden relative">
                {vimeoId && (
                    <iframe
                        src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`}
                        allow="autoplay; fullscreen"
                        className="absolute inset-0 w-full h-full border-none"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
}
