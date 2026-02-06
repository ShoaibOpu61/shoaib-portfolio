"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        text: "Blending clean aesthetics with user-centered functionality. His attention to usability and responsive design made the interface intuitive and efficient for admin users. Shoaib’s ability to create interactive elements and prioritize workflow efficiency was impressive. Overall, his work elevated the project, and I highly recommend him for any future design work.",
        author: "Jacob",
        role: "Rental Car Business"
    },
    {
        text: "Shoaib is an exceptional designer who consistently delivers high-quality work tailored to our needs. His communication is clear and collaborative, ensuring the final product aligns perfectly with our vision. A true professional!",
        author: "Jorge Matarrita",
        role: "CEO at Lotty"
    },
    {
        text: "Fantastic designer to work with. He took the time to truly understand the vision behind Jalo and crafted an intuitive and visually engaging design that aligned perfectly with our goals. His approach was not only creative, but also practical, making sure the user experience was seamless. Shoaib’s passion for design, coupled with his ability to adapt and collaborate, made him a key part of our journey. We’re excited to keep working with him on future projects.",
        author: "Miguel Ambas",
        role: "Owner, Jalo App"
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
