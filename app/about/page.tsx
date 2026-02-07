"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdCard from "@/components/IdCard";
import Image from "next/image";
import { projects } from "@/lib/data";

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <motion.span
        className="inline-block font-medium text-primary cursor-pointer relative"
        whileHover={{ scale: 1.05, color: "#fff" }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        {children}
        <motion.span
            className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"
            initial={{ scaleX: 1 }}
            whileHover={{ scaleX: 0 }}
            transition={{ duration: 0.2 }}
        />
    </motion.span>
);

const BioCard = ({ title, icon, children, delay }: { title: string, icon: string, children: React.ReactNode, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 hover:bg-white/10 transition-colors duration-300"
    >
        <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{icon}</span>
            <h3 className="font-display text-lg uppercase text-white/90">{title}</h3>
        </div>
        <div className="font-sans text-sm md:text-base leading-relaxed text-secondary/80">
            {children}
        </div>
    </motion.div>
);

export default function AboutPage() {
    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen overflow-hidden">
            <Navbar />

            {/* Hero Section - Redesigned */}
            <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex items-center relative z-10">
                {/* Background Glow */}
                <div className="absolute top-1/2 right-[-100px] -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-start">
                    <div className="relative z-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-display uppercase leading-[0.85] mb-12"
                        >
                            <span className="text-white">About </span>
                            <span className="text-primary">Shoaib</span>
                        </motion.h1>

                        <div className="space-y-4">
                            <BioCard icon="🎨" title="Who I Am" delay={0.2}>
                                UI/UX Designer based in Dhaka with 5+ years of experience. I specialize in taking ideas from sketch to dev handoff, ensuring every design is <Highlight>user-centered</Highlight> and functionally precise.
                            </BioCard>

                            <BioCard icon="⚡" title="My Stack" delay={0.3}>
                                I stay ahead with AI tools like <Highlight>MidJourney</Highlight>, <Highlight>ChatGPT</Highlight>, and <Highlight>Figma AI</Highlight>. Passionate about <Highlight>micro animations</Highlight> that give users that wow factor.
                            </BioCard>

                            <BioCard icon="💡" title="My Vision" delay={0.4}>
                                I believe in blending innovation with user-centric design to deliver results that not only look great but also solve <Highlight>real-world problems</Highlight> effectively.
                            </BioCard>
                        </div>
                    </div>

                    <div className="w-full h-full flex justify-center items-center relative perspective-container md:pt-40">
                        <IdCard />
                    </div>
                </div>
            </section>

            {/* Stats - Big Visual Impact */}
            <section className="py-20 px-6 md:px-12 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {[
                        { number: "05+", label: "Years" },
                        { number: "100+", label: "Projects" },
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
                            <h3 className="text-6xl md:text-8xl font-serif text-primary mb-3 group-hover:text-white transition-colors duration-300">
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
                    className="text-4xl md:text-6xl font-serif uppercase mb-20 text-primary"
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
                                <span className="text-5xl md:text-6xl font-serif text-primary/20 group-hover:text-primary/60 transition-colors">
                                    0{i + 1}
                                </span>
                            </div>
                            <div className="md:col-span-6">
                                <h3 className="text-2xl md:text-4xl font-serif uppercase text-white/90 group-hover:text-primary transition-colors mb-2">
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
                    className="text-4xl md:text-6xl font-serif uppercase mb-20 text-primary"
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
                            <h3 className="text-3xl font-serif uppercase text-primary mb-3 group-hover:text-white transition-colors">
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
                    className="text-4xl md:text-6xl font-serif uppercase mb-20 text-primary"
                >
                    Selected Work
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Using real data from lib/data.ts */}
                    {projects.slice(0, 4).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer block"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-6 border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                            </div>
                            <h3 className="text-2xl font-serif uppercase text-primary mb-2 group-hover:text-white transition-colors">
                                {project.title}
                            </h3>
                            <p className="font-sans text-sm text-secondary/50 uppercase tracking-[0.2em]">
                                {project.category}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Recognition - Split Layout */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif uppercase mb-20 text-primary"
                >
                    Recognition
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Achievements */}
                    <div className="space-y-6">
                        {[
                            {
                                emoji: "🏆",
                                title: "MVP on the Field",
                                year: "2024",
                                org: "Kite Games Studio Ltd."
                            },
                            {
                                emoji: "⭐",
                                title: "Employee of the Year",
                                year: "2020",
                                org: "IOTA Infotech Limited"
                            }
                        ].map((award, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 10 }}
                                className="border-2 border-primary/30 rounded-2xl p-8 hover:border-primary hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="text-5xl group-hover:scale-110 transition-transform">
                                        {award.emoji}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-2xl uppercase text-primary mb-2 group-hover:text-white transition-colors">
                                            {award.title}
                                        </h3>
                                        <p className="font-sans text-sm text-secondary/50 uppercase tracking-[0.2em]">
                                            {award.org} • {award.year}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side - Award Images with Creative Display */}
                    <div className="relative h-[500px] lg:h-[600px]">
                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
                        </div>

                        {/* MVP Award - Top Right, Rotated */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            className="absolute top-0 right-0 lg:right-10 w-[280px] md:w-[320px] group cursor-pointer"
                        >
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl group-hover:bg-primary/30 transition-all duration-300"></div>

                                {/* Image Container */}
                                <div className="relative border-4 border-primary/40 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm p-6 group-hover:border-primary/60 transition-all duration-300">
                                    <Image
                                        src="/images/recognition/mvp.png"
                                        alt="MVP on the Field Award"
                                        width={300}
                                        height={400}
                                        className="w-full h-auto object-contain"
                                    />

                                    {/* Decorative Corner Accent */}
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary/60 rounded-tr-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary/60 rounded-bl-2xl"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Employee of the Year Award - Bottom Left, Rotated */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, rotate: 3 }}
                            className="absolute bottom-0 left-0 lg:left-10 w-[280px] md:w-[320px] group cursor-pointer"
                        >
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl group-hover:bg-primary/30 transition-all duration-300"></div>

                                {/* Image Container */}
                                <div className="relative border-4 border-primary/40 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm p-6 group-hover:border-primary/60 transition-all duration-300">
                                    <Image
                                        src="/images/recognition/employee-of-year.png"
                                        alt="Employee of the Year Award"
                                        width={300}
                                        height={400}
                                        className="w-full h-auto object-contain"
                                    />

                                    {/* Decorative Corner Accent */}
                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary/60 rounded-tl-2xl"></div>
                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary/60 rounded-br-2xl"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M 50 100 Q 200 150 350 100"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                                viewport={{ once: true }}
                            />
                            <motion.path
                                d="M 100 400 Q 250 350 400 400"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                                viewport={{ once: true }}
                            />
                        </svg>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}