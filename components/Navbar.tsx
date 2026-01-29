"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Works", href: "/works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 transition-all duration-300 md:px-12",
                isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm shadow-white/5" : "bg-transparent"
            )}
        >
            <Link href="/" className="font-display text-2xl font-bold tracking-tighter uppercase z-50 text-white mix-blend-difference">
                SHOAIB
            </Link>

            <div className="flex items-center gap-8">
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

                {/* Resume Button */}
                <a
                    href="/resume.pdf" // Placeholder path
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:block px-5 py-2 border border-white/20 rounded-full font-sans text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                    Resume
                </a>

                <button className="md:hidden text-white uppercase text-sm font-bold">
                    Menu
                </button>
            </div>
        </motion.nav>
    );
}
