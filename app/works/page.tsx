"use client";

import { motion, useMotionValue, animate, AnimatePresence, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { projects, caseStudies, playground } from "@/lib/data";
import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function WorksPage() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraint, setConstraint] = useState(0);
    const x = useMotionValue(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // 3D Tilt Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    }

    function onMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    useEffect(() => {
        const calculateConstraint = () => {
            if (sliderRef.current && containerRef.current) {
                const sliderWidth = sliderRef.current.scrollWidth;
                const containerWidth = containerRef.current.offsetWidth;
                // Add some extra padding to the constraint so we can drag slightly past the last item
                setConstraint(sliderWidth - containerWidth + 48);
            }
        };

        calculateConstraint();
        window.addEventListener("resize", calculateConstraint);
        return () => window.removeEventListener("resize", calculateConstraint);
    }, []);

    const scroll = (direction: "left" | "right") => {
        const currentX = x.get();
        // Scroll amount: one item width approx 380 + gap 24 = 404
        const moveAmount = direction === "left" ? 400 : -400;
        let newX = currentX + moveAmount;

        // Clamp
        if (newX > 0) newX = 0;
        if (newX < -constraint) newX = -constraint;

        animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
    };

    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            {/* 1. MY PROJECTS */}
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
                    {projects.map((project, i) => (
                        <Link href={`/works/${project.id}`} key={project.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group cursor-pointer"
                            >
                                <div className={`aspect-[4/3] w-full ${project.color} mb-6 overflow-hidden relative rounded-sm group-hover:scale-[1.02] transition-transform duration-500`}>
                                    <ImageWithSkeleton
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                <div className="flex justify-between items-start border-t border-white/20 pt-4">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-sans tracking-widest text-secondary uppercase">
                                                {project.category} — {project.year}
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

            {/* 2. CASE STUDIES */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif uppercase text-white mb-4">My Case Studies</h2>
                    <p className="text-secondary max-w-xl">Deep dives into my design process, research, and problem-solving methodologies.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24">
                    {caseStudies.map((study, i) => (
                        <Link href={`/works/${study.id}`} key={study.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className={`aspect-video w-full ${study.color} mb-6 rounded-lg overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500`}>
                                    <ImageWithSkeleton
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <span className="text-xs font-sans tracking-widest text-secondary uppercase block mb-2">{study.category}</span>
                                <h3 className="text-2xl md:text-3xl font-serif uppercase text-white group-hover:text-primary transition-colors">{study.title}</h3>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. PLAYGROUND */}
            <section className="py-24 px-0 md:px-0 border-t border-white/10 bg-[#0F0F0F] overflow-hidden">
                <div className="mb-16 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif uppercase text-white mb-4">The Playground</h2>
                        <p className="text-secondary max-w-xl">Breaking the rules. Experimental designs, digital art, and creative explorations.</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="relative group/slider" ref={containerRef}>
                    {/* Draggable Scroll Container */}
                    <motion.div
                        ref={sliderRef}
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ right: 0, left: -constraint }}
                        whileTap={{ cursor: "grabbing" }}
                        className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-4 md:gap-6 auto-cols-[85vw] md:auto-cols-[380px] px-6 md:px-12 cursor-grab active:cursor-grabbing w-max"
                    >
                        {playground.map((item, i) => (
                            <motion.div
                                layoutId={`card-${item.id}`}
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="snap-center relative group rounded-xl overflow-hidden border border-white/10 bg-zinc-900 draggable-item cursor-pointer"
                            >
                                <div className="aspect-[4/3] w-full relative pointer-events-none">
                                    <ImageWithSkeleton
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                                    <span className="block text-sm font-sans tracking-widest text-primary uppercase mb-2 drop-shadow-md">{item.type}</span>
                                    <h4 className="text-xl font-serif uppercase text-white drop-shadow-md leading-tight">{item.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

                {/* Interactive Modal */}
                <AnimatePresence>
                    {selectedId && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto cursor-pointer"
                            />

                            {/* 3D Tilt Card */}
                            <div className="relative z-10 perspective-1000 w-full max-w-5xl pointer-events-auto">
                                {playground.filter(item => item.id === selectedId).map(item => (
                                    <motion.div
                                        layoutId={`card-${item.id}`}
                                        key={item.id}
                                        className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                                        style={{
                                            rotateX,
                                            rotateY,
                                            transformStyle: "preserve-3d",
                                        }}
                                        onMouseMove={onMouseMove}
                                        onMouseLeave={onMouseLeave}
                                        drag
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        dragElastic={0.2}
                                    >
                                        <div className="w-full h-auto relative pointer-events-none">
                                            {/* Using standard img to respect natural aspect ratio */}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-auto block object-contain max-h-[80vh]"
                                            />
                                        </div>

                                        <div className="absolute top-4 right-4 z-20">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                className="bg-black/50 hover:bg-white/20 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>

                                        <div
                                            className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent transform translate-z-20"
                                            style={{ transform: "translateZ(40px)" }}
                                        >
                                            <span className="block text-sm font-sans tracking-widest text-primary uppercase mb-2 drop-shadow-md">{item.type}</span>
                                            <h4 className="text-3xl md:text-5xl font-serif uppercase text-white drop-shadow-md leading-tight">{item.title}</h4>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </section>

            <Footer />
        </main>
    );
}
