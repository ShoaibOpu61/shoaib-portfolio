"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import AnimatedResumeButton from "./AnimatedResumeButton";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Works", href: "/works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Scroll background style
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    // Close menu on route change-like behavior (simple safety)
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-300 md:px-12",
                    isScrolled ? "bg-black/40 backdrop-blur-xl py-4 shadow-lg shadow-purple-500/5 border-b border-white/5" : "bg-transparent"
                )}
            >
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="type-nav text-2xl text-white mix-blend-difference"
                >
                    SHOAIB
                </Link>

                <div className="flex items-center gap-8">
                    {/* Desktop nav */}
                    <ul 
                        className="hidden md:flex gap-2 items-center"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                                <li 
                                    key={link.name} 
                                    className="relative px-4 py-2"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                >
                                    <Link
                                        href={link.href}
                                        className={clsx(
                                            "type-nav text-sm transition-colors duration-300 relative z-10",
                                            isActive || hoveredIndex === index ? "text-white" : "text-secondary"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                    
                                    {/* Hover background pill */}
                                    {hoveredIndex === index && (
                                        <motion.div
                                            layoutId="navbar-hover"
                                            className="absolute inset-0 rounded-full bg-white/10"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    {/* Active indicator (glowing dot) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop Resume */}
                    <div className="hidden md:block">
                        <AnimatedResumeButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="type-button md:hidden px-6 py-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white text-[10px] hover:border-white/30 transition-all duration-300"
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <button
                            aria-label="Close menu backdrop"
                            onClick={closeMenu}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="relative mx-4 mt-24 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className="type-label text-xs text-white/60">
                                    Navigation
                                </span>
                                <button
                                    onClick={closeMenu}
                                    className="type-button px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs hover:text-white hover:border-white/30 transition"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="type-case-title py-3 border-b border-white/10 uppercase text-3xl text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8">
                                <a
                                    href="/designer_shoaib_resume.pdf"
                                    download="designer_shoaib_resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMenu}
                                    className="type-button group relative inline-flex w-full items-center justify-center px-6 py-4 border border-white/10 bg-white/5 rounded-full backdrop-blur-md text-xs text-white transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-hidden"
                                >
                                    <span className="relative z-10">Resume</span>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
