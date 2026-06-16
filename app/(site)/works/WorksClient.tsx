"use client";

import { motion, useMotionValue, AnimatePresence, useTransform, useSpring, useReducedMotion, useAnimationFrame } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { getPreferredMediaUrl } from "@/lib/media";
import StackedCaseStudies from "@/components/works/StackedCaseStudies";

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

type WorkCard = {
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

type PlaygroundCard = {
    id: string;
    title: string;
    slug?: string | null;
    category?: string | null;
    caption?: string | null;
    image?: MediaField;
};

interface WorksClientProps {
    initialProjects: WorkCard[];
    initialCaseStudies: WorkCard[];
    initialPlayground: PlaygroundCard[];
}

const FALLBACK_IMAGE = "/images/profile-photo.jpg";

function getMediaUrl(media?: MediaField) {
    return getPreferredMediaUrl(media, 'tablet') || FALLBACK_IMAGE;
}

function getFullMediaUrl(media?: MediaField) {
    if (!media || typeof media !== "object") return getMediaUrl(media);
    return media.url || getMediaUrl(media);
}

function getCardImage(item: WorkCard | PlaygroundCard) {
    if ("coverImage" in item && item.coverImage) {
        return getMediaUrl(item.coverImage);
    }
    return getMediaUrl(item.image);
}

function getWorkHref(item: WorkCard) {
    return `/works/${item.slug || item.numericId || item.id}`;
}

const TOOL_CLOUD = [
    { name: "Mobbin", initials: "Mb", className: "left-[14%] top-[20%] scale-75 opacity-32 hidden md:flex", drift: -4 },
    { name: "ChatGPT", icon: "/logos/ai/chatgpt.png", className: "left-[24%] top-[10%] scale-90 opacity-68 hidden sm:flex", imageClass: "h-9 w-9 md:h-10 md:w-10", drift: 5 },
    { name: "Photoshop", icon: "/logos/design/photoshop.png", className: "left-[37%] top-[17%] scale-75 opacity-44 hidden lg:flex", imageClass: "h-8 w-8 md:h-9 md:w-9", drift: -4 },
    { name: "Claude", icon: "/logos/ai/claude-icon.png", className: "right-[36%] top-[13%] scale-80 opacity-52 hidden md:flex", imageClass: "h-8 w-8 md:h-9 md:w-9", drift: 4 },
    { name: "Freepik AI", icon: "/logos/ai/freepik.png", className: "right-[22%] top-[21%] scale-75 opacity-36 hidden lg:flex", imageClass: "h-8 w-8 md:h-9 md:w-9", drift: -5 },
    { name: "Framer", icon: "/logos/design/framer.png", className: "left-[18%] top-[46%] scale-92 opacity-72 hidden sm:flex", imageClass: "h-9 w-9 md:h-10 md:w-10", drift: 4 },
    { name: "Google Stitch", icon: "/logos/ai/google-stitch.png", className: "left-[31%] top-[40%] scale-90 opacity-72 hidden md:flex", imageClass: "h-9 w-9 md:h-10 md:w-10", drift: -4 },
    { name: "Figma", icon: "/logos/design/figma.png", className: "left-[47%] top-[34%] scale-105 opacity-100", imageClass: "h-10 w-10 md:h-11 md:w-11", drift: 5 },
    { name: "Midjourney", icon: "/logos/ai/midjourney.png", className: "right-[31%] top-[42%] scale-92 opacity-72 hidden sm:flex", imageClass: "h-9 w-9 md:h-10 md:w-10", drift: -4 },
    { name: "Illustrator", icon: "/logos/design/illustrator.png", className: "right-[17%] top-[47%] scale-80 opacity-54 hidden md:flex", imageClass: "h-8 w-8 md:h-9 md:w-9", drift: 4 },
    { name: "Google Antigravity", icon: "/logos/ai/google-antigravity.png", className: "left-[29%] bottom-[17%] scale-78 opacity-44 hidden lg:flex", imageClass: "h-8 w-8 md:h-9 md:w-9", drift: -4 },
    { name: "FigJam", initials: "FJ", className: "right-[27%] bottom-[17%] scale-78 opacity-40 hidden lg:flex", drift: 4 },
    { name: "Notion", initials: "N", className: "right-[42%] bottom-[9%] scale-70 opacity-30 hidden md:flex", drift: -3 },
];

const MarqueeItem = ({ item, onClick, index }: { item: PlaygroundCard, onClick: () => void, index: number }) => {
    const yOffset = index % 2 === 0 ? "8%" : "-8%";
    
    return (
        <motion.div 
            whileHover={{ scale: 1.02, zIndex: 10 }}
            onClick={onClick}
            className="flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/5] relative group rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 cursor-pointer shadow-2xl mx-4 md:mx-5"
            style={{ y: yOffset }}
        >
            <ImageWithSkeleton 
                src={getCardImage(item)} 
                alt={item.title} 
                fill 
                unoptimized={true} 
                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="type-label text-[9px] text-cyan-400 mb-1">{item.category || "Exploration"}</span>
                <h4 className="type-case-title text-base uppercase text-white leading-tight line-clamp-1">{item.title}</h4>
            </div>
        </motion.div>
    );
};

export default function WorksClient({ initialProjects, initialCaseStudies, initialPlayground }: WorksClientProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const heroMouseX = useMotionValue(0);
    const heroMouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
    const cloudX = useSpring(useTransform(heroMouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 90, damping: 28 });
    const cloudY = useSpring(useTransform(heroMouseY, [-0.5, 0.5], [-6, 6]), { stiffness: 90, damping: 28 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    }

    function onMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    function onHeroMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        if (prefersReducedMotion) return;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        heroMouseX.set((clientX - left) / width - 0.5);
        heroMouseY.set((clientY - top) / height - 0.5);
    }

    function onHeroMouseLeave() {
        heroMouseX.set(0);
        heroMouseY.set(0);
    }

    const doubledPlayground = initialPlayground.length > 0 
        ? [...initialPlayground, ...initialPlayground, ...initialPlayground, ...initialPlayground] 
        : [];

    const marqueeX = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [marqueeWidth, setMarqueeWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (marqueeRef.current) {
                setMarqueeWidth(marqueeRef.current.scrollWidth);
            }
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        const timeout = setTimeout(updateWidth, 100);
        
        return () => {
            window.removeEventListener('resize', updateWidth);
            clearTimeout(timeout);
        };
    }, [doubledPlayground]);

    useAnimationFrame((t, delta) => {
        if (marqueeWidth === 0 || initialPlayground.length === 0) return;
        
        const setWidth = marqueeWidth / 4;
        let currentX = marqueeX.get();

        if (!isHovered && !isDragging) {
            currentX -= 1 * (delta / 16); 
        }

        if (currentX <= -setWidth) {
            currentX += setWidth;
        } else if (currentX > 0) {
            currentX -= setWidth;
        }
        
        marqueeX.set(currentX);
    });

    return (
        <main className="bg-[#050505] text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            {/* Decorative hero. Work data below remains CMS-driven. */}
            <section
                className="relative overflow-hidden px-6 pb-14 pt-28 md:px-12 md:pb-16 md:pt-32"
                onMouseMove={onHeroMouseMove}
                onMouseLeave={onHeroMouseLeave}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(34,211,238,0.13),transparent_36%),radial-gradient(circle_at_56%_27%,rgba(139,92,246,0.12),transparent_40%),linear-gradient(180deg,transparent_0%,#050505_92%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.025] to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0,transparent_34%,rgba(0,0,0,0.42)_88%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(255,255,255,0.075)_0_1px,transparent_1.5px),radial-gradient(circle_at_78%_54%,rgba(34,211,238,0.095)_0_1px,transparent_1.5px)] bg-[size:74px_74px] opacity-[0.16]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />

                <div className="relative mx-auto max-w-[1480px]">
                    <motion.div
                        style={{ x: cloudX, y: cloudY }}
                        className="pointer-events-none relative mx-auto mb-4 h-[250px] max-w-6xl overflow-visible md:mb-3 md:h-[330px]"
                    >
                        <div className="pointer-events-none absolute left-1/2 top-[42%] h-52 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.07] blur-3xl" />
                        <div className="pointer-events-none absolute left-1/2 top-[46%] h-44 w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/[0.065] blur-3xl" />

                        {TOOL_CLOUD.map((tool, i) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    y: prefersReducedMotion ? 0 : [0, tool.drift, 0],
                                    rotate: prefersReducedMotion ? 0 : [0, i % 2 === 0 ? 1.4 : -1.4, 0],
                                }}
                                transition={{
                                    opacity: { duration: 0.55, delay: 0.08 + i * 0.035 },
                                    scale: { duration: 0.55, delay: 0.08 + i * 0.035 },
                                    y: { duration: 5.4 + i * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 },
                                    rotate: { duration: 6.2 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 },
                                }}
                                className={[
                                    "absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.052] text-sm font-medium text-white/75 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl ring-1 ring-white/[0.025] md:h-16 md:w-16",
                                    tool.className,
                                ].join(" ")}
                                title={tool.name}
                            >
                                {tool.icon ? (
                                    <Image
                                        src={tool.icon}
                                        alt={`${tool.name} logo`}
                                        width={48}
                                        height={48}
                                        quality={100}
                                        className={["object-contain [image-rendering:auto]", tool.imageClass || "h-8 w-8 md:h-9 md:w-9"].join(" ")}
                                    />
                                ) : (
                                    <span className="type-label text-[11px] tracking-[0.18em] text-cyan-50/75">
                                        {tool.initials}
                                    </span>
                                )}
                            </motion.div>
                        ))}

                    </motion.div>

                    <div className="mx-auto max-w-4xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="type-hero text-6xl uppercase leading-[0.85] text-primary md:text-9xl"
                        >
                            Projects
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.12 }}
                            className="type-body mx-auto mt-7 max-w-2xl text-base leading-8 text-white/58 md:text-lg"
                        >
                            A curated collection of product design, UI/UX, and AI-assisted explorations from shipped apps to experimental interfaces.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-12 md:px-12">
                <div className="mx-auto max-w-[1480px]">

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mb-28">
                    {initialProjects.map((project, i) => (
                        <Link href={getWorkHref(project)} key={project.id} className="group block">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -7 }}
                                className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-300/30 group-hover:bg-white/[0.055] group-hover:shadow-[0_26px_90px_rgba(34,211,238,0.08)]"
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
                            </motion.div>
                        </Link>
                    ))}
                </div>
                </div>
            </section>

            <StackedCaseStudies items={initialCaseStudies} />

            {/* The Playground Section */}
            <section className="py-32 px-0 overflow-hidden relative">
                <div className="mb-24 px-6 md:px-12 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="type-section uppercase text-white mb-6">The Playground</h2>
                        <div className="h-px w-24 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto mb-6" />
                        <p className="text-secondary/80 text-lg leading-relaxed">
                            Breaking the rules. Experimental designs, digital art, <br className="hidden md:block" /> and creative explorations.
                        </p>
                    </motion.div>
                </div>

                {doubledPlayground.length > 0 && (
                    <div className="flex relative overflow-visible py-16">
                        <motion.div 
                            ref={marqueeRef}
                            className="flex whitespace-nowrap cursor-grab active:cursor-grabbing w-max"
                            style={{ x: marqueeX }}
                            drag="x"
                            dragConstraints={{ left: -10000, right: 10000 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                        >
                            {doubledPlayground.map((item, i) => (
                                <MarqueeItem 
                                    key={`${item.id}-${i}`} 
                                    item={item} 
                                    index={i}
                                    onClick={() => setSelectedId(item.id)} 
                                />
                            ))}
                        </motion.div>
                    </div>
                )}
            </section>

            {/* Redesigned Popup Detail - FIXED SINGLE CARD LOOK (NO SCROLL) */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 pointer-events-none">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setSelectedId(null)} 
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl pointer-events-auto" 
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative z-10 w-full max-w-4xl bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl pointer-events-auto flex flex-col items-stretch"
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                        >
                            {initialPlayground.filter((item) => item.id === selectedId).map((item) => (
                                <div key={item.id} className="flex flex-col">
                                    {/* Image Section - Fixed or constrained height to prevent scroll */}
                                    <div className="relative w-full h-[50vh] md:h-[60vh] bg-black/40 flex items-center justify-center p-6 sm:p-10">
                                        <ImageWithSkeleton
                                            src={getFullMediaUrl(item.image)}
                                            alt={item.title}
                                            fill
                                            unoptimized={true}
                                            className="object-contain p-6 sm:p-10 shadow-2xl rounded-[1.5rem]"
                                        />
                                        
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} 
                                            className="absolute top-8 right-8 bg-black/40 hover:bg-white text-white hover:text-black rounded-full p-2 transition-all backdrop-blur-xl border border-white/10 z-30"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Details Section - No Scroll basis */}
                                    <div className="p-8 md:p-12 md:pb-16 bg-[#0A0A0A] border-t border-white/5" style={{ transform: "translateZ(40px)" }}>
                                        <div className="max-w-3xl">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-px w-6 bg-cyan-500" />
                                                <span className="type-label text-[10px] text-cyan-400">
                                                    {item.category || "Exploration"}
                                                </span>
                                            </div>
                                            
                                            <h4 className="type-case-title text-3xl md:text-5xl leading-tight text-white mb-6">
                                                {item.title}
                                            </h4>

                                            {item.caption && (
                                                <p className="type-body text-base md:text-lg text-white/40 leading-relaxed line-clamp-3">
                                                    {item.caption}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}

