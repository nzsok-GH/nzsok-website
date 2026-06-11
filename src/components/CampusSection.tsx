import { useEffect, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { H2_STYLE, SECTION_GAP } from "../lib/styles";

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

    // mouse drag-to-scroll for desktop (touch/trackpad already scroll natively)
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      // generous drag: move a bit more than the cursor for a lighter feel
      el.scrollLeft = startScroll - dx * 1.25;
    };

    const nearestIndex = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < el.children.length; i++) {
        const slide = el.children[i] as HTMLElement;
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const dist = Math.abs(slideCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "x mandatory";
      // snap to nearest slide and keep auto-scroll in sync with where we land
      index = nearestIndex();
      goTo(index);
    };

    // suppress click after a drag so labels/links don't fire
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointerleave", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("wheel", pause, { passive: true });

    return () => {
      clearInterval(timer);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointerleave", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
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
        cursor: "grab",
        touchAction: "pan-x",
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
            draggable={false}
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
    <section id="campus" style={{ marginBottom: SECTION_GAP }}>
      <h2 style={H2_STYLE}>Sherwood School</h2>

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
