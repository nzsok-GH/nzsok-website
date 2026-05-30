// Variant 3 — Editorial copy + a live Instagram scrapbook collage.
// Left: eyebrow + oversized SUIT headline + intro + CTAs.
// Right: every unique image we can pull from the school's Instagram (post
// covers AND all carousel children) via the Behold JSON feed, laid out as a
// static masonry of slightly-tilted scrapbook cards. No animation, no input.

import { useEffect, useState } from "react";

// Same feed id used by the <behold-widget> on the media page.
const BEHOLD_FEED = "https://feeds.behold.so/hXTPq6t7GL3vE8tNJ5vN";

// Shown until the feed resolves (and if it can't be reached at all).
const FALLBACK: Shot[] = [
  { src: "/classdojo/post1.jpg" },
  { src: "/classdojo/post2.jpg" },
  { src: "/classdojo/post3.jpg" },
  { src: "/classdojo/post4.jpg" },
];

// Six overlapping collage slots (percent positions within the relative frame).
// Bigger cards that intentionally overlap for a scrapbook-pile look.
const SLOTS = [
  { top: "0%", left: "2%", w: "44%", rot: -5, z: 3 },
  { top: "6%", left: "42%", w: "46%", rot: 4, z: 6 },
  { top: "28%", left: "0%", w: "42%", rot: 3, z: 5 },
  { top: "34%", left: "38%", w: "46%", rot: -4, z: 7 },
  { top: "54%", left: "6%", w: "44%", rot: 5, z: 4 },
  { top: "56%", left: "46%", w: "44%", rot: -3, z: 2 },
];

type Shot = { src: string; href?: string };

const pickSize = (sizes: any, mediaUrl?: string) =>
  sizes?.medium?.mediaUrl ??
  sizes?.large?.mediaUrl ??
  sizes?.small?.mediaUrl ??
  mediaUrl;

export default function Hero3Collage() {
  const [shots, setShots] = useState<Shot[]>(FALLBACK);

  // On a fresh load the logo-reveal LoadingScreen covers the page for ~1.35s,
  // so the entrance would finish unseen. Hold the animation until the screen
  // lifts. performance.now() (time since the page first loaded) does NOT reset
  // on View Transition navigations, so returning visitors animate immediately.
  const [introDelay] = useState(() =>
    typeof performance !== "undefined" ? Math.max(0, 1400 - performance.now()) / 1000 : 0
  );

  useEffect(() => {
    let cancelled = false;
    fetch(BEHOLD_FEED)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled || !Array.isArray(data?.posts)) return;
        const all: Shot[] = [];
        const seen = new Set<string>();
        const add = (src?: string, href?: string) => {
          if (src && !seen.has(src)) {
            seen.add(src);
            all.push({ src, href });
          }
        };
        // Feed posts are newest-first. One image per post (thread): use the
        // post-level cover and skip its carousel children, giving 6 photos from
        // the 6 most recent posts.
        for (const p of data.posts) {
          add(pickSize(p?.sizes, p?.mediaUrl), p?.permalink);
          if (all.length >= 6) break;
        }
        if (all.length) setShots(all.slice(0, 6));
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="top"
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 72px",
      }}
    >
      <style>{`
        @keyframes collage-in {
          from { opacity: 0; transform: translateY(22px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .collage-card {
          opacity: 0;
          z-index: var(--z);
          animation: collage-in 0.65s cubic-bezier(.2,.8,.25,1) both;
        }
        .collage-card:hover { z-index: 30; }
        .collage-frame {
          transform: rotate(var(--rot));
          transition: transform 0.3s cubic-bezier(.2,.8,.25,1);
        }
        .collage-card:hover .collage-frame {
          transform: rotate(0deg) scale(1.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .collage-card { animation: none; opacity: 1; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left — copy */}
        <div>
          <h1
            style={{
              fontFamily: "'SUIT', sans-serif",
              fontSize: "clamp(36px, 5.4vw, 60px)",
              fontWeight: 800,
              color: "#1c2b3a",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              margin: "18px 0 0",
            }}
          >
            언어와 문화로 이어가는
            <br />
            우리 아이의 뿌리
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "#4a5f75",
              lineHeight: 1.8,
              margin: "22px 0 0",
              maxWidth: 460,
            }}
          >
            올해로 29주년을 맞은 뉴질랜드 한민족 한글학교는 우리 아이들이 한국인의 정체성과 긍지를 지닌 이중문화와 이중언어의 소유자로서 따뜻한 인성과 지성을 지닌 창의적 인재로 키우는 것을 목표로 하고 있습니다.
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
              style={{
                padding: "13px 28px",
                borderRadius: 999,
                background: "#9278d6",
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 15,
                fontWeight: 600,
                color: "#9278D6",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
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

        {/* Right — overlapping scrapbook collage of the latest 6 IG photos */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 560,
            aspectRatio: "1 / 1.35",
            margin: "0 auto",
            justifySelf: "center",
          }}
        >
          {SLOTS.map((s, i) => {
            const shot = shots[i];
            if (!shot) return null;
            return (
              <a
                key={i}
                href={shot.href ?? "/media"}
                target={shot.href ? "_blank" : undefined}
                rel={shot.href ? "noopener noreferrer" : undefined}
                className="collage-card"
                style={{
                  position: "absolute",
                  top: s.top,
                  left: s.left,
                  width: s.w,
                  display: "block",
                  animationDelay: `${introDelay + i * 0.09}s`,
                  ["--z" as any]: s.z,
                }}
              >
                <div
                  className="collage-frame"
                  style={{
                    ["--rot" as any]: `${s.rot}deg`,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "4px solid #fff",
                    outline: "1px solid rgba(0,0,0,0.06)",
                    background: "#fff",
                    aspectRatio: "3 / 4",
                  }}
                >
                  <img
                    src={shot.src}
                    alt=""
                    loading={i < 6 ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
