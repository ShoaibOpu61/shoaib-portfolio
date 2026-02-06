"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects, caseStudies, playground } from "@/lib/data";
import Link from "next/link";

export default function WorksPage() {
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
                                <div className={`aspect-[4/3] w-full ${project.color} mb-6 overflow-hidden relative rounded-sm`}>
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                                    {/* Placeholder for real image */}
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
                                <div className={`aspect-video w-full ${study.color} mb-6 rounded-lg overflow-hidden relative`}>
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
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif uppercase text-white mb-4">The Playground</h2>
                    <p className="text-secondary max-w-xl">Breaking the rules. Experimental designs, digital art, and creative explorations.</p>
                </div>

                <div className="columns-1 md:columns-3 gap-8 space-y-8">
                    {playground.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="break-inside-avoid relative group rounded-xl overflow-hidden"
                        >
                            <div className="aspect-[3/4] md:aspect-auto w-full bg-zinc-800">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="block text-xs font-sans tracking-widest text-white/70 uppercase mb-1">{item.type}</span>
                                <h4 className="text-lg font-serif uppercase text-white">{item.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
