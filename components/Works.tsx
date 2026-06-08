"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getPreferredMediaUrl } from "@/lib/media";

const ease = [0.16, 1, 0.3, 1] as const;

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

type MediaField = string | {
    url?: string | null;
    thumbnailURL?: string | null;
    width?: number | null;
    height?: number | null;
    sizes?: {
        thumbnail?: { url?: string | null } | null;
        card?: { url?: string | null } | null;
        tablet?: { url?: string | null } | null;
    } | null;
} | null;

export type WorkCard = {
    id: string;
    slug?: string | null;
    numericId?: number | null;
    title: string;
    category?: string | null;
    year?: string | null;
    description?: string | null;
    image?: MediaField;
    coverImage?: MediaField;
};

const FALLBACK_IMAGE = "/images/profile-photo.jpg";

function getMediaUrl(media?: MediaField) {
    return getPreferredMediaUrl(media, 'tablet') || FALLBACK_IMAGE;
}

function getCardImage(item: WorkCard) {
    if ("coverImage" in item && item.coverImage) {
        return getMediaUrl(item.coverImage);
    }
    return getMediaUrl(item.image);
}

function getWorkHref(item: WorkCard) {
    return `/works/${item.slug || item.numericId || item.id}`;
}

export default function Works({ projects = [] }: { projects?: WorkCard[] }) {
    const total = projects.length;

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
        // Recalculate after a short delay to ensure images/layout are rendered
        const timeout = setTimeout(calc, 100);
        return () => {
            window.removeEventListener("resize", calc);
            clearTimeout(timeout);
        };
    }, [projects]);

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
            const clamped = Math.max(0, Math.min(total, idx)); // total includes the "See All" card
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
        animate(x, Math.max(bounds.min, Math.min(bounds.max, target)), { duration: 0.9, ease });
    };

    const prev = () => snapTo(Math.max(0, active - 1));
    const next = () => snapTo(Math.min(total, active + 1));

    if (!projects || projects.length === 0) return null;

    return (
        <section
            id="works"
            className="relative z-10 overflow-hidden bg-transparent py-24 md:py-32"
        >
            <div className="relative z-10 px-6 md:px-12 mb-12 flex items-end justify-between gap-6">
                <h2 className="type-section uppercase leading-tight text-white">
                    Some Live <br /> Projects
                </h2>

                <div className="flex items-center gap-4">
                    {/* Counter */}
                    <span className="font-mono text-lg md:text-xl text-white/70 tracking-widest">
                        {pad2(Math.min(active + 1, total))}
                        <span className="text-white/30">/</span>
                        {pad2(total)}
                    </span>

                    {/* Controls (desktop only) */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={prev}
                            className="type-button h-11 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-xs hover:text-white hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-500"
                        >
                            Prev
                        </button>
                        <button
                            onClick={next}
                            className="type-button h-11 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-xs hover:text-white hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-500"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Viewport */}
            <div ref={viewportRef} className="relative z-10 overflow-visible">
                <motion.div
                    ref={trackRef}
                    className="flex px-6 md:px-12 pt-8 gap-8 md:gap-12 pb-16 cursor-grab active:cursor-grabbing"
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
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            data-work-card="true"
                            className="flex-shrink-0 w-[85vw] md:w-[600px] group relative h-full"
                            whileHover={{ y: -7 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Link
                                href={getWorkHref(project)}
                                onClick={(e) => {
                                    // prevent accidental navigation after dragging
                                    if (dragging) e.preventDefault();
                                }}
                                className="block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055] hover:shadow-[0_26px_90px_rgba(34,211,238,0.08)]"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-950">
                                    <ImageWithSkeleton
                                        src={getCardImage(project)}
                                        alt={project.title}
                                        fill
                                        unoptimized={true}
                                        className="object-cover opacity-88 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10 group-hover:text-cyan-100 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                </div>

                                <div className="relative z-10 flex min-h-[190px] flex-col px-2 pb-2 pt-5">
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {project.category && (
                                            <span className="type-label rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[9px] text-white/62">
                                                {project.category}
                                            </span>
                                        )}
                                        {project.year && (
                                            <span className="type-label rounded-full border border-cyan-200/15 bg-cyan-300/[0.045] px-3 py-1 text-[9px] text-cyan-100/68">
                                                {project.year}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="type-case-title mb-3 text-2xl uppercase leading-tight text-white transition-colors duration-300 group-hover:text-cyan-50 md:text-[1.7rem]">
                                        {project.title}
                                    </h3>

                                    <p className="type-body line-clamp-3 text-sm leading-6 text-white/52">
                                        {project.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* View More Card */}
                    <Link
                        href="/works"
                        className="flex-shrink-0 w-[75vw] md:w-[360px] rounded-3xl flex flex-col justify-center items-center border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-all duration-500 hover:border-cyan-300/30 hover:bg-white/[0.055] hover:shadow-[0_26px_90px_rgba(34,211,238,0.08)] group relative overflow-hidden"
                        onClick={(e) => {
                            if (dragging) e.preventDefault();
                        }}
                    >
                        <span className="type-case-title text-2xl uppercase text-white/60 group-hover:text-white mb-4 relative z-10 transition-colors duration-500">
                            View More Projects
                        </span>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10 group-hover:text-cyan-100 transition-all duration-500 relative z-10 bg-black/35">
                            <ArrowUpRight className="w-6 h-6 text-white/75 group-hover:text-cyan-100" />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
