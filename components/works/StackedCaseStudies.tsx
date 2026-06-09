"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { getPreferredMediaUrl } from "@/lib/media";

type MediaField = string | {
    url?: string | null;
    thumbnailURL?: string | null;
    sizes?: {
        thumbnail?: { url?: string | null } | null;
        card?: { url?: string | null } | null;
        tablet?: { url?: string | null } | null;
    } | null;
} | null;

export type CaseStudyCardItem = {
    id: string;
    slug?: string | null;
    numericId?: number | null;
    title: string;
    description?: string | null;
    image?: MediaField;
    category?: string | null;
    year?: string | null;
};

type StackedCaseStudiesProps = {
    items: CaseStudyCardItem[];
};

const FALLBACK_IMAGE = "/images/profile-photo.jpg";

const CARD_TONES = [
    "bg-[rgba(14,18,24,0.92)]",
    "bg-[rgba(18,16,24,0.92)]",
    "bg-[rgba(18,20,22,0.92)]",
    "bg-[rgba(16,18,28,0.92)]",
];

const CARD_ACCENTS = [
    "before:from-cyan-400/12 before:to-transparent after:border-cyan-400/10",
    "before:from-violet-400/12 before:to-transparent after:border-violet-400/10",
    "before:from-white/10 before:to-transparent after:border-white/10",
    "before:from-cyan-300/8 before:to-transparent after:border-cyan-300/10",
];

function getMediaUrl(media?: MediaField) {
    return getPreferredMediaUrl(media, 'tablet') || FALLBACK_IMAGE;
}

function getCaseStudyHref(item: CaseStudyCardItem) {
    return `/works/${item.slug || item.numericId || item.id}`;
}

function getCaseStudyTags(item: CaseStudyCardItem) {
    const tags = new Set<string>();

    if (item.category) tags.add(item.category);
    if (tags.size === 0) tags.add("Case Study");

    return [...tags].slice(0, 3);
}

function StackedCaseStudyCard({
    item,
    index,
}: {
    item: CaseStudyCardItem;
    index: number;
}) {
    const cardRef = useRef<HTMLElement | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const imageYMotion = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);
    const imageScaleMotion = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.02, 1]);
    const cardScaleMotion = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.985]);
    const cardOpacityMotion = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.45, 1, 1, 0.78]);

    const imageY = prefersReducedMotion ? "0%" : imageYMotion;
    const imageScale = prefersReducedMotion ? 1 : imageScaleMotion;
    const cardScale = prefersReducedMotion ? 1 : cardScaleMotion;
    const cardOpacity = prefersReducedMotion ? 1 : cardOpacityMotion;

    return (
        <article
            ref={cardRef}
            className="md:sticky md:top-28"
            style={{ zIndex: index + 1 }}
        >
            <motion.div
                style={{
                    scale: cardScale,
                    opacity: cardOpacity,
                }}
                className={[
                    "group relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl",
                    "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r",
                    "after:pointer-events-none after:absolute after:inset-[1px] after:rounded-[calc(2rem-1px)] after:border",
                    CARD_TONES[index % CARD_TONES.length],
                    CARD_ACCENTS[index % CARD_ACCENTS.length],
                ].join(" ")}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_40%)]" />
                <div className="grid gap-10 px-6 py-6 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-center md:gap-12 md:px-8 md:py-8 lg:min-h-[470px] lg:px-10 lg:py-10">
                    <div className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                            <div className="mb-6 flex flex-wrap items-center gap-3">
                                {item.year && (
                                    <span className="type-label rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/50">
                                        {item.year}
                                    </span>
                                )}
                                {getCaseStudyTags(item).map((tag) => (
                                    <span
                                        key={`${item.id}-${tag}`}
                                        className="type-label rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/65"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="type-case-title max-w-[10ch] text-4xl uppercase leading-[0.92] text-white md:text-5xl lg:text-6xl">
                                {item.title}
                            </h3>

                            {item.description && (
                                <p className="type-body mt-5 max-w-xl text-sm leading-7 text-white/58 md:text-[15px] lg:text-base">
                                    {item.description}
                                </p>
                            )}
                        </div>

                        <Link
                            href={getCaseStudyHref(item)}
                            className="type-button mt-8 inline-flex w-fit items-center gap-3 text-xs text-white/82 transition-colors duration-300 hover:text-white"
                        >
                            <span>View Case Study</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="relative z-10">
                        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35">
                            <motion.div
                                style={{
                                    y: imageY,
                                    scale: imageScale,
                                }}
                                className="absolute inset-0"
                            >
                                <ImageWithSkeleton
                                    src={getMediaUrl(item.image)}
                                    alt={item.title}
                                    fill
                                    unoptimized={true}
                                    className="object-cover"
                                />
                            </motion.div>
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%,rgba(0,0,0,0.18))]" />
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/8" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </article>
    );
}

export default function StackedCaseStudies({ items }: StackedCaseStudiesProps) {
    if (!items.length) {
        return null;
    }

    return (
        <section className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1480px]">
                <div className="mb-14 max-w-3xl md:mb-20">
                    <h2 className="type-section uppercase text-white">
                        My Case Studies
                    </h2>
                    <p className="type-body mt-5 max-w-2xl text-sm leading-7 text-white/52 md:text-base">
                        Deep dives into my design process, research, and problem-solving methodologies.
                    </p>
                </div>

                <div className="space-y-8 md:space-y-10">
                    {items.map((item, index) => (
                        <StackedCaseStudyCard
                            key={item.id}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

