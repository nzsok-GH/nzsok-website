// Home hero — full-bleed photo mosaic of horizontally panning rows behind the
// copy, which sits on a left-weighted scrim. Every photo is used; each row is
// rendered twice and its track translates -50% for a seamless loop. CSS-only.
import type { HeroPhoto } from "../lib/heroPhotos";

// Stacked rows fill the hero height (flex: 1 each). Alternating directions and
// varied speeds keep the wall from reading as one rigid block.
const ROWS = [
  { dur: 130, right: false },
  { dur: 230, right: true },
  { dur: 180, right: false },
];

// Each row's photo sequence is repeated this many times per half, then the half
// is rendered twice so the -50% translate loops seamlessly. Repeating guarantees
// a half is always wider than the viewport (no gap), even on ultra-wide screens.
const HALF_REPEAT = 2;

export default function HeroSection({ photos = [] }: { photos?: HeroPhoto[] }) {
  const rows: HeroPhoto[][] = ROWS.map(() => []);
  photos.forEach((p, i) => rows[i % rows.length].push(p));

  return (
    <section
      id="top"
      style={{ position: "relative", minHeight: "calc(100vh - var(--nav-h))", overflow: "hidden", background: "var(--bg-100)" }}
    >
      <style>{`
        @keyframes hero-pan-left  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes hero-pan-right { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
        /* The nav sits outside the scroll region, so the rows just inset
           evenly from the edges of the hero. */
        .hero-rows {
          position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 10px;
        }
        .hero-row { flex: 1; min-height: 0; overflow: hidden; }
        .hero-row-track {
          display: flex; height: 100%; width: max-content;
          animation: hero-pan-left var(--dur) linear infinite; will-change: transform;
        }
        .hero-row--right .hero-row-track { animation-name: hero-pan-right; }
        .hero-row img {
          height: 100%; width: auto; display: block; margin-right: 10px; border-radius: 10px;
        }
        /* Left-weighted ivory scrim for dark-copy contrast, plus a gentle veil
           that softens the photos to a pastel wash on brand. */
        .hero-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(to right, rgba(250,247,242,1) 0%, rgba(250,247,242,0.98) 44%, rgba(250,247,242,0.58) 72%, rgba(250,247,242,0.16) 100%),
            linear-gradient(to bottom, rgba(250,247,242,0.18), rgba(250,247,242,0.30));
        }
        .hero-overlay {
          position: relative; z-index: 1; width: 100%; max-width: 1200px;
          margin: 0 auto; padding: 64px 24px 72px; min-height: calc(100vh - var(--nav-h));
          display: flex; align-items: center;
        }
        .hero-ig { transition: opacity 0.2s; }
        .hero-ig:hover { opacity: 0.7; }
        .hero-cta { background: #9278d6; transition: background 0.2s; }
        .hero-cta:hover { background: #7a62c0; }
        @media (max-width: 640px) {
          /* Anchor the copy to the top so it sits in the strong tint band, with
             photos revealed below — the vertical mirror of the desktop layout. */
          .hero-overlay { align-items: flex-start; }
          .hero-scrim { background: linear-gradient(to bottom, rgba(250,247,242,1) 0%, rgba(250,247,242,0.97) 44%, rgba(250,247,242,0.5) 72%, rgba(250,247,242,0.14) 100%); }
        }
        @media (prefers-reduced-motion: reduce) { .hero-row-track { animation: none; } }
      `}</style>

      <div className="hero-rows" aria-hidden="true">
        {rows.map((row, ri) => {
          const half = Array.from({ length: HALF_REPEAT }, () => row).flat();
          const full = [...half, ...half];
          return (
            <div key={ri} className={`hero-row${ROWS[ri].right ? " hero-row--right" : ""}`}>
              <div className="hero-row-track" style={{ ["--dur" as any]: `${ROWS[ri].dur}s` }}>
                {full.map((p, i) => (
                  <img
                    key={i}
                    src={p.src}
                    width={p.w}
                    height={p.h}
                    alt=""
                    loading={ri === 0 && i < row.length ? "eager" : "lazy"}
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-overlay">
        <div style={{ maxWidth: 560 }}>
          <h1
            style={{
              fontFamily: "'SUIT', sans-serif",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 800,
              color: "#9278d6",
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            뉴질랜드 한민족 한글학교
          </h1>

          <p
            style={{
              fontFamily: "'SUIT', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 17px)",
              fontWeight: 700,
              color: "#1c2b3a",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              margin: "18px 0 0",
            }}
          >
            긍정적인 생활태도와 이중문화 소유자
          </p>

          <p
            style={{
              fontSize: "clamp(14px, 1.6vw, 17px)",
              fontWeight: 600,
              color: "#1c2b3a",
              letterSpacing: "0.04em",
              margin: "2px 0 0",
            }}
          >
            Think positively and be bicultural
          </p>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "#4a5f75",
              lineHeight: 1.8,
              margin: "22px 0 0",
              maxWidth: 460,
            }}
          >
            올해로 29주년을 맞은 뉴질랜드 한민족 한글학교는 우리 아이들이 한국인의
            정체성과 긍지를 지닌 이중문화와 이중언어의 소유자로서 따뜻한 인성과
            지성을 지닌 창의적 인재로 키우는 것을 목표로 하고 있습니다.
          </p>

          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 32,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="/enrol"
              className="hero-cta"
              style={{
                padding: "13px 28px",
                borderRadius: 999,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              입학안내
            </a>
            <a
              href="https://www.instagram.com/nzsok.official"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-ig"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 15,
                fontWeight: 600,
                color: "#9278d6",
                textDecoration: "none",
              }}
            >
              @nzsok.official
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
