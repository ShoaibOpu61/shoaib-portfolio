"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Use standard dynamic import for the base package to avoid potential submodule issues
const Spline = dynamic(() => import("@/lib/spline-patched/react-spline").then(mod => (mod.default || mod) as any), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black/10 flex items-center justify-center"><span className="text-white/20 text-xs tracking-widest uppercase">Loading 3D Scene...</span></div>,
}) as any;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-[100svh] overflow-hidden px-6 md:px-12 pt-28 pb-14 bg-background"
        >
            {/* Spline background */}
            {/* pointer-events-none on mobile ensures scroll works. pointer-events-auto on md allows interaction. */}
            <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
                {/* Wrapped in a div to ensure size */}
                <Spline scene="https://prod.spline.design/VSs6PZFVlPrPuuBf/scene.splinecode" />
            </div>

            {/* Contrast overlays (keep text readable) */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-black/20 to-transparent" />

            {/* Top-center text */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="relative z-20 mx-auto mt-2 w-fit text-center"
            >
                <div className="font-sans text-white/70 text-[18px] tracking-[0.38em] uppercase">
                    I AM SHOAIB &amp; I DESIGN
                </div>
            </motion.div>

            {/* Bottom bar: left meta • center CTA • right scroll */}
            <div className="absolute inset-x-0 bottom-[calc(2rem+8px)] z-20 px-6 md:px-12">
                <div className="grid grid-cols-3 items-center">

                    {/* Left: Meta */}
                    <div className="flex items-center">
                        <span className="text-white/35 text-sm tracking-widest uppercase">
                            UI/UX • Prototype • Product
                        </span>
                    </div>

                    {/* Center: Primary CTA */}
                    <div className="flex justify-center">
                        <a
                            href="#works"
                            className="inline-flex items-center justify-center rounded-full
                   border border-white/20 px-6 py-2
                   text-sm tracking-widest uppercase text-white
                   hover:bg-white hover:text-black
                   transition-all duration-300"
                        >
                            View Work
                        </a>
                    </div>

                    {/* Right: Scroll */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="h-[1px] w-24 bg-white/25" />
                        <span className="font-sans text-xs tracking-[0.35em] uppercase text-white/55">
                            Scroll
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
