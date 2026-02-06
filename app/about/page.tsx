"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdCard from "@/components/IdCard";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            {/* Hero Section - Clean & Minimal */}
            <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-display uppercase leading-[0.85] mb-12 text-primary">
                        About Shoaib
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 max-w-xl"
                    >
                        <p className="font-sans text-xl md:text-2xl leading-relaxed text-secondary">
                            UI/UX Designer crafting digital experiences for mobile and web.
                        </p>

                        <p className="font-sans text-base leading-relaxed text-secondary/70">
                            5+ years transforming ideas into intuitive products. Based in Dhaka, working globally.
                        </p>
                    </motion.div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
                    <IdCard />
                </div>
            </section>

            {/* Stats - Big Visual Impact */}
            <section className="py-20 px-6 md:px-12 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {[
                        { number: "05+", label: "Years" },
                        { number: "40+", label: "Projects" },
                        { number: "04", label: "Companies" },
                        { number: "02", label: "Awards" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center group cursor-default"
                        >
                            <h3 className="text-6xl md:text-8xl font-display text-primary mb-3 group-hover:text-white transition-colors duration-300">
                                {stat.number}
                            </h3>
                            <p className="font-sans text-sm text-secondary/60 uppercase tracking-[0.3em]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Experience - Ultra Clean Timeline */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-display uppercase mb-20 text-primary"
                >
                    Experience
                </motion.h2>

                <div className="space-y-8 max-w-5xl mx-auto">
                    {[
                        {
                            role: "Senior UI/UX Designer",
                            company: "Kite Games Studio Ltd.",
                            year: "Feb,2024 — Now",
                            color: "primary"
                        },
                        {
                            role: "UI/UX Designer",
                            company: "Walton Digi-Tech Industries Ltd. (Corporate)",
                            year: "Dec,2022 — Jan,2024",
                            color: "primary/80"
                        },
                        {
                            role: "UI Engineer (Remote)",
                            company: "Exeqcuet, (Dubai)",
                            year: "Feb,2022 - Nov,2022",
                            color: "primary/60"
                        },
                        {
                            role: "UI/UX Designer",
                            company: "IOTA Infotech Limited",
                            year: "Aug,2018 — Jan,2022",
                            color: "primary/40"
                        },
                    ].map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline pb-6 border-b border-white/5 last:border-0 group hover:border-white/20 transition-all duration-300"
                        >
                            <div className="md:col-span-1">
                                <span className="text-5xl md:text-6xl font-display text-primary/20 group-hover:text-primary/60 transition-colors">
                                    0{i + 1}
                                </span>
                            </div>
                            <div className="md:col-span-6">
                                <h3 className="text-2xl md:text-4xl font-display uppercase text-white/90 group-hover:text-primary transition-colors mb-2">
                                    {job.role}
                                </h3>
                                <p className="font-sans text-sm md:text-base text-secondary/80 uppercase tracking-[0.2em]">
                                    {job.company}
                                </p>
                            </div>
                            <div className="md:col-span-5 md:text-right">
                                <p className="font-mono text-lg md:text-xl text-secondary/50 group-hover:text-secondary transition-colors">
                                    {job.year}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Skills - Visual Cards */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-display uppercase mb-20 text-primary"
                >
                    Expertise
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: "📱",
                            title: "Mobile Design",
                            desc: "iOS & Android"
                        },
                        {
                            icon: "💻",
                            title: "Web Design",
                            desc: "Responsive & Modern"
                        },
                        {
                            icon: "🤖",
                            title: "AI Workflow",
                            desc: "Enhanced Process"
                        }
                    ].map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="relative overflow-hidden border border-white/10 rounded-2xl p-10 hover:border-primary/50 transition-all duration-300 group cursor-pointer bg-gradient-to-br from-white/5 to-transparent"
                        >
                            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>
                            <h3 className="text-3xl font-display uppercase text-primary mb-3 group-hover:text-white transition-colors">
                                {skill.title}
                            </h3>
                            <p className="font-sans text-sm text-secondary/60 uppercase tracking-[0.2em]">
                                {skill.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>



                {/* Tools Grid */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        { name: "Figma", icon: "/logos/design/figma.png" },
                        { name: "Adobe XD", icon: "/logos/design/xd.png" },
                        { name: "Illustrator", icon: "/logos/design/illustrator.png" },
                        { name: "Photoshop", icon: "/logos/design/photoshop.png" },
                        { name: "MidJourney", icon: "/logos/ai/midjourney.png" },
                        { name: "ChatGPT", icon: "/logos/ai/chatgpt.png" }
                    ].map((tool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                            className="aspect-square rounded-xl border border-white/5 flex flex-col items-center justify-center hover:border-primary/30 hover:bg-white/5 transition-all duration-300 cursor-pointer gap-2"
                        >
                            <div className="relative w-10 h-10 md:w-12 md:h-12">
                                <Image
                                    src={tool.icon}
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="font-sans text-xs md:text-sm text-secondary/80 text-center px-2">
                                {tool.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Projects - Image Placeholders */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-display uppercase mb-20 text-primary"
                >
                    Selected Work
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            name: "Retouch",
                            type: "Mobile App",
                            gradient: "from-purple-500/20 to-pink-500/20"
                        },
                        {
                            name: "Beauty Editor",
                            type: "Mobile App",
                            gradient: "from-blue-500/20 to-cyan-500/20"
                        },
                        {
                            name: "Walton E-Com",
                            type: "Web Platform",
                            gradient: "from-orange-500/20 to-red-500/20"
                        },
                        {
                            name: "Walton Tick",
                            type: "Mobile App",
                            gradient: "from-green-500/20 to-emerald-500/20"
                        }
                    ].map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 mb-6 flex items-center justify-center group-hover:border-primary/50 transition-all duration-300`}>
                                <div className="text-center">
                                    <p className="text-6xl font-display uppercase text-white/30 group-hover:text-white/50 transition-colors">
                                        {project.name.split(' ')[0].substring(0, 2)}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-2xl font-display uppercase text-primary mb-2 group-hover:text-white transition-colors">
                                {project.name}
                            </h3>
                            <p className="font-sans text-sm text-secondary/50 uppercase tracking-[0.2em]">
                                {project.type}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Awards - Badge Style */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-display uppercase mb-20 text-primary"
                >
                    Recognition
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {[
                        {
                            emoji: "🏆",
                            title: "MVP on the Field",
                            year: "2024",
                            org: "Kite Games"
                        },
                        {
                            emoji: "⭐",
                            title: "Employee of the Year",
                            year: "2020",
                            org: "IOTA Infotech"
                        }
                    ].map((award, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 border-2 border-primary/30 rounded-2xl p-8 hover:border-primary hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                {award.emoji}
                            </div>
                            <h3 className="font-display text-2xl uppercase text-primary mb-2 group-hover:text-white transition-colors">
                                {award.title}
                            </h3>
                            <p className="font-sans text-sm text-secondary/50 uppercase tracking-[0.2em]">
                                {award.org} • {award.year}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}