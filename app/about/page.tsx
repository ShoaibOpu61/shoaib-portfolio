"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdCard from "@/components/IdCard";

export default function AboutPage() {
    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            {/* Hero Section with ID Card */}
            <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex flex-col md:flex-row gap-12 items-center">
                {/* Left Content */}
                <div className="w-full md:w-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-display uppercase leading-[0.85] mb-12 text-primary">
                        Shoaib Hossain - UI/UX Designer
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8 max-w-xl"
                    >
                        <p className="font-sans text-lg md:text-xl leading-relaxed text-secondary text-pretty">
                            UI/UX Designer with over **5 years of experience** creating digital products for mobile and web platforms. I specialize in designing intuitive experiences for **iOS**, **Android**, and responsive web applications.
                        </p>

                        <p className="font-sans text-base leading-relaxed text-secondary/80 text-pretty">
                            My process is grounded in user research and data-driven decisions. Recently, I've been integrating AI tools into my workflow to explore concepts faster while maintaining design quality. I thrive on bridging the design-development gap and shipping products that users genuinely love.
                        </p>

                        <p className="font-sans text-base leading-relaxed text-secondary/80 text-pretty">
                            When I'm not designing, you'll find me exploring motion graphics, playing football, or diving into the latest design trends.
                        </p>
                    </motion.div>
                </div>

                {/* Right Content - ID Card Interaction */}
                <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
                    <IdCard />
                </div>
            </section>

            {/* Experience Timeline - Minimal & Clean */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <h2 className="text-4xl md:text-5xl font-display uppercase mb-16">Experience</h2>
                <div className="space-y-12 max-w-4xl">
                    {[
                        {
                            role: "UI/UX Designer",
                            company: "Kite Games Studio Ltd.",
                            year: "2024 - Present"
                        },
                        {
                            role: "UI/UX Designer",
                            company: "Walton Digi-Tech Industries Ltd.",
                            year: "2022 - 2024"
                        },
                        {
                            role: "UI Designer",
                            company: "Exeqcuet, Dubai (Remote)",
                            year: "2022"
                        },
                        {
                            role: "UI/UX Designer",
                            company: "IOTA Infotech Limited",
                            year: "2018 - 2022"
                        },
                    ].map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-8 last:border-0 group hover:border-primary/30 transition-colors"
                        >
                            <h3 className="text-2xl md:text-3xl font-display uppercase text-primary mb-2 md:mb-0 group-hover:text-white transition-colors">
                                {job.role}
                            </h3>
                            <div className="text-left md:text-right">
                                <p className="font-sans text-sm md:text-base text-secondary uppercase tracking-widest mb-1">
                                    {job.company}
                                </p>
                                <p className="font-sans text-xs text-secondary/50">{job.year}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Skills Grid - Visual & Interactive */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <h2 className="text-4xl md:text-5xl font-display uppercase mb-16">Skills & Tools</h2>

                {/* Primary Skills - Large Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Mobile Design", subtitle: "iOS & Android" },
                        { title: "Web Design", subtitle: "Responsive & Modern" },
                        { title: "AI Workflow", subtitle: "Enhanced Process" }
                    ].map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-white/10 rounded-xl p-8 hover:border-primary/50 hover:bg-white/5 transition-all group cursor-pointer"
                        >
                            <h3 className="text-3xl font-display uppercase text-primary mb-2 group-hover:text-white transition-colors">
                                {skill.title}
                            </h3>
                            <p className="font-sans text-sm text-secondary/60 uppercase tracking-wider">
                                {skill.subtitle}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Tools - Compact Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        "Figma",
                        "Adobe XD",
                        "Illustrator",
                        "Photoshop",
                        "MidJourney",
                        "ChatGPT",
                        "Prototyping",
                        "User Research"
                    ].map((tool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="border border-white/5 rounded-lg p-4 text-center hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <p className="font-sans text-sm text-secondary/80">{tool}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section - Visual Impact */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { number: "5+", label: "Years Experience" },
                        { number: "40+", label: "Projects Delivered" },
                        { number: "4", label: "Companies Worked" },
                        { number: "2", label: "Awards Won" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-5xl md:text-7xl font-display text-primary mb-2">
                                {stat.number}
                            </h3>
                            <p className="font-sans text-xs md:text-sm text-secondary/60 uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Selected Work Highlights */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <h2 className="text-4xl md:text-5xl font-display uppercase mb-16">Featured Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            name: "Retouch App",
                            type: "Mobile • iOS/Android",
                            company: "Kite Games Studio"
                        },
                        {
                            name: "Beauty Editor",
                            type: "Mobile • iOS/Android",
                            company: "Kite Games Studio"
                        },
                        {
                            name: "Walton E-Commerce",
                            type: "Web • Responsive",
                            company: "Walton Digi-Tech"
                        },
                        {
                            name: "Walton Tick",
                            type: "Mobile • Cross-Platform",
                            company: "Walton Digi-Tech"
                        }
                    ].map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="border-l-4 border-primary/30 pl-6 py-4 hover:border-primary transition-all group cursor-pointer"
                        >
                            <h3 className="text-2xl font-display uppercase text-primary mb-1 group-hover:text-white transition-colors">
                                {project.name}
                            </h3>
                            <p className="font-sans text-xs text-secondary/50 uppercase tracking-widest mb-2">
                                {project.type}
                            </p>
                            <p className="font-sans text-sm text-secondary/70">
                                {project.company}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Achievements - Visual Badges */}
            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <h2 className="text-4xl md:text-5xl font-display uppercase mb-16">Recognition</h2>
                <div className="flex flex-wrap gap-6">
                    {[
                        { title: "MVP on the Field", year: "2024", org: "Kite Games" },
                        { title: "Employee of the Year", year: "2020", org: "IOTA Infotech" }
                    ].map((achievement, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="border-2 border-primary/30 rounded-xl px-8 py-6 hover:border-primary hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <p className="font-display text-xl uppercase text-primary mb-1">
                                {achievement.title}
                            </p>
                            <p className="font-sans text-xs text-secondary/50 uppercase tracking-widest">
                                {achievement.org} • {achievement.year}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}