"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { WebMockup, MobileMockup, AIMockup, HandoffMockup } from "@/components/ui/FloatingMockups";

const stats = [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Done", value: "100+" },
    { label: "Companies", value: "04" },
];

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="block text-sm font-medium font-sans tracking-widest text-secondary mb-8 text-center"
                >
                    ABOUT ME
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 max-w-6xl mx-auto px-4"
                >
                    <h3 className="text-2xl md:text-4xl font-sans font-normal leading-[1.8] text-white/90 mb-12 text-center">
                        Hello! I'm Shoaib Hossain, a passionate UI/UX Designer with over 5 years of experience creating intuitive digital experiences for both
                        <span className="inline-block mx-1 align-middle"><MobileMockup /></span>
                        mobile apps and
                        <span className="inline-block mx-1 align-middle"><WebMockup /></span>
                        web platforms. I specialize in transforming complex ideas into simple, user-centered designs, using
                        <span className="inline-block mx-1 align-middle"><AIMockup /></span>
                        AI tools to push the boundaries of creativity and productivity. From the initial sketch to
                        <span className="inline-block mx-1 align-middle"><HandoffMockup /></span>
                        developer handoff, I ensure that every design I create is not only visually appealing but also functional and impactful.
                        <br /><br />
                        <span className="text-secondary text-xl md:text-2xl mt-4 block font-light">
                            Want to dive deeper into how I craft seamless experiences and make an impact?
                        </span>
                    </h3>

                    <div className="flex justify-center mt-12">
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300 group"
                        >
                            Read More
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-white/5 pt-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <h4 className="text-5xl md:text-7xl font-display mb-2 text-white group-hover:scale-105 transition-transform duration-300">{stat.value}</h4>
                            <p className="text-sm font-sans tracking-widest text-secondary uppercase group-hover:text-primary transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}