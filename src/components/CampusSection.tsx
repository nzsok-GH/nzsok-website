import { useEffect, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";

const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)" as const,
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
};

const CAMPUS_IMAGES = [
  { src: "/sherwood-school/campus/auditorium.jpg", label: "강당" },
  { src: "/sherwood-school/campus/kindergarten.jpg", label: "유치부" },
  {
    src: "/sherwood-school/campus/playground-kindergarten.jpg",
    label: "유치부 놀이터",
  },
  {
    src: "/sherwood-school/campus/playground-junior.jpg",
    label: "저학년 놀이터",
  },
  {
    src: "/sherwood-school/campus/playground-senior.jpg",
    label: "고학년 놀이터",
  },
  { src: "/sherwood-school/campus/book-playground.jpg", label: "책 놀이터" },
];

function CampusCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let index = 0;
    let paused = false;

    const goTo = (i: number) => {
      const slide = el.children[i] as HTMLElement | undefined;
      if (!slide) return;
      const left = slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2;
      el.scrollTo({ left, behavior: "smooth" });
    };

    const timer = setInterval(() => {
      if (paused) return;
      index = (index + 1) % CAMPUS_IMAGES.length;
      goTo(index);
    }, 3500);

    // let manual interaction pause auto-scroll briefly
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 6000);
    };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("wheel", pause, { passive: true });

    return () => {
      clearInterval(timer);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("wheel", pause);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="campus-carousel"
      style={{
        position: "relative",
        display: "flex",
        gap: 16,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        paddingBottom: 4,
        marginBottom: 16,
      }}
    >
      {CAMPUS_IMAGES.map((img) => (
        <div
          key={img.src}
          className="rounded-2xl"
          style={{
            position: "relative",
            flex: "0 0 88%",
            maxWidth: 760,
            scrollSnapAlign: "center",
            border: "1px solid rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <img
            src={img.src}
            alt={`Sherwood School — ${img.label}`}
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
              aspectRatio: "4 / 3",
              maxHeight: 340,
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              padding: "6px 12px",
              borderRadius: 999,
              fontFamily: "'SUIT', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#1c2b3a",
              background: "rgba(253,252,250,0.85)",
              border: "1px solid rgba(0,0,0,0.07)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            {img.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CampusSectionInner() {
  return (
    <section id="campus" style={{ marginBottom: 80 }}>
      <h2 style={{ ...H2_STYLE, marginBottom: 40 }}>Sherwood School</h2>

      <p
        style={{
          fontSize: 14,
          color: "#4a5f75",
          lineHeight: 1.85,
          marginBottom: 24,
          maxWidth: 720,
        }}
      >
        수업이 진행되는 Sherwood School은 브라운스 베이에 위치한 공립
        초등학교입니다. 우리 학교는 14개의 교실, 3개의 놀이터와 강당을 사용하며,
        수업 시간 중에는 안전한 학습 환경을 위해 외부인의 교내 출입이
        통제됩니다.
      </p>

      <CampusCarousel />

      <div
        className="rounded-2xl"
        style={{
          border: "1px solid rgba(0,0,0,0.07)",
          overflow: "hidden",
          height: 400,
        }}
      >
        <iframe
          title="Sherwood School"
          src="https://maps.google.com/maps?q=Sherwood+School+Auckland+New+Zealand&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

export default function CampusSection() {
  return (
    <ErrorBoundary name="CampusSection">
      <CampusSectionInner />
    </ErrorBoundary>
  );
}
