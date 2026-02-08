"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function GradientBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            {/* Base gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />

            {/* Animated gradient orbs - more subtle and blended */}
            {/* Purple orb - top left */}
            <motion.div
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px]"
                style={{
                    background: "radial-gradient(circle, #8B5CF6 0%, #6366F1 40%, transparent 70%)",
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Pink orb - top right */}
            <motion.div
                className="absolute -top-20 -right-20 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[130px]"
                style={{
                    background: "radial-gradient(circle, #EC4899 0%, #F472B6 40%, transparent 70%)",
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Blue orb - center */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.05] blur-[140px]"
                style={{
                    background: "radial-gradient(circle, #3B82F6 0%, #60A5FA 40%, transparent 70%)",
                }}
                animate={{
                    x: [0, 40, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />

            {/* Purple orb - bottom left */}
            <motion.div
                className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full opacity-[0.07] blur-[125px]"
                style={{
                    background: "radial-gradient(circle, #A855F7 0%, #8B5CF6 40%, transparent 70%)",
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 8,
                }}
            />

            {/* Pink/Purple orb - bottom right */}
            <motion.div
                className="absolute -bottom-20 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[135px]"
                style={{
                    background: "radial-gradient(circle, #D946EF 0%, #C026D3 40%, transparent 70%)",
                }}
                animate={{
                    x: [0, 30, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 10,
                }}
            />

            {/* Subtle noise texture overlay for depth */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
