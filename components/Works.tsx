"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

export default function Works() {
    // Only show first 4 projects on home
    const homeProjects = useMemo(() => projects.slice(0, 4), []);
    const total = homeProjects.length;

    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);
    const [active, setActive] = useState(0);
    const [bounds, setBounds] = useState({ min: 0, max: 0 });
    const [dragging, setDragging] = useState(false);

    // Compute drag bounds based on widths
    useEffect(() => {
        const calc = () => {
            const viewport = viewportRef.current;
            const track = trackRef.current;
            if (!viewport || !track) return;

            const viewportW = viewport.clientWidth;
            const trackW = track.scrollWidth;

            const max = 0;
            const min = Math.min(0, viewportW - trackW);

            setBounds({ min, max });
        };

        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);

    // Active index based on nearest card position
    useEffect(() => {
        const unsub = x.on("change", (latestX) => {
            const viewport = viewportRef.current;
            if (!viewport) return;

            const firstCard = viewport.querySelector<HTMLElement>(
                "[data-work-card='true']"
            );
            if (!firstCard) return;

            const cardW = firstCard.offsetWidth;
            const gap = window.innerWidth >= 768 ? 48 : 32; // md:gap-12 vs gap-8
            const step = cardW + gap;

            const idx = Math.round(Math.abs(latestX) / step);
            const clamped = Math.max(0, Math.min(total - 1, idx));
            setActive(clamped);
        });

        return () => unsub();
    }, [total, x]);

    const snapTo = (index: number) => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const firstCard = viewport.querySelector<HTMLElement>(
            "[data-work-card='true']"
        );
        if (!firstCard) return;

        const cardW = firstCard.offsetWidth;
        const gap = window.innerWidth >= 768 ? 48 : 32;
        const step = cardW + gap;

        const target = -index * step;
        animate(x, target, { duration: 0.9, ease });
    };

    const prev = () => snapTo(Math.max(0, active - 1));
    const next = () => snapTo(Math.min(total - 1, active + 1));

    return (
        <section
            id="works"
            className="py-24 md:py-32 border-t border-white/10 relative"
        >
            <div className="px-6 md:px-12 mb-12 flex items-end justify-between gap-6">
                <h2 className="text-4xl md:text-6xl font-display uppercase leading-tight text-white">
                    Some Live <br /> Projects
                </h2>

                <div className="flex items-center gap-4">
                    {/* Counter */}
                    <span className="font-mono text-lg md:text-xl text-white/70 tracking-widest">
                        {pad2(active + 1)}
                        <span className="text-white/30">/</span>
                        {pad2(total)}
                    </span>

                    {/* Controls (desktop only) */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={prev}
                            className="h-10 px-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition"
                        >
                            Prev
                        </button>
                        <button
                            onClick={next}
                            className="h-10 px-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Viewport */}
            <div ref={viewportRef} className="overflow-hidden">
                <motion.div
                    ref={trackRef}
                    className="flex px-6 md:px-12 gap-8 md:gap-12 pb-12 cursor-grab active:cursor-grabbing"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: bounds.min, right: bounds.max }}
                    dragElastic={0.08}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={() => {
                        // magnetic snap after drag
                        setTimeout(() => {
                            snapTo(active);
                            setDragging(false);
                        }, 50);
                    }}
                >
                    {homeProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            data-work-card="true"
                            className="flex-shrink-0 w-[85vw] md:w-[600px] group relative"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Link
                                href={`/works/${project.id}`}
                                onClick={(e) => {
                                    // prevent accidental navigation after dragging
                                    if (dragging) e.preventDefault();
                                }}
                                className="block"
                            >
                                <div
                                    className={`aspect-[4/3] w-full ${project.color} mb-6 overflow-hidden relative rounded-2xl border border-white/10`}
                                >
                                    {/* Placeholder overlay */}
                                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>

                                <div className="flex justify-between items-start border-t border-white/20 pt-4">
                                    <div>
                                        <span className="block text-xs font-sans tracking-widest text-white/60 mb-2 uppercase">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-display uppercase text-white">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* See All Card */}
                    <Link
                        href="/works"
                        className="flex-shrink-0 w-[75vw] md:w-[360px] rounded-2xl flex flex-col justify-center items-center border border-white/10 hover:bg-white/5 transition-colors group"
                    >
                        <span className="font-display text-2xl uppercase text-white/60 group-hover:text-white mb-4">
                            See All Projects
                        </span>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowUpRight className="w-6 h-6 text-white" />
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />
        </section>
    );
}
