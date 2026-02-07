"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        text: "Blending clean aesthetics with user-centered functionality. His attention to usability and responsive design made the interface intuitive and efficient for admin users. Shoaib's ability to create interactive elements and prioritize workflow efficiency was impressive. Overall, his work elevated the project, and I highly recommend him for any future design work.",
        author: "Jacob",
        role: "Rental Car Business",
        highlight: "intuitive and efficient"
    },
    {
        text: "Shoaib is an exceptional designer and a pleasure to work with on every project. He consistently delivers high-quality, thoughtful designs that align perfectly with our vision and business goals. His communication is clear, collaborative, and reliable, making the entire process smooth and stress-free. A true professional whom we fully trust and highly recommend.",
        author: "Jorge Matarrita",
        role: "CEO at Lotty",
        highlight: "exceptional designer"
    },
    {
        text: "Fantastic designer to work with. Shoaib truly understood the vision behind Jalo and delivered a clean, intuitive, and visually engaging experience. His creative yet practical approach made the product seamless to use, and his passion and collaboration made a real impact. We’re very satisfied with the results and excited to work with him again.",
        author: "Miguel Ambas",
        role: "Owner, Jalo App",
        highlight: "visually engaging design"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/10 relative">
            <div className="max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-center"
                    >
                        {/* Quote */}
                        <blockquote className="mb-12">
                            <p className="font-sans text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 font-light">
                                "{currentTestimonial.text.split(currentTestimonial.highlight)[0]}
                                <span className="italic text-primary">{currentTestimonial.highlight}</span>
                                {currentTestimonial.text.split(currentTestimonial.highlight)[1]}"
                            </p>
                        </blockquote>

                        {/* Author Info */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Avatar Circle */}
                            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                <span className="text-2xl font-display text-primary">
                                    {currentTestimonial.author.charAt(0)}
                                </span>
                            </div>

                            {/* Name and Role */}
                            <div>
                                <h5 className="font-display text-lg text-white mb-1">
                                    {currentTestimonial.author}
                                </h5>
                                <span className="text-sm font-sans tracking-widest text-secondary/70 uppercase">
                                    {currentTestimonial.role}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="flex justify-center items-center gap-8 mt-16">
                    <button
                        onClick={handlePrevious}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-primary w-8"
                                    : "bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>
        </section>
    );
}
