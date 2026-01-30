"use client";

import clsx from "clsx";

const skills = [
    "RESEARCH", "WIREFRAMES", "UI DESIGN", "PROTOTYPING",
    "INTERACTION", "DESIGN SYSTEMS", "MOBILE APPS", "WEB GL", // Repeated to ensure length
    "RESEARCH", "WIREFRAMES", "UI DESIGN", "PROTOTYPING",
    "INTERACTION", "DESIGN SYSTEMS", "MOBILE APPS", "WEB GL"
];

export default function Skills() {
    return (
        <section className="py-12 border-y border-white/10 overflow-hidden bg-white/5">
            <div className="relative flex overflow-x-hidden group">
                {/* First marquee set */}
                <div className="animate-marquee whitespace-nowrap flex gap-16 py-4">
                    {skills.map((skill, i) => (
                        <span
                            key={i}
                            className={clsx(
                                "text-4xl md:text-6xl font-display uppercase tracking-tight text-secondary/50",
                                i % 2 === 0 ? "text-transparent stroke-text" : "text-secondary/50"
                            )}
                            style={i % 2 === 0 ? { WebkitTextStroke: "1px rgba(255,255,255,0.2)" } : {}}
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Second marquee set (duplicate for seamless loop) */}
                <div className="animate-marquee whitespace-nowrap flex gap-16 py-4 ml-16" aria-hidden="true">
                    {skills.map((skill, i) => (
                        <span
                            key={`dup-${i}`}
                            className={clsx(
                                "text-4xl md:text-6xl font-display uppercase tracking-tight text-secondary/50",
                                i % 2 === 0 ? "text-transparent stroke-text" : "text-secondary/50"
                            )}
                            style={i % 2 === 0 ? { WebkitTextStroke: "1px rgba(255,255,255,0.2)" } : {}}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* 
        Note: The Tailwind v4 config should have 'marquee' animation.
        If not perfect, we can add a custom style here. 
        Actually, we need marquee2 for the second one, or just wrap both in a container that moves?
        Standard accessible marquee: Container moves.
      */}
            <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(245, 245, 243, 0.2);
          color: transparent;
        }
      `}</style>
        </section>
    );
}
