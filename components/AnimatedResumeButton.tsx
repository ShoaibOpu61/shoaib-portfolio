"use client";

import { motion } from "framer-motion";

export default function AnimatedResumeButton() {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            <a
                href="/designer_shoaib_resume.pdf"
                download="designer_shoaib_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="type-button group relative inline-flex items-center justify-center px-6 py-2.5 border border-white/10 bg-white/5 rounded-full backdrop-blur-md text-xs text-white transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-hidden"
            >
                <span className="relative z-10">Resume</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
        </motion.div>
    );
}
