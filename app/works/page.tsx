"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRef } from "react";
import Footer from "@/components/Footer";
import { projects, caseStudies, playground } from "@/lib/data";
import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function WorksPage() {
    const playgroundRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (playgroundRef.current) {
            const { current } = playgroundRef;
            const scrollAmount = direction === "left" ? -400 : 400; // 380 + 20 gap
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
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
                                            <span className="text-xs font-sans tracking-widest text-secondary uppercase">
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
            <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-[#0F0F0F]">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
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

                <div className="relative group/slider">
                    {/* Horizontal Scroll Container */}
                    <div
                        ref={playgroundRef}
                        className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-4 md:gap-6 auto-cols-[85vw] md:auto-cols-[380px] overflow-x-auto pb-8 -mx-6 md:-mx-12 px-6 md:px-12 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {playground.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="snap-center relative group rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
                            >
                                <div className="aspect-[4/3] w-full relative">
                                    <ImageWithSkeleton
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="block text-xs font-sans tracking-widest text-primary uppercase mb-2 drop-shadow-md">{item.type}</span>
                                    <h4 className="text-xl font-serif uppercase text-white drop-shadow-md leading-tight">{item.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
