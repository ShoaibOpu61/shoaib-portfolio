"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GLSLHills } from "@/components/ui/glsl-hills";

const ease = [0.16, 1, 0.3, 1] as const;

const phrases = [
    "Louder Than Words",
    "Smarter Than Trends",
    "Built For Humans",
];

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease } },
};

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Cycle phrases
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    // Parallax transforms
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
    const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative h-screen w-full overflow-hidden bg-background"
        >
            {/* Parallax Background Layer */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0"
            >
                <GLSLHills width="100%" height="100%" />
            </motion.div>

            {/* Atmospheric Glows */}
            <motion.div
                style={{ opacity: glowOpacity }}
                className="pointer-events-none"
            >
                <div className="absolute top-[10%] -left-[10%] w-[80%] h-[80%] bg-cyan-500/10 rounded-full blur-[140px] z-10" />
                <div className="absolute bottom-[10%] -right-[10%] w-[80%] h-[80%] bg-violet-500/10 rounded-full blur-[140px] z-10" />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-background via-background/60 to-transparent" />

            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 md:px-12"
            >
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center text-center w-full"
                >
                    <div className="flex flex-col items-center select-none w-full mb-12 md:mb-20 lg:mb-24">
                        {/* Using Syne (font-display) with proper weights */}
                        <span className="font-display italic text-[7vw] sm:text-4xl md:text-5xl lg:text-7xl text-white block mb-8 md:mb-14 lg:mb-16 tracking-tight leading-none opacity-90">
                            Designs That Speak
                        </span>

                        <div className="relative w-screen max-w-[100vw] h-[1.3em] flex items-center justify-center overflow-visible">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={phrases[index]}
                                    initial={{ opacity: 0, y: 50, filter: "blur(15px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -50, filter: "blur(15px)" }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="absolute font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-violet-400 drop-shadow-2xl px-6 text-[10vw] sm:text-5xl md:text-7xl lg:text-[7.5rem] whitespace-nowrap leading-none tracking-tighter"
                                >
                                    {phrases[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="max-w-[85vw] md:max-w-2xl lg:max-w-3xl mb-16 md:mb-24 px-4">
                        <p className="text-sm sm:text-base md:text-lg text-white/50 leading-[1.8] font-sans tracking-wide">
                            I’m Shoaib, a UI/UX Designer crafting modern mobile and web experiences <br className="hidden md:block" />
                            using product thinking, visual storytelling, and AI-powered creative workflows.
                        </p>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative z-30"
                    >
                        <a
                            href="#works"
                            className="group relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 py-4 md:py-6 px-10 md:px-16 text-[11px] md:text-sm font-sans font-medium tracking-[0.3em] uppercase text-white backdrop-blur-xl transition-all duration-700 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] overflow-hidden"
                        >
                            <span className="relative z-10">VIEW WORK</span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute -inset-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -z-10" />
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-30 px-6 md:px-12 pointer-events-none">
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 md:w-16 bg-white/10 hidden md:block" />
                        <span className="text-white/20 text-[9px] tracking-[0.6em] uppercase font-sans font-light">
                            UI/UX • PRODUCT DESIGN • AI
                        </span>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-3 text-center">
                        <span className="font-sans text-[8px] tracking-[0.5em] uppercase text-white/30 animate-pulse">
                            Scroll To Explore
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
