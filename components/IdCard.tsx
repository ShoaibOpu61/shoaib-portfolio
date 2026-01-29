"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function IdCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position mechanism
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Physics springs for smooth swinging
    const rotateX = useSpring(useTransform(y, [-300, 300], [25, -25]), {
        stiffness: 150,
        damping: 20
    });
    const rotateY = useSpring(useTransform(x, [-300, 300], [-25, 25]), {
        stiffness: 150,
        damping: 20
    });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Calculate mouse position relative to center of the card
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div
            className="perspective-1000 w-full h-[500px] flex items-center justify-center p-8"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={cardRef}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="w-[300px] h-[450px] bg-[#EBEBEB] rounded-xl relative shadow-2xl flex flex-col items-center pt-12 overflow-hidden border border-white/50"
            >
                {/* Lanyard Hole */}
                <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A0A0A] rounded-full ring-4 ring-[#333]" />

                {/* Lanyard String (Visual only, usually outside card but drawing here for simplicity of component) */}
                {/* Ideally the string goes UP out of the card. */}

                {/* Photo Area */}
                <div className="w-32 h-32 bg-gray-300 rounded-lg mb-6 overflow-hidden border-2 border-white shadow-inner">
                    {/* Placeholder for user photo */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-gray-500">
                        PHOTO
                    </div>
                </div>

                {/* Details */}
                <h2 className="font-display text-2xl text-black uppercase tracking-tight mb-1">SHOAIB OPU</h2>
                <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mb-8">UI/UX Designer</p>

                {/* Stats / Info */}
                <div className="w-full px-8 space-y-3">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="font-sans text-[10px] text-gray-500 uppercase">Location</span>
                        <span className="font-sans text-[10px] text-black font-bold uppercase">Dhaka, BD</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="font-sans text-[10px] text-gray-500 uppercase">Mobile No.</span>
                        <span className="font-sans text-[10px] text-black font-bold uppercase">+880 1687716661</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="font-sans text-[10px] text-gray-500 uppercase">Email Address</span>
                        <span className="font-sans text-[10px] text-black font-bold lowercase">shoaibopu@gmail.com</span>
                    </div>
                </div>

                {/* Decorative Barcode */}
                <div className="mt-auto mb-8 w-3/4 h-12 bg-black flex items-center justify-center gap-1 overflow-hidden opacity-80">
                    {/* Generative vertical lines */}
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-full bg-white"
                            style={{
                                width: Math.random() > 0.5 ? '2px' : '4px',
                                opacity: Math.random() > 0.3 ? 1 : 0.5
                            }}
                        />
                    ))}
                </div>

                {/* Gloss Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 pointer-events-none mix-blend-overlay" />
            </motion.div>

            {/* Styles for perspective */}
            <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
        </div>
    );
}
