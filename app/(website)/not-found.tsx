"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="h-screen w-full bg-black flex flex-col items-center justify-center text-white overflow-hidden relative selection:bg-white selection:text-black">

            {/* Eclipse Effect Container */}
            <div className="relative flex items-center gap-4 md:gap-8 mb-8">
                <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[8rem] md:text-[12rem] font-serif leading-none"
                >
                    4
                </motion.span>

                {/* The Eclipse (The '0') */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                    className="relative w-24 h-24 md:w-40 md:h-40 rounded-full bg-black border border-white/10"
                >
                    {/* Ring Glow */}
                    <div className="absolute inset-0 rounded-full shadow-[0_0_50px_10px_rgba(255,255,255,0.3)] md:shadow-[0_0_80px_20px_rgba(255,255,255,0.4)] animate-pulse-slow" />
                    {/* Inner blocker to create rings */}
                    <div className="absolute inset-2 rounded-full bg-black z-10" />
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[8rem] md:text-[12rem] font-serif leading-none"
                >
                    4
                </motion.span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center z-20"
            >
                <h2 className="text-2xl md:text-3xl font-serif mb-2">Whoops!</h2>
                <p className="text-white/60 mb-12 max-w-md mx-auto font-sans">
                    We couldn't find the site you were looking for.
                </p>

                <Link
                    href="/"
                    className="px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                    Back to Home
                </Link>
            </motion.div>

            {/* Ambient Background Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full" />
            </div>
        </main>
    );
}
