"use client";

const ITEMS = [
  "Dry-aged 45 days",
  "Live fire",
  "Black salt",
  "1490 Sherbrooke",
  "Montréal",
];

export default function Marquee() {
  // Two identical tracks sit end to end and translate -50% for a seamless loop.
  const run = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {run.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          overflow: hidden;
          white-space: nowrap;
          padding: 2.6rem 0;
          border-top: 1px solid rgba(200, 133, 60, 0.14);
          border-bottom: 1px solid rgba(200, 133, 60, 0.14);
          background: linear-gradient(to bottom, #0c0908, var(--black));
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        .marquee-track {
          display: inline-flex;
          align-items: center;
          will-change: transform;
          animation: marquee 32s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          font-family: var(--serif);
          font-weight: 400;
          font-style: italic;
          font-size: clamp(1.5rem, 3.4vw, 2.6rem);
          letter-spacing: 0.01em;
          color: var(--text);
          padding: 0 0.2rem;
        }
        .marquee-star {
          color: var(--gold);
          font-style: normal;
          font-size: 0.7em;
          padding: 0 1.6rem;
          transform: translateY(-0.1em);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
