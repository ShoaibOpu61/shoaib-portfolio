"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Works", href: "/works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm shadow-white/5" : "bg-transparent"
                )}
            >
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="font-display text-2xl font-bold tracking-tighter uppercase text-white mix-blend-difference"
                >
                    SHOAIB
                </Link>

                <div className="flex items-center gap-8">
                    {/* Desktop nav */}
                    <ul className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="font-sans text-sm tracking-widest uppercase hover:text-white text-secondary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Resume */}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block px-5 py-2 border border-white/20 rounded-full font-sans text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Resume
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="md:hidden px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase hover:bg-white/10 transition"
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
                                <span className="font-sans text-xs tracking-widest uppercase text-white/60">
                                    Navigation
                                </span>
                                <button
                                    onClick={closeMenu}
                                    className="px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs tracking-widest uppercase hover:text-white hover:border-white/30 transition"
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
                                        className="py-3 border-b border-white/10 font-display uppercase text-3xl tracking-tight text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMenu}
                                    className="inline-flex w-full items-center justify-center px-5 py-3 border border-white/20 rounded-full font-sans text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Resume
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
