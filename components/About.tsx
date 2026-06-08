"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { WebMockup, MobileMockup, AIMockup, HandoffMockup } from "@/components/ui/FloatingMockups";

const stats = [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Done", value: "100+" },
    { label: "Companies", value: "04" },
];

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    const y = useTransform(progress, range, [20, 0]); 
    
    return (
        <span className="relative mx-[0.1em] inline-block md:mx-[0.11em]">
            <motion.span style={{ opacity, y }} className="inline-block">
                {children}
            </motion.span>
        </span>
    );
};

export default function About() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 0.9", "end 0.4"],
    });

    const text1 = "Hello! I'm Shoaib Hossain, a passionate UI/UX Designer with over 5 years of experience creating intuitive digital experiences for both".split(" ");
    const text2 = "mobile apps and".split(" ");
    const text3 = "web platforms. I specialize in transforming complex ideas into simple, user-centered designs, using".split(" ");
    const text4 = "AI tools to push the boundaries of creativity and productivity. From the initial sketch to".split(" ");
    const text5 = "developer handoff, I ensure that every design I create is not only visually appealing but also functional and impactful.".split(" ");

    const allWords = [...text1, "MOBILE_MOCKUP", ...text2, "WEB_MOCKUP", ...text3, "AI_MOCKUP", ...text4, "HANDOFF_MOCKUP", ...text5];
    const totalItems = allWords.length;

    return (
        <section 
            id="about" 
            className="py-24 md:py-32 px-6 md:px-12 border-t border-white/5 bg-background relative"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="type-section mb-16 text-center uppercase text-white"
                >
                    ABOUT ME
                </motion.h2>

                <div className="mb-24 max-w-6xl mx-auto px-1 sm:px-4 lg:px-6">
                    <h3 
                        ref={textRef}
                        className="type-body text-xl md:text-[2rem] lg:text-[2.5rem] font-normal leading-[1.9] md:leading-[1.82] lg:leading-[1.78] text-white mb-12 text-center"
                    >
                        {allWords.map((word, i) => {
                            const start = i / totalItems;
                            const end = (i + 1) / totalItems;
                            
                            if (word === "MOBILE_MOCKUP") return <span key={i} className="inline-block mx-1 align-middle scale-90 md:mx-1.5 md:scale-100"><MobileMockup /></span>;
                            if (word === "WEB_MOCKUP") return <span key={i} className="inline-block mx-1 align-middle scale-90 md:mx-1.5 md:scale-100"><WebMockup /></span>;
                            if (word === "AI_MOCKUP") return <span key={i} className="inline-block mx-1 align-middle scale-90 md:mx-1.5 md:scale-100"><AIMockup /></span>;
                            if (word === "HANDOFF_MOCKUP") return <span key={i} className="inline-block mx-1 align-middle scale-90 md:mx-1.5 md:scale-100"><HandoffMockup /></span>;

                            return (
                                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                    {word}
                                </Word>
                            );
                        })}
                        <br /><br />
                        <motion.span 
                            style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0.1, 1]) }}
                            className="type-body text-secondary text-lg md:text-2xl mt-4 block font-light text-center leading-relaxed"
                        >
                            Want to dive deeper into how I craft seamless experiences and make an impact?
                        </motion.span>
                    </h3>

                    <div className="flex justify-center mt-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/about"
                            className="type-button group relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm text-white backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    Read More
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-white/5 pt-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <h4 className="type-case-title text-5xl md:text-7xl mb-2 text-white group-hover:scale-105 transition-transform duration-300">{stat.value}</h4>
                            <p className="type-label text-[10px] text-secondary group-hover:text-primary transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
