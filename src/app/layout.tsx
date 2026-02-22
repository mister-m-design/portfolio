import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import Header from "@/components/Header";
import { PlayerProvider } from "@/components/PlayerContext";
import { ProjectProvider } from "@/components/ProjectModalContext";
import { FloatingPlayer } from "@/components/FloatingPlayer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Michael Rush Murtha | Art Director",
    description: "Portfolio of Michael Rush Murtha - Art Director and Visual Artist",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${inter.variable} antialiased bg-bg text-text selection:bg-accent selection:text-white`}
            >
                <ProjectProvider>
                    <PlayerProvider>
                        <Header />
                        <SmoothScroll>{children}</SmoothScroll>
                        <FloatingPlayer />
                    </PlayerProvider>
                </ProjectProvider>
            </body>
        </html>
    );
}
