"use client";
import { motion } from "framer-motion";

export const WebMockup = ({ className }: { className?: string }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`inline-flex flex-col align-middle relative w-16 h-10 md:w-20 md:h-12 bg-white rounded-md border border-zinc-200 shadow-lg overflow-hidden mb-1 ${className}`}
    >
        <div className="h-4 bg-zinc-50 border-b border-zinc-100 flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 p-2 flex gap-1 bg-white">
            <div className="w-1/3 h-full bg-zinc-100 rounded-sm" />
            <div className="w-2/3 space-y-1">
                <div className="w-full h-2 bg-zinc-100 rounded-sm" />
                <div className="w-3/4 h-2 bg-zinc-100 rounded-sm" />
                <div className="w-full h-8 bg-blue-50/50 rounded-sm mt-1 border border-blue-100/50" />
            </div>
        </div>
    </motion.div>
);

export const MobileMockup = ({ className }: { className?: string }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className={`inline-flex flex-col align-middle relative w-8 h-14 md:w-10 md:h-16 bg-white rounded-md border border-zinc-200 shadow-lg overflow-hidden mb-1 ${className}`}
    >
        <div className="h-3 w-1/2 mx-auto bg-zinc-900 rounded-b-md z-10" />
        <div className="p-1.5 space-y-1 mt-1 bg-white h-full">
            <div className="w-full h-6 bg-zinc-100 rounded-sm" />
            <div className="w-full h-6 bg-zinc-100 rounded-sm" />
            <div className="w-full h-2 bg-zinc-50 rounded-sm" />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-zinc-300 rounded-full" />
    </motion.div>
);

export const AIMockup = ({ className }: { className?: string }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className={`inline-flex flex-col align-middle relative w-16 h-10 md:w-20 md:h-12 bg-white rounded-md border border-purple-100 shadow-lg overflow-hidden mb-1 ${className}`}
    >
        <div className="h-4 bg-purple-50/30 border-b border-purple-100/50 flex items-center px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        </div>
        <div className="flex-1 p-2 flex items-center justify-center gap-2 bg-white">
            <div className="w-8 h-8 rounded-full border border-purple-100 flex items-center justify-center bg-purple-50/20">
                <div className="w-4 h-4 rounded-full bg-purple-400/80 shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
            </div>
            <div className="flex-1 space-y-1">
                <div className="w-full h-1.5 bg-zinc-100 rounded-full" />
                <div className="w-2/3 h-1.5 bg-zinc-100 rounded-full" />
            </div>
        </div>
    </motion.div>
);

export const HandoffMockup = ({ className }: { className?: string }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className={`inline-flex flex-col align-middle relative w-16 h-10 md:w-20 md:h-12 bg-white rounded-md border border-zinc-200 shadow-lg overflow-hidden mb-1 ${className}`}
    >
        <div className="h-4 bg-zinc-50 border-b border-zinc-100 flex items-center px-2 gap-1.5">
            <div className="w-2 h-0.5 bg-zinc-300 rounded-full" />
            <div className="w-2 h-0.5 bg-zinc-300 rounded-full" />
        </div>
        <div className="flex-1 p-2 font-mono text-[6px] md:text-[8px] text-zinc-600 leading-tight bg-white">
            <span className="text-purple-600">const</span> UI = <span className="text-zinc-800">{"{"}</span><br />
            &nbsp;&nbsp;look: <span className="text-green-600">"crisp"</span>,<br />
            &nbsp;&nbsp;mode: <span className="text-green-600">"light"</span><br />
            <span className="text-zinc-800">{"}"}</span>;
        </div>
    </motion.div>
);
