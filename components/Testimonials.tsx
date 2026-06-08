"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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
        text: "Fantastic designer to work with. Shoaib truly understood the vision behind Jalo and delivered a clean, intuitive, and visually engaging experience. His creative yet practical approach made the product seamless to use, and his passion and collaboration made a real impact. We are very satisfied with the results and excited to work with him again.",
        author: "Miguel Ambas",
        role: "Owner, Jalo App",
        highlight: "visually engaging design"
    }
];

const ease = [0.16, 1, 0.3, 1] as const;

function wrapIndex(index: number) {
    return (index + testimonials.length) % testimonials.length;
}

function TestimonialCard({
    testimonial,
    isActive,
}: {
    testimonial: (typeof testimonials)[number];
    isActive: boolean;
}) {
    const [beforeHighlight, afterHighlight] = testimonial.text.split(testimonial.highlight);

    return (
        <div className={`${isActive ? "bg-[#090909]/98 shadow-[0_34px_120px_rgba(0,0,0,0.62)] backdrop-blur-3xl" : "bg-[#121212]/78 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl"} relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-7 md:min-h-[460px] md:p-10 lg:p-12`}>
            <div className={`${isActive ? "opacity-100" : "opacity-25"} pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.09),transparent_42%)]`} />
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] ring-1 ring-inset ring-white/8" />

            <div className={`${isActive ? "opacity-100" : "opacity-0"} relative z-10 mx-auto flex w-full max-w-[760px] flex-1 flex-col transition-opacity duration-300`}>
                <div>
                    <span className="type-label mb-8 block text-center text-[10px] text-cyan-200/70">
                        Client Words
                    </span>
                    <blockquote>
                        <p className="type-body text-center text-[1.125rem] font-light leading-[1.62] text-white/92 sm:text-[1.25rem] md:text-[1.5rem] md:leading-[1.58] lg:text-[1.85rem] lg:leading-[1.5]">
                            &ldquo;{beforeHighlight}
                            <span className="type-accent text-white">{testimonial.highlight}</span>
                            {afterHighlight}&rdquo;
                        </p>
                    </blockquote>
                </div>

                <div className="mt-auto flex flex-col items-center justify-center gap-4 pt-10 text-center md:pt-12">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/30 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
                        <span className="type-case-title text-xl text-white">
                            {testimonial.author.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h5 className="type-case-title text-lg text-white">
                            {testimonial.author}
                        </h5>
                        <span className="type-label mt-1 block text-[10px] text-white/45">
                            {testimonial.role}
                        </span>
                    </div>
                </div>
            </div>

            {!isActive && (
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.045),transparent_42%,rgba(0,0,0,0.5))] backdrop-blur-[3px]" />
            )}
        </div>
    );
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(media.matches);

        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => wrapIndex(prev - 1));
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => wrapIndex(prev + 1));
    };

    const previewIndex = wrapIndex(currentIndex + direction);
    const activeTestimonial = testimonials[currentIndex];
    const previewTestimonial = testimonials[previewIndex];
    const previewX = isMobile ? 20 : direction > 0 ? 96 : -96;
    const activeTravelX = isMobile ? 44 : 118;

    const activeVariants = {
        enter: (travelDirection: number) => ({
            x: shouldReduceMotion ? 0 : travelDirection * activeTravelX,
            y: shouldReduceMotion ? 0 : 24,
            scale: shouldReduceMotion ? 1 : 0.94,
            rotate: shouldReduceMotion || isMobile ? 0 : travelDirection * 1.4,
            opacity: 0,
            filter: "blur(3px)",
        }),
        center: {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
        },
        exit: (travelDirection: number) => ({
            x: shouldReduceMotion ? 0 : travelDirection * -activeTravelX,
            y: shouldReduceMotion ? 0 : 26,
            scale: shouldReduceMotion ? 0.98 : 0.93,
            rotate: shouldReduceMotion || isMobile ? 0 : travelDirection * -1.4,
            opacity: 0,
            filter: "blur(4px)",
        }),
    };

    return (
        <section className="relative overflow-hidden border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[120px]" />
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="type-section text-center text-[clamp(2.35rem,5vw,4.85rem)] uppercase text-white"
                    >
                        WHAT PEOPLE SAY
                    </motion.h2>
                </div>

                <motion.div layout className="relative mx-auto grid w-[92vw] max-w-[960px] md:w-[90vw]">
                    <motion.article
                        key={`preview-${previewTestimonial.author}-${direction}`}
                        className="pointer-events-none absolute inset-0 mx-auto w-full max-w-[960px]"
                        initial={false}
                        animate={{
                            x: shouldReduceMotion ? 0 : previewX,
                            y: shouldReduceMotion ? 18 : isMobile ? 20 : 28,
                            scale: shouldReduceMotion ? 0.97 : 0.9,
                            rotate: shouldReduceMotion || isMobile ? 0 : direction * 1.8,
                            opacity: 0.24,
                            filter: "blur(4px)",
                        }}
                        transition={{
                            duration: shouldReduceMotion ? 0.2 : 0.72,
                            ease,
                        }}
                        style={{ zIndex: 1, pointerEvents: "none" }}
                        aria-hidden="true"
                    >
                        <TestimonialCard testimonial={previewTestimonial} isActive={false} />
                    </motion.article>

                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.article
                            key={activeTestimonial.author}
                            custom={direction}
                            variants={activeVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: shouldReduceMotion ? 0.2 : 0.68,
                                ease,
                            }}
                            layout
                            className="relative col-start-1 row-start-1 mx-auto w-full max-w-[960px]"
                            style={{ zIndex: 3 }}
                            aria-live="polite"
                        >
                            <TestimonialCard testimonial={activeTestimonial} isActive />
                        </motion.article>
                    </AnimatePresence>
                </motion.div>

                <div className="mt-8 flex items-center justify-center gap-6 md:mt-10">
                    <button
                        onClick={handlePrevious}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/35 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        {testimonials.map((testimonial, index) => (
                            <button
                                key={testimonial.author}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "w-8 bg-white"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                                aria-current={index === currentIndex ? "true" : undefined}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/35 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
