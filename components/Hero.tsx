"use client";

import { motion } from "framer-motion";

const headlines = ["THOUGHTFUL", "PRODUCT", "EXPERIENCES"];

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const lineReveal = {
    hidden: { y: "120%" },
    show: { y: "0%", transition: { duration: 1.05, ease } },
};

export default function Hero() {
    return (
        <section
            id="home"
            className="min-h-[100svh] flex flex-col justify-between px-5 md:px-14 pt-24 pb-14 relative overflow-hidden"
        >
            {/* Spacer to balance top vs bottom like editorial portfolios */}
            <div />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-[1100px]"
            >
                <motion.p
                    variants={fadeUp}
                    className="font-sans text-white/70 text-xs md:text-sm tracking-[0.28em] uppercase mb-6 md:mb-10"
                >
                    I AM SHOAIB & I DESIGN
                </motion.p>

                <div className="flex flex-col">
                    {headlines.map((line, index) => (
                        <div key={index} className="overflow-hidden">
                            <motion.h1
                                variants={lineReveal}
                                className="font-display text-[12.5vw] md:text-[92px] leading-[0.82] tracking-[-0.03em] text-white whitespace-nowrap"
                            >
                                {line}
                            </motion.h1>
                        </div>
                    ))}
                </div>

                <motion.div variants={fadeUp} className="mt-10">
                    <a
                        href="/works"
                        className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-white/70 hover:text-white transition"
                    >
                        View More
                        <span className="inline-block h-[1px] w-10 bg-white/40" />
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1, ease }}
                className="absolute bottom-10 right-6 md:right-14 flex flex-col items-end gap-2"
            >
                <div className="h-[1px] w-24 bg-white/30" />
                <span className="font-sans text-xs tracking-widest text-white/60">
                    SCROLL
                </span>
            </motion.div>

            {/* Subtle bottom depth */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/60 to-transparent" />
        </section>
    );
}
