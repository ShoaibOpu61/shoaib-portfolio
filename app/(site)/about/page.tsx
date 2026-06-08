"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdCard from "@/components/IdCard";
import Image from "next/image";
import { projects } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

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
            <h3 className="font-sans text-lg uppercase text-white/90">{title}</h3>
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
                            className="text-6xl md:text-8xl font-sans uppercase leading-[0.85] mb-12"
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
                            <h3 className="text-6xl md:text-8xl font-sans text-primary mb-3 group-hover:text-white transition-colors duration-300">
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
                    className="text-4xl md:text-6xl font-sans uppercase mb-20 text-primary"
                >
                    Experience
                </motion.h2>

                <div className="space-y-8 max-w-5xl mx-auto">
                    {[
                        {
                            role: "Product Designer (UI/UX)",
                            company: "Kite Games Studio Ltd.",
                            year: "Feb,2024 — Now",
                            color: "primary"
                        },
                        {
                            role: "UI/UX & Creative Designer",
                            company: "Walton Digi-Tech Industries Ltd. (Corporate)",
                            year: "Dec,2022 — Jan,2024",
                            color: "primary/80"
                        },
                        {
                            role: "UI Designer (Remote)",
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
                                <span className="text-5xl md:text-6xl font-sans text-primary/20 group-hover:text-primary/60 transition-colors">
                                    0{i + 1}
                                </span>
                            </div>
                            <div className="md:col-span-6">
                                <h3 className="text-2xl md:text-4xl font-sans uppercase text-white/90 group-hover:text-primary transition-colors mb-2">
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

            {/* Expertise - Premium Bento */}
            <section className="relative overflow-hidden border-t border-white/10 px-6 py-24 md:px-12">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[130px]" />
                <div className="mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="type-section mb-14 uppercase text-primary md:mb-18"
                    >
                        Expertise
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[190px]">
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65 }}
                            whileHover={{ y: -6 }}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_28px_110px_rgba(34,211,238,0.055)] md:p-10 lg:col-span-6 lg:row-span-2"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.11),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.09),transparent_42%)] opacity-80" />
                            <div className="relative z-10 flex h-full flex-col justify-between gap-16">
                                <div>
                                    <span className="type-label mb-6 block text-[10px] text-cyan-200/65">
                                        Capability System
                                    </span>
                                    <h3 className="type-case-title max-w-2xl text-4xl leading-[1.02] text-white md:text-5xl">
                                        Designing products with clarity, craft, and AI-powered speed.
                                    </h3>
                                </div>
                                <p className="type-body max-w-xl text-base leading-8 text-white/55 md:text-lg">
                                    From mobile apps to web platforms, I turn complex ideas into simple, usable, and visually refined experiences.
                                </p>
                            </div>
                        </motion.div>

                        {[
                            ["Mobile Design", "iOS & Android experiences"],
                            ["Web Design", "Responsive modern interfaces"],
                            ["Product Thinking", "UX flows, strategy, usability"],
                            ["AI Workflow", "Faster ideation and production"],
                        ].map(([title, subtitle], i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: i * 0.06 }}
                                whileHover={{ y: -5 }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.045] hover:shadow-[0_20px_80px_rgba(34,211,238,0.045)] md:min-h-[180px] lg:col-span-3"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%,rgba(34,211,238,0.04))] opacity-60" />
                                <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                                    <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-cyan-300/70 to-violet-300/50 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div>
                                        <h3 className="type-case-title mb-3 text-2xl uppercase text-white">
                                            {title}
                                        </h3>
                                        <p className="type-body text-sm leading-6 text-white/45">
                                            {subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: 0.12 }}
                            whileHover={{ y: -6 }}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-violet-300/25 hover:shadow-[0_28px_110px_rgba(139,92,246,0.055)] md:col-span-2 lg:col-span-6 lg:row-span-2"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.11),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_42%)]" />
                            <div className="relative z-10 flex h-full flex-col gap-8">
                                <div>
                                    <span className="type-label mb-4 block text-[10px] text-violet-200/60">
                                        Tools I Use
                                    </span>
                                    <h3 className="type-case-title text-3xl uppercase text-white">
                                        Creative stack
                                    </h3>
                                </div>

                                <div className="relative min-h-[300px] flex-1">
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.11),transparent_36%),radial-gradient(circle_at_54%_52%,rgba(139,92,246,0.105),transparent_40%)]" />
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.075)_0_1px,transparent_1.5px),radial-gradient(circle_at_70%_66%,rgba(34,211,238,0.09)_0_1px,transparent_1.5px)] bg-[size:64px_64px] opacity-18" />
                                    <div className="grid grid-cols-4 gap-3 md:block">
                                        {[
                                            { name: "Figma", icon: "/logos/design/figma.png", className: "md:left-[27%] md:top-[20%] md:z-30 md:h-[5.1rem] md:w-[5.1rem] md:rotate-[-5deg]", iconClass: "md:h-10 md:w-10" },
                                            { name: "Photoshop", icon: "/logos/design/photoshop.png", className: "md:left-[43%] md:top-[13%] md:z-20 md:h-[4.75rem] md:w-[4.75rem] md:rotate-[4deg]", iconClass: "md:h-9 md:w-9" },
                                            { name: "Illustrator", icon: "/logos/design/illustrator.png", className: "md:left-[57%] md:top-[24%] md:z-30 md:h-[4.95rem] md:w-[4.95rem] md:rotate-[-4deg]", iconClass: "md:h-9 md:w-9" },
                                            { name: "Framer", icon: "/logos/design/framer.png", className: "md:right-[21%] md:top-[41%] md:z-20 md:h-[4.7rem] md:w-[4.7rem] md:rotate-[5deg]", iconClass: "md:h-9 md:w-9" },
                                            { name: "ChatGPT", icon: "/logos/ai/chatgpt.png", className: "md:left-[23%] md:bottom-[26%] md:z-20 md:h-[4.8rem] md:w-[4.8rem] md:rotate-[4deg]", iconClass: "md:h-9 md:w-9" },
                                            { name: "Midjourney", icon: "/logos/ai/midjourney.png", className: "md:left-[39%] md:bottom-[17%] md:z-30 md:h-[5rem] md:w-[5rem] md:rotate-[-5deg]", iconClass: "md:h-10 md:w-10" },
                                            { name: "Claude", icon: "/logos/ai/claude-icon.png", className: "md:left-[55%] md:bottom-[25%] md:z-20 md:h-[4.7rem] md:w-[4.7rem] md:rotate-[4deg]", iconClass: "md:h-9 md:w-9" },
                                            { name: "Google Antigravity", icon: "/logos/ai/google-antigravity.png", className: "md:right-[25%] md:bottom-[15%] md:z-10 md:h-[4.85rem] md:w-[4.85rem] md:rotate-[-4deg] md:opacity-90", iconClass: "md:h-9 md:w-9" },
                                        ].map((tool, i) => (
                                            <motion.div
                                                key={tool.name}
                                                initial={{ opacity: 0, scale: 0.88, y: 14 }}
                                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    opacity: { duration: 0.45, delay: 0.18 + i * 0.035 },
                                                    scale: { duration: 0.45, delay: 0.18 + i * 0.035 },
                                                    y: { duration: 4.8 + i * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 },
                                                    rotate: { duration: 5.8 + i * 0.14, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                                                }}
                                                animate={{ y: [0, i % 2 === 0 ? -6 : 5, 0], rotate: [0, i % 2 === 0 ? 1.5 : -1.5, 0] }}
                                                whileHover={{ y: -8, scale: 1.055, rotate: 0 }}
                                                className={["relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/44 shadow-[0_18px_55px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors duration-300 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.07] before:to-transparent before:opacity-55 hover:border-cyan-300/32 hover:bg-white/[0.065] md:absolute", tool.className].join(" ")}
                                                title={tool.name}
                                            >
                                                <Image
                                                    src={tool.icon}
                                                    alt={tool.name + " logo"}
                                                    width={42}
                                                    height={42}
                                                    className={["relative z-10 h-8 w-8 object-contain", tool.iconClass].join(" ")}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: 0.18 }}
                            whileHover={{ y: -6 }}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.032] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/25 hover:shadow-[0_28px_110px_rgba(34,211,238,0.05)] md:col-span-2 lg:col-span-6 lg:row-span-2"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.1),transparent_42%)] opacity-80" />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30" />

                            <div className="relative z-10 flex h-full min-h-[320px] flex-col">
                                <span className="type-label mb-5 block text-[10px] text-cyan-200/60">
                                    Process Layer
                                </span>
                                <h3 className="type-case-title text-3xl uppercase text-white md:text-4xl">
                                    Thinking System
                                </h3>

                                <div className="relative mt-10 flex flex-1 items-center justify-center overflow-hidden rounded-[1.5rem]">
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08),transparent_42%)]" />
                                    <div className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 hidden h-px -translate-y-1/2 overflow-hidden bg-white/10 md:block">
                                        <motion.div
                                            className="h-full w-1/4 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
                                            animate={{ x: ["-120%", "520%"] }}
                                            transition={{ duration: 5.4, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>

                                    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-5 md:gap-3">
                                    {[
                                        ["01", "AI-assisted research"],
                                        ["02", "Pattern analysis"],
                                        ["03", "Concept generation"],
                                        ["04", "Human refinement"],
                                        ["05", "Developer execution"],
                                    ].map(([step, item], i) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: 0.14 + i * 0.055 }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className="group relative rounded-2xl border border-white/10 bg-black/28 px-4 py-4 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.045] hover:shadow-[0_18px_55px_rgba(34,211,238,0.045)] md:min-h-[142px]"
                                        >
                                            <motion.span
                                                className="mx-auto mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-200/10 shadow-[0_0_18px_rgba(34,211,238,0.22)]"
                                                animate={{ scale: [1, 1.18, 1], opacity: [0.72, 1, 0.72] }}
                                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.28 }}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/80" />
                                            </motion.span>
                                            <span className="type-label mb-4 block text-[9px] text-white/32">
                                                {step}
                                            </span>
                                            <span className="type-body block text-sm leading-6 text-white/68 md:text-[13px] md:leading-5">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-sans uppercase mb-20 text-primary"
                >
                    Selected Work
                </motion.h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mb-28">
                    {/* Using real data from lib/data.ts */}
                    {projects.slice(0, 3).map((project, i) => (
                        <Link href={`/works/${project.id}`} key={project.id} className="group block">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -7 }}
                                className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 group-hover:border-primary/30 group-hover:bg-white/[0.055] group-hover:shadow-[0_26px_90px_rgba(34,211,238,0.08)]"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-950">
                                    <ImageWithSkeleton
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        unoptimized={true}
                                        className="object-cover opacity-88 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]">
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
                                            <span className="type-label rounded-full border border-primary/15 bg-primary/[0.045] px-3 py-1 text-[9px] text-primary/68">
                                                {project.year}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="type-case-title mb-3 text-2xl uppercase leading-tight text-white transition-colors duration-300 group-hover:text-primary md:text-[1.7rem]">
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
            </section>

            {/* Recognition - Split Layout */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-sans uppercase mb-20 text-primary"
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
                                        <h3 className="font-sans text-2xl uppercase text-primary mb-2 group-hover:text-white transition-colors">
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
