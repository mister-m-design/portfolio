"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference opacity-90 transition-transform duration-200 ease-out"
        />
    );
}
