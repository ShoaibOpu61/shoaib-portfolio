"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdCard from "@/components/IdCard";

export default function AboutPage() {
    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex flex-col md:flex-row gap-12 items-center">
                {/* Left Content */}
                <div className="w-full md:w-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-display uppercase leading-[0.85] mb-12 text-primary"
                    >
                        About <br /> Me
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8 max-w-xl"
                    >
                        <p className="font-sans text-lg md:text-xl leading-relaxed text-secondary text-pretty">
                            I’m Shoaib, a multidisciplinary Product Designer based in Dhaka. I specialize in creating digital experiences that blend <span className="text-primary">functional precision</span> with <span className="text-primary">aesthetic elegance</span>.
                        </p>
                        <p className="font-sans text-base leading-relaxed text-secondary/80 text-pretty">
                            With over 5 years of experience in the industry, I have worked with startups and enterprise clients to define their digital presence. My process is deeply rooted in user research, rapid prototyping, and a slight obsession with micro-interactions.
                        </p>
                        <p className="font-sans text-base leading-relaxed text-secondary/80 text-pretty">
                            When I am not designing, I am likely exploring new motion graphic techniques or refining my photography skills.
                        </p>
                    </motion.div>
                </div>

                {/* Right Content - ID Card Interaction */}
                <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
                    <IdCard />
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 border-t border-white/10">
                <h2 className="text-4xl font-display uppercase mb-12">Experience</h2>
                <div className="space-y-12">
                    {[
                        { role: "Senior UI/UX Designer", company: "Kite Games Studio Ltd.", year: "Feb, 2024 - Present" },
                        { role: "First Senior Deputy Assistant Director (Creative)", company: "Walton Digi-Tech Industries Ltd. (Corporate)", year: "Dec, 2022 - Jan, 2024" },
                        { role: "UI Engineer", company: "Exeqcuet (Remote)", year: "Feb, 2022 - Nov, 2022" },
                        { role: "UI/UX Designer", company: "IOTA Infotech Limited", year: "Aug, 2018 - Jan, 2022" },
                    ].map((job, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-8 last:border-0">
                            <h3 className="text-2xl font-display uppercase text-primary mb-2 md:mb-0">{job.role}</h3>
                            <div className="text-right">
                                <p className="font-sans text-sm text-secondary uppercase tracking-widest mb-1">{job.company}</p>
                                <p className="font-sans text-xs text-secondary/50">{job.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
