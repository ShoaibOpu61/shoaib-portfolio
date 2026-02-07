"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Download, Eye, Share2 } from "lucide-react";
import clsx from "clsx";

const ease = [0.16, 1, 0.3, 1] as const;

interface ButtonOption {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

export default function AnimatedResumeButton() {
    const [isExpanded, setIsExpanded] = useState(false);

    const options: ButtonOption[] = [
        {
            icon: <Eye className="w-4 h-4" />,
            label: "View",
            onClick: () => window.open("/resume.pdf", "_blank"),
        },
        {
            icon: <Download className="w-4 h-4" />,
            label: "Download",
            onClick: () => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Shoaib_Resume.pdf";
                link.click();
            },
        },
        {
            icon: <Share2 className="w-4 h-4" />,
            label: "Share",
            onClick: () => {
                if (navigator.share) {
                    navigator.share({
                        title: "Shoaib's Resume",
                        url: window.location.origin + "/resume.pdf",
                    });
                } else {
                    navigator.clipboard.writeText(window.location.origin + "/resume.pdf");
                    alert("Resume link copied to clipboard!");
                }
            },
        },
    ];

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className={clsx(
                    "relative overflow-hidden px-5 py-2 border border-white/20 rounded-full font-sans text-xs tracking-widest uppercase text-white transition-all duration-300",
                    isExpanded && "bg-gradient-to-br from-[#667eea] to-[#764ba2]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.span
                    animate={{
                        opacity: isExpanded ? 0 : 1,
                        y: isExpanded ? -10 : 0,
                    }}
                    transition={{ duration: 0.3, ease }}
                >
                    Resume
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease }}
                        className="absolute top-0 left-0 right-0 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2]"
                    >
                        <div className="flex flex-col divide-y divide-white/10">
                            {options.map((option, index) => (
                                <motion.button
                                    key={option.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease,
                                    }}
                                    onClick={() => {
                                        option.onClick();
                                        setIsExpanded(false);
                                    }}
                                    className="flex items-center gap-3 px-5 py-2.5 text-white hover:bg-white/10 transition-colors duration-200"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="flex-shrink-0">{option.icon}</span>
                                    <span className="font-sans text-xs tracking-widest uppercase">
                                        {option.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close menu */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsExpanded(false)}
                        className="fixed inset-0 -z-10"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
