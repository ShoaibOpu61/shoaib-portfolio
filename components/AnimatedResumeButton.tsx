"use client";

import Link from "next/link";

export default function AnimatedResumeButton() {
    return (
        <a
            href="/designer_shoaib_resume.pdf"
            download="designer_shoaib_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 border border-white/20 rounded-full font-sans text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
        >
            Resume
        </a>
    );
}
