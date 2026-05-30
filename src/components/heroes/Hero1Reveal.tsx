// Variant 1 — "한글 조립" typographic reveal.
// Ambient, self-playing CSS animation (no pointer input). 자모/음절 fade-assemble
// into the wordmark, then a mission line + CTA settle in beneath it.

const ROWS = ["뉴질랜드", "한민족", "한글학교"];

export default function Hero1Reveal() {
  // Flatten to per-syllable spans so each can stagger in.
  let idx = 0;

  return (
    <section
      id="top"
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "96px 24px 64px",
      }}
    >
      <style>{`
        @keyframes h1-assemble {
          0%   { opacity: 0; transform: translateY(26px) scale(0.82); filter: blur(6px); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes h1-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h1-syl {
          display: inline-block;
          font-family: 'KerisKedyuche', sans-serif;
          font-weight: 700;
          line-height: 1.05;
          color: #7B5FC7;
          opacity: 0;
          animation: h1-assemble 0.7s cubic-bezier(.2,.8,.25,1) forwards;
        }
        .h1-row { display: block; }
        .h1-row:nth-child(2) .h1-syl { color: #9278D6; }
        .h1-row:nth-child(3) .h1-syl { color: #B49EE4; }
        .h1-tag, .h1-cta {
          opacity: 0;
          animation: h1-rise 0.6s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .h1-syl, .h1-tag, .h1-cta { animation: none; opacity: 1; }
        }
      `}</style>

      <h1
        style={{
          fontSize: "clamp(48px, 11vw, 132px)",
          margin: 0,
          letterSpacing: "0.02em",
        }}
        aria-label="뉴질랜드 한민족 한글학교"
      >
        {ROWS.map((row) => (
          <span className="h1-row" key={row}>
            {[...row].map((ch) => {
              const delay = idx * 0.09;
              idx += 1;
              return (
                <span
                  className="h1-syl"
                  key={`${row}-${ch}-${idx}`}
                  style={{ animationDelay: `${delay}s` }}
                  aria-hidden="true"
                >
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </section>
  );
}
