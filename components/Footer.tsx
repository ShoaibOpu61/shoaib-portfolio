"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact" className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10 bg-white/5 relative overflow-hidden">
            <div className="flex flex-col items-center text-center">
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
                    className="font-serif text-[10vw] leading-[0.8] mb-12 uppercase text-center w-full"
                >
                    Let's Make <br /> Things Click
                </motion.h2>

                <a
                    href="mailto:shoaibopu@gmail.com"
                    className="inline-block px-8 py-4 border border-white/20 rounded-full font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 mb-24"
                >
                    Let&apos;s Connect
                </a>

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm font-sans tracking-widest text-secondary/50 uppercase gap-4 z-10 relative">
                    <span>© 2026 Shoaib. All rights reserved.</span>
                    <div className="flex gap-8 items-center">
                        <a
                            href="/designer_shoaib_resume.pdf"
                            download="designer_shoaib_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            Resume
                        </a>
                        <Link
                            href="https://www.linkedin.com/in/shoaib-opu-a8aaa0184/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            LinkedIn
                        </Link>
                        <Link
                            href="https://dribbble.com/ShoaibOpu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            Dribbble
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
