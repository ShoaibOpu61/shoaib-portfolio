"use client";

import { motion, useMotionValue, animate, AnimatePresence, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
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
    return getPreferredMediaUrl(media) || FALLBACK_IMAGE;
}

// Function to specifically get the highest quality URL for popups
function getFullMediaUrl(media?: MediaField) {
    if (!media || typeof media !== "object") return getMediaUrl(media);
    // Explicitly prioritize the original URL over thumbnails for the popup
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

const MarqueeItem = ({ item, onClick, index }: { item: PlaygroundCard, onClick: () => void, index: number }) => {
    const yOffset = index % 2 === 0 ? "8%" : "-8%";
    
    return (
        <motion.div 
            whileHover={{ scale: 1.02, zIndex: 10 }}
            onClick={onClick}
            className="flex-shrink-0 w-[240px] md:w-[300px] aspect-[3/4] relative group rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 cursor-pointer shadow-2xl mx-4 md:mx-5"
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
                <span className="text-[9px] font-sans tracking-[0.2em] text-cyan-400 uppercase mb-1">{item.category || "Exploration"}</span>
                <h4 className="text-base font-serif uppercase text-white leading-tight">{item.title}</h4>
            </div>
        </motion.div>
    );
};

export default function WorksClient({ initialProjects, initialCaseStudies, initialPlayground }: WorksClientProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    }

    function onMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    const doubledPlayground = initialPlayground.length > 0 
        ? [...initialPlayground, ...initialPlayground, ...initialPlayground, ...initialPlayground] 
        : [];

    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            {/* Projects Header */}
            <section className="pt-32 pb-12 px-6 md:px-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-9xl font-serif uppercase leading-[0.85] mb-12 text-primary"
                >
                    My <br /> Projects
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-32">
                    {initialProjects.map((project, i) => (
                        <Link href={getWorkHref(project)} key={project.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/3] w-full bg-zinc-900 mb-6 overflow-hidden relative rounded-sm group-hover:scale-[1.02] transition-transform duration-500">
                                    <ImageWithSkeleton
                                        src={getCardImage(project)}
                                        alt={project.title}
                                        fill
                                        unoptimized={true}
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                <div className="flex justify-between items-start border-t border-white/20 pt-4">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-sans tracking-widest text-secondary uppercase">
                                                {[project.category, project.year].filter(Boolean).join(" - ")}
                                            </span>
                                            <ArrowUpRight className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-serif uppercase text-primary mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-secondary text-sm font-sans max-w-sm line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif uppercase text-white mb-4">My Case Studies</h2>
                    <p className="text-secondary max-w-xl">Deep dives into my design process, research, and problem-solving methodologies.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24">
                    {initialCaseStudies.map((study, i) => (
                        <Link href={getWorkHref(study)} key={study.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="aspect-video w-full bg-zinc-950 mb-6 rounded-lg overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                                    <ImageWithSkeleton
                                        src={getCardImage(study)}
                                        alt={study.title}
                                        fill
                                        unoptimized={true}
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <span className="text-xs font-sans tracking-widest text-secondary uppercase block mb-2">{study.category || "Case Study"}</span>
                                <h3 className="text-2xl md:text-3xl font-serif uppercase text-white group-hover:text-primary transition-colors">{study.title}</h3>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* The Playground Section */}
            <section className="py-32 px-0 overflow-hidden relative bg-black/20">
                <div className="mb-24 px-6 md:px-12 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-serif uppercase text-white mb-6">The Playground</h2>
                        <div className="h-px w-24 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto mb-6" />
                        <p className="text-secondary/80 text-lg leading-relaxed">
                            Breaking the rules. Experimental designs, digital art, <br className="hidden md:block" /> and creative explorations.
                        </p>
                    </motion.div>
                </div>

                {doubledPlayground.length > 0 && (
                    <div className="flex relative overflow-visible py-16">
                        <motion.div 
                            className="flex whitespace-nowrap"
                            animate={{ x: [0, "-33.33%"] }}
                            transition={{ 
                                duration: 25, 
                                repeat: Infinity, 
                                ease: "linear",
                                repeatType: "loop"
                            }}
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

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            </section>

            {/* Redesigned Popup Detail */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 pointer-events-none">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setSelectedId(null)} 
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl pointer-events-auto" 
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#121212] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col"
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                        >
                            {initialPlayground.filter((item) => item.id === selectedId).map((item) => (
                                <div key={item.id} className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                                    {/* Image Section - High Res */}
                                    <div className="relative w-full aspect-square md:aspect-video bg-black/40 flex items-center justify-center group/img">
                                        <img 
                                            src={getFullMediaUrl(item.image)} 
                                            alt={item.title} 
                                            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                                        
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} 
                                            className="absolute top-6 right-6 bg-black/60 hover:bg-white/10 text-white rounded-full p-3 transition-all backdrop-blur-md border border-white/10 z-30"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-8 md:p-12 bg-gradient-to-b from-zinc-900/50 to-zinc-950/50" style={{ transform: "translateZ(30px)" }}>
                                        <motion.span 
                                            initial={{ opacity: 0, x: -10 }} 
                                            animate={{ opacity: 1, x: 0 }}
                                            className="block text-[10px] font-sans tracking-[0.4em] text-cyan-400 uppercase mb-4"
                                        >
                                            {item.category || "Playground Piece"}
                                        </motion.span>
                                        
                                        <motion.h4 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-3xl md:text-5xl font-serif uppercase text-white mb-6 leading-tight tracking-tight"
                                        >
                                            {item.title}
                                        </motion.h4>

                                        {item.caption && (
                                            <motion.p 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl"
                                            >
                                                {item.caption}
                                            </motion.p>
                                        )}
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
