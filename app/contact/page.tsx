"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-12 min-h-[80vh] flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="font-sans text-xs tracking-widest text-secondary mb-8 uppercase">
                        Get in Touch
                    </p>
                    <h1 className="text-6xl md:text-9xl font-serif uppercase leading-[0.85] mb-12 text-primary max-w-4xl">
                        Have an Idea? <br /> Let's Talk.
                    </h1>

                    <a
                        href="mailto:shoaibopu@gmail.com"
                        className="text-2xl md:text-4xl font-sans text-secondary hover:text-white transition-colors border-b border-secondary/50 pb-2 inline-block mb-12"
                    >
                        shoaibopu@gmail.com
                    </a>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div>
                            <h3 className="text-sm font-sans uppercase tracking-widest text-secondary mb-4">Socials</h3>
                            <ul className="space-y-2">
                                <li><a href="https://www.linkedin.com/in/shoaib-opu-a8aaa0184/" className="text-primary hover:text-white">LinkedIn</a></li>
                                <li><a href="https://www.instagram.com/shoaib_opu/" className="text-primary hover:text-white">Instagram</a></li>
                                <li><a href="https://dribbble.com/ShoaibOpu" className="text-primary hover:text-white">Dribbble</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-sans uppercase tracking-widest text-secondary mb-4">Location</h3>
                            <p className="text-primary">Dhaka, Bangladesh</p>
                            <p className="text-secondary text-sm mt-2">Remote Friendly</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
