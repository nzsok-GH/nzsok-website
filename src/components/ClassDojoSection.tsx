import { useEffect, useRef, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { H2_STYLE, SECTION_GAP } from "../lib/styles";

const CLASSDOJO_IMAGES = [
  { src: "/classdojo/post1.jpg", width: 1206, height: 1435 },
  { src: "/classdojo/post2.jpg", width: 1206, height: 1633 },
  { src: "/classdojo/post3.jpg", width: 1206, height: 1510 },
  { src: "/classdojo/post4.jpg", width: 1206, height: 1654 },
];

function ClassDojoCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % CLASSDOJO_IMAGES.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 340,
        aspectRatio: "1206/1435",
        borderRadius: 16,
        overflow: "hidden",
        border: "4px solid #fff",
        outline: "1px solid rgba(0,0,0,0.06)",
        background: "#fff",
        boxShadow: "none",
      }}
    >
      {CLASSDOJO_IMAGES.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={`클래스도조 게시물 ${i + 1}`}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
        />
      ))}
    </div>
  );
}

function ClassDojoSectionInner() {
  return (
    <section id="classdojo" style={{ marginTop: SECTION_GAP }}>
      <h2 style={H2_STYLE}>클래스도조</h2>

      <div
        style={{
          display: "flex",
          gap: 56,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <ClassDojoCarousel />

        <div style={{ flex: 1, minWidth: 260 }}>
          <p
            style={{
              fontSize: 15,
              color: "#4a5f75",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            클래스도조는 학부모님과 학교를 연결하는 온라인 플랫폼입니다. 담임
            선생님들은 매 수업 후 사진과 함께 수업 소식을 게시하며, 반별
            공지사항과 학교 전체 공지사항도 함께 안내됩니다.
          </p>

          <p
            style={{
              fontSize: 14,
              color: "#8a9ab0",
              lineHeight: 1.75,
              marginBottom: 24,
            }}
          >
            입학 시 발급되는 학급 초대 코드로 iOS 및 Android 앱을 사용하실 수
            있습니다.
          </p>

          <a
            href="https://www.classdojo.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", transition: "opacity 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <img
              src="/classdojo/classdojo-logo.svg"
              alt="ClassDojo"
              loading="lazy"
              decoding="async"
              style={{ height: 64, width: "auto", display: "block" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ClassDojoSection() {
  return (
    <ErrorBoundary name="ClassDojoSection">
      <ClassDojoSectionInner />
    </ErrorBoundary>
  );
}
