"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        text: "Shoaib brings a rare combination of visual flair and user-centric thinking. The dashboard redesign increased our engagement by 140%.",
        author: "ALEX MORGAN",
        role: "CEO, FinSaaS"
    },
    {
        text: "Working with him was effortless. He understood our brand voice immediately and translated it into a digital experience that feels premium.",
        author: "SARAH JENKINS",
        role: "Creative Director"
    },
    {
        text: "Precise, fast, and incredibly talented. The motion work he added to our landing page made all the difference.",
        author: "DAVID CHEN",
        role: "Founder, TechFlow"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                        className="flex flex-col justify-between"
                    >
                        <p className="font-sans text-lg md:text-xl leading-relaxed text-secondary mb-8">
                            "{t.text}"
                        </p>
                        <div>
                            <h5 className="font-display text-lg uppercase text-primary mb-1">
                                {t.author}
                            </h5>
                            <span className="text-xs font-sans tracking-widest text-secondary/50 uppercase">
                                {t.role}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
