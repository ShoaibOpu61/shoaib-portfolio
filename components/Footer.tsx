"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact" className="py-24 md:py-48 px-6 md:px-12 border-t border-white/5 bg-background relative overflow-hidden">
            {/* Subtle background glow for footer focus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex flex-col items-center text-center relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-sans text-sm font-medium tracking-widest text-secondary mb-8 uppercase"
                >
                    Have an idea?
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-[12vw] md:text-[10vw] leading-[0.8] mb-16 uppercase text-center w-full text-white"
                >
                    Let&apos;s Make <br /> Things Click
                </motion.h2>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mb-32"
                >
                    <a
                        href="mailto:shoaibopu@gmail.com"
                        className="group relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-12 py-5 text-sm font-medium tracking-widest uppercase text-white backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden"
                    >
                        <span className="relative z-10">Let&apos;s Connect</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>
                </motion.div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-sans tracking-[0.3em] text-secondary/40 uppercase gap-6 z-10 relative mt-8">
                    <span>© 2026 Shoaib. All rights reserved.</span>
                    <div className="flex gap-8 items-center font-medium">
                        <a
                            href="/designer_shoaib_resume.pdf"
                            download="designer_shoaib_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Resume
                        </a>
                        <Link
                            href="https://www.linkedin.com/in/shoaib-opu-a8aaa0184/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-300"
                        >
                            LinkedIn
                        </Link>
                        <Link
                            href="https://dribbble.com/ShoaibOpu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Dribbble
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
