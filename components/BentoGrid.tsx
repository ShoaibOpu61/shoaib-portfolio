"use client";

import { motion } from "framer-motion";
import { Figma, PenTool, Layout, Image, Cpu, Sparkles, Zap, Bot, Search, Palette, Terminal } from "lucide-react";

// Tools Data
const designTools = [
    { name: "Figma", icon: Figma },
    { name: "Illustrator", icon: PenTool },
    { name: "Photoshop", icon: Image },
    { name: "Framer", icon: Layout },
    { name: "Adobe XD", icon: Zap },
    { name: "Adobe InDesign", icon: Palette },
];

const aiTools = [
    { name: "ChatGPT", icon: Bot },
    { name: "MidJourney", icon: Sparkles },
    { name: "Google Antigravity", icon: Zap },
    { name: "Freepik AI", icon: Image },
    { name: "Google Stitch", icon: Terminal },
    { name: "Gemini", icon: Sparkles },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function BentoGrid() {
    return (
        <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-[#0A0A0A]">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] max-w-7xl mx-auto"
            >
                {/* Header / Intro Card */}
                <motion.div
                    variants={cardVariants}
                    className="col-span-1 md:col-span-2 row-span-1 bg-white/5 rounded-2xl p-8 flex flex-col justify-between border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div>
                        <h3 className="font-display text-3xl md:text-4xl uppercase mb-2">My Arsenal</h3>
                        <p className="font-sans text-secondary text-sm">The tools that power my workflow.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono uppercase text-secondary">Always Learning</span>
                    </div>
                </motion.div>

                {/* Design Tools Card */}
                <motion.div
                    variants={cardVariants}
                    className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 bg-[#111] rounded-2xl p-6 border border-white/5 flex flex-col"
                >
                    <h4 className="font-sans text-xs tracking-widest text-secondary uppercase mb-6 flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Design
                    </h4>
                    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
                        {designTools.map((tool) => (
                            <div key={tool.name} className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors aspect-square text-center">
                                <tool.icon className="w-6 h-6 text-primary" />
                                <span className="text-[10px] uppercase tracking-wide text-secondary">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Tools Card */}
                <motion.div
                    variants={cardVariants}
                    className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 bg-[#111] rounded-2xl p-6 border border-white/5 flex flex-col"
                >
                    <h4 className="font-sans text-xs tracking-widest text-secondary uppercase mb-6 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> AI Stack
                    </h4>
                    <div className="grid grid-cols-1 gap-2 flex-1">
                        {aiTools.map((tool) => (
                            <div key={tool.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                <tool.icon className="w-5 h-5 text-purple-400" />
                                <span className="text-xs uppercase tracking-wide text-secondary">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Creative Statement / Filler */}
                <motion.div
                    variants={cardVariants}
                    className="col-span-1 md:col-span-2 row-span-1 bg-gradient-to-r from-zinc-900 to-black rounded-2xl p-8 border border-white/5 flex items-center justify-center relative overflow-hidden text-center"
                >
                    {/* Abstract Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <h3 className="font-display text-2xl md:text-3xl uppercase text-white/80 leading-tight relative z-10">
                        "Bridging the gap between <span className="text-white border-b border-white/30">Human Creativity</span> and <span className="text-purple-300 border-b border-purple-500/30">Artificial Intelligence</span>."
                    </h3>
                </motion.div>

            </motion.div>
        </section>
    );
}
