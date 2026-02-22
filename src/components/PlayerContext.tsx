"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PlayerContextType {
    isOpen: boolean;
    vimeoId: string | null;
    openPlayer: (id: string) => void;
    closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [vimeoId, setVimeoId] = useState<string | null>(null);

    const openPlayer = (id: string) => {
        setVimeoId(id);
        setIsOpen(true);
    };

    const closePlayer = () => {
        setIsOpen(false);
        // Delay clearing the ID to allow exit animation to play smoothly
        setTimeout(() => setVimeoId(null), 500);
    };

    return (
        <PlayerContext.Provider value={{ isOpen, vimeoId, openPlayer, closePlayer }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
}
