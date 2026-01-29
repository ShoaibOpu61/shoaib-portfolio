"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Done", value: "42+" },
    { label: "Happy Clients", value: "30+" },
];

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="block text-xs font-sans tracking-widest text-secondary mb-8"
                >
                    ABOUT ME
                </motion.span>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-sans font-light leading-relaxed text-secondary mb-16"
                >
                    I <span className="text-primary italic">shape digital products</span> with a focus on motion and user experience. My philosophy is simple: designs should feel <span className="text-primary">human, intuitive, and effortless</span> to use. I bridge the gap between bold aesthetics and functional clarity.
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <h4 className="text-5xl md:text-6xl font-display mb-2">{stat.value}</h4>
                            <p className="text-xs font-sans tracking-widest text-secondary uppercase">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
