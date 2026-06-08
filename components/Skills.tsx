"use client";

const skills = [
  "UX DESIGN",
  "PRODUCT DESIGN",
  "BRAND SYSTEMS",
  "PROTOTYPING",
  "APP DESIGN",
  "AI WORKFLOWS",
  "VISUAL DESIGN",
  "DESIGN SYSTEMS",
  "MOTION DESIGN",
];

export default function Skills() {
  const tickerItems = [...skills, ...skills, ...skills];

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#050505] px-6 py-8 md:px-12">
      <div className="pointer-events-none absolute inset-x-12 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 shadow-[0_0_45px_rgba(34,211,238,0.035),0_0_70px_rgba(139,92,246,0.03)] backdrop-blur-xl md:px-7 md:py-3.5">
        <div className="marquee">
          <div className="marquee__track">
            {tickerItems.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="marquee__group"
                aria-hidden={i >= skills.length}
              >
                <span className={skill === "AI WORKFLOWS" || skill === "PRODUCT DESIGN" ? "marquee__item marquee__item--accent" : "marquee__item"}>
                  {skill}
                </span>
                <span className="marquee__dot" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(90deg, transparent, black 9%, black 91%, transparent);
        }

        .marquee__track {
          display: flex;
          width: max-content;
          align-items: center;
          will-change: transform;
          animation: marquee-move 54s linear infinite;
        }

        .marquee:hover .marquee__track {
          animation-play-state: paused;
        }

        .marquee__group {
          display: inline-flex;
          align-items: center;
          flex: 0 0 auto;
        }

        .marquee__item {
          font-family: var(--font-satoshi);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          line-height: 1;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          white-space: nowrap;
          flex: 0 0 auto;
        }

        .marquee__item--accent {
          color: rgba(255, 255, 255, 0.92);
          text-shadow: 0 0 18px rgba(34, 211, 238, 0.16);
        }

        .marquee__dot {
          width: 0.25rem;
          height: 0.25rem;
          margin-inline: 1.2rem;
          border-radius: 999px;
          background: rgba(34, 211, 238, 0.6);
          box-shadow: 0 0 14px rgba(34, 211, 238, 0.18);
          flex: 0 0 auto;
        }

        @keyframes marquee-move {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        @media (min-width: 768px) {
          .marquee__item {
            font-size: 0.72rem;
          }

          .marquee__dot {
            margin-inline: 1.6rem;
          }
        }
      `}</style>
    </section>
  );
}

