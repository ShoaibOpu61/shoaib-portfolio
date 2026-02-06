"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Done", value: "100+" },
    { label: "Companies", value: "04" },
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



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h3 className="text-xl md:text-3xl font-sans font-light leading-relaxed text-secondary mb-8">
                        Hello! I’m Shoaib Hossain, a passionate UI/UX Designer with over <span className="text-primary italic">5 years of experience</span> creating intuitive digital experiences for both mobile apps and web platforms. I specialize in transforming complex ideas into simple, user-centered designs, using AI tools to push the boundaries of creativity and productivity. From the initial sketch to developer handoff, I ensure that every design I create is not only visually appealing but also functional and impactful. Want to dive deeper into how I craft seamless experiences and make an impact?
                    </h3>

                    <Link href="/about" className="inline-flex items-center gap-2 group text-primary font-display uppercase tracking-widest text-sm hover:text-white transition-colors duration-300">
                        Read More
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                </motion.div>

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