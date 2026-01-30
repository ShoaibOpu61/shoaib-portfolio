"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

// Change these 3 lines anytime
const headlines = ["THOUGHTFUL", "PRODUCT", "EXPERIENCES"];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
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
            className="relative min-h-[100svh] overflow-hidden px-6 md:px-12 pt-28 pb-14"
        >
            {/* subtle grain / vignette */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_10%,#fff_0,transparent_35%),radial-gradient(circle_at_80%_70%,#fff_0,transparent_40%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="relative flex min-h-[calc(100svh-7rem)] items-end">
                {/* LEFT: copy + headline (now full width) */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="w-full max-w-[1200px]"
                >
                    {/* kicker */}
                    <motion.div
                        variants={fadeUp}
                        className="font-sans text-white/70 text-[11px] md:text-xs tracking-[0.38em] uppercase mb-6 md:mb-10"
                    >
                        I am Shoaib and I design
                    </motion.div>

                    {/* headline with “echo” duplicates */}
                    <div className="flex flex-col">
                        {headlines.map((line, index) => (
                            <div key={line} className="overflow-hidden">
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        hidden: {},
                                        show: {
                                            transition: {
                                                staggerChildren: 0.06,
                                                delayChildren: 0.35 + index * 0.12,
                                            },
                                        },
                                    }}
                                    className="relative"
                                >
                                    {/* main */}
                                    <motion.h1
                                        variants={lineReveal}
                                        className="font-display uppercase tracking-[-0.04em] leading-[0.85] text-primary whitespace-nowrap
                      text-[15.5vw] md:text-[7.2vw]"
                                    >
                                        {line}
                                    </motion.h1>

                                    {/* echo 1 */}
                                    <motion.h1
                                        aria-hidden="true"
                                        variants={lineReveal}
                                        className="pointer-events-none absolute left-0 top-0 font-display uppercase tracking-[-0.04em] leading-[0.85]
                      text-primary/35 blur-[0.2px] whitespace-nowrap
                      text-[15.5vw] md:text-[7.2vw]"
                                        style={{ transform: "translateY(0px) translateX(0px)" }}
                                    >
                                        {line}
                                    </motion.h1>

                                    {/* echo 2 */}
                                    <motion.h1
                                        aria-hidden="true"
                                        variants={lineReveal}
                                        className="pointer-events-none absolute left-0 top-0 font-display uppercase tracking-[-0.04em] leading-[0.85]
                      text-primary/18 blur-[0.6px] whitespace-nowrap
                      text-[15.5vw] md:text-[7.2vw]"
                                        style={{ transform: "translateY(2px) translateX(1px)" }}
                                    >
                                        {line}
                                    </motion.h1>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* small CTA row */}
                    <motion.div variants={fadeUp} className="mt-8 md:mt-10 flex items-center gap-4">
                        <a
                            href="#works"
                            className="inline-flex items-center justify-center rounded-full border border-white/15
                px-5 py-2 text-xs tracking-widest uppercase text-white/80 hover:text-white hover:border-white/30 transition"
                        >
                            View Work
                        </a>

                        <span className="text-white/35 text-xs tracking-widest uppercase">
                            UI/UX • Motion • Product
                        </span>
                    </motion.div>
                </motion.div>

                {/* scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="absolute bottom-8 right-6 md:right-12 flex flex-col items-end gap-2"
                >
                    <div className="h-[1px] w-24 bg-white/25" />
                    <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-white/55">
                        Scroll
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
