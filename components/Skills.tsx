"use client";

const skills = [
    "PROTOTYPING",
    "INTERACTION",
    "DESIGN SYSTEMS",
    "APP DESIGN",
    "WEB DESIGN",
    "RESEARCH",
    "WIREFRAMES",
    "UI DESIGN",
    "iOS DESIGN",
    "ANDROID DESIGN",
    "BRAND DESIGN",
    "LOGO DESIGN",
    "UX DESIGN",
];

export default function Skills() {
    return (
        <section className="py-12 border-y border-white/10 overflow-hidden bg-white/5">
            <div className="marquee">
                <div className="marquee__track">
                    {/* first set */}
                    {skills.map((skill, i) => (
                        <span
                            key={`s1-${i}`}
                            className="marquee__item text-4xl md:text-6xl font-display uppercase tracking-tight text-white/85"
                        >
                            {skill}
                        </span>
                    ))}

                    {/* second set (duplicate inside same track) */}
                    {skills.map((skill, i) => (
                        <span
                            key={`s2-${i}`}
                            className="marquee__item text-4xl md:text-6xl font-display uppercase tracking-tight text-white/85"
                            aria-hidden="true"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .marquee__track {
          display: flex;
          width: max-content;
          gap: 4rem;
          padding: 1rem 0;
          will-change: transform;
          animation: marquee-move 45s linear infinite;
        }

        .marquee__item {
          white-space: nowrap;
          flex: 0 0 auto;
        }

        @keyframes marquee-move {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </section>
    );
}
