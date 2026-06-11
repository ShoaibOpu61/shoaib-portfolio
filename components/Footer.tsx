"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact" className="pt-24 pb-12 px-6 md:pt-36 md:pb-16 md:px-12 border-t border-white/5 bg-background relative overflow-hidden">
            {/* Subtle background glow for footer focus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex flex-col items-center text-center relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="type-label text-sm text-secondary mb-8"
                >
                    Have an idea?
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="type-section text-[12vw] md:text-[10vw] leading-[0.8] mb-16 uppercase text-center w-full text-white"
                >
                    Let&apos;s Make <br /> Things Click
                </motion.h2>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mb-16 md:mb-20"
                >
                    <a
                        href="mailto:shoaibopu@gmail.com"
                        className="type-button group relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-12 py-5 text-sm text-white backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden"
                    >
                        <span className="relative z-10">Let&apos;s Connect</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>
                </motion.div>

                <div className="type-label w-full flex flex-col md:flex-row justify-between items-center text-xs text-secondary/40 gap-6 z-10 relative">
                    <span>© 2026 Shoaib. All rights reserved.</span>
                    <div className="flex gap-8 items-center font-medium">
                        {[
                            { name: "Resume", href: "/designer_shoaib_resume.pdf", download: "designer_shoaib_resume.pdf" },
                            { name: "LinkedIn", href: "https://www.linkedin.com/in/shoaib-opu-a8aaa0184/" },
                            { name: "Dribbble", href: "https://dribbble.com/ShoaibOpu" },
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={link.download}
                                className="group relative text-secondary hover:text-white transition-colors duration-300 pb-1"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-full"></span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

