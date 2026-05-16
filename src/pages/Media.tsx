import { useState, useEffect, useCallback } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionTabs from "../components/SectionTabs";
import { Album, FilterCategory } from "../types/album";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id": string },
        HTMLElement
      >;
    }
  }
}

const SECTIONS = [
  { id: "album", label: "앨범" },
  { id: "instagram", label: "인스타그램" },
];

const CATEGORIES: Record<string, string> = {
  graduation: "🎓 졸업식",
  event: "🎉 학교 행사",
  class: "📚 수업 활동",
  culture: "🎨 문화 체험",
  performance: "🏅 발표회",
  other: "📷 기타",
};

const EMOJIS: Record<string, string> = {
  graduation: "🎓",
  event: "🎉",
  class: "📚",
  culture: "🎨",
  performance: "🏅",
  other: "📷",
};

const SAMPLE_ALBUMS: Album[] = [
  {
    title: "2024년 졸업식",
    date: "2024-11-30",
    category: "graduation",
    cover: null,
    published: true,
    slug: "2024-11-30-graduation",
    description: "2024년 한 해를 마무리하는 졸업식이 성황리에 열렸습니다.",
    photos: [
      { image: null, caption: "졸업식 전체 사진" },
      { image: null, caption: "졸업생들과 선생님" },
      { image: null, caption: "상장 수여식" },
    ],
  },
  {
    title: "추석 문화 체험",
    date: "2024-09-14",
    category: "culture",
    cover: null,
    published: true,
    slug: "2024-09-14-chuseok",
    description: "추석을 맞아 송편 만들기와 한복 입기 체험을 진행했습니다.",
    photos: [
      { image: null, caption: "송편 만들기" },
      { image: null, caption: "한복 입기 체험" },
    ],
  },
  {
    title: "2024 발표회",
    date: "2024-06-22",
    category: "performance",
    cover: null,
    published: true,
    slug: "2024-06-22-performance",
    description:
      "1학기 마무리 발표회. 학생들이 한 학기 동안 배운 것들을 발표했습니다.",
    photos: [
      { image: null, caption: "1학기 발표회" },
      { image: null, caption: "노래 발표" },
      { image: null, caption: "시 낭송" },
      { image: null, caption: "단체 사진" },
    ],
  },
  {
    title: "신입생 환영회",
    date: "2024-02-10",
    category: "event",
    cover: null,
    published: true,
    slug: "2024-02-10-welcome",
    description: "새 학년 신입생들을 환영하는 자리였습니다.",
    photos: [{ image: null, caption: "환영 행사" }],
  },
  {
    title: "한국어 수업 활동",
    date: "2023-08-19",
    category: "class",
    cover: null,
    published: true,
    slug: "2023-08-19-class",
    description: "열심히 공부하는 학생들의 수업 장면입니다.",
    photos: [
      { image: null, caption: "수업 장면" },
      { image: null, caption: "그룹 활동" },
    ],
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getYear(dateStr: string) {
  return new Date(dateStr).getFullYear();
}

interface LightboxState {
  album: Album;
  photoIdx: number;
}

const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)" as const,
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
};

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    fetch("/albums.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setAlbums)
      .catch(() => setAlbums(SAMPLE_ALBUMS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = albums.filter(
    (a) => a.published !== false && (filter === "all" || a.category === filter),
  );

  const byYear: Record<number, Album[]> = {};
  filtered.forEach((a) => {
    const y = getYear(a.date);
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(a);
  });
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  const openLightbox = (album: Album) => setLightbox({ album, photoIdx: 0 });
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(
    () =>
      setLightbox((lb) =>
        lb && lb.photoIdx > 0 ? { ...lb, photoIdx: lb.photoIdx - 1 } : lb,
      ),
    [],
  );
  const nextPhoto = useCallback(
    () =>
      setLightbox((lb) =>
        lb && lb.photoIdx < lb.album.photos.length - 1
          ? { ...lb, photoIdx: lb.photoIdx + 1 }
          : lb,
      ),
    [],
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto]);

  return (
    <div>
      <Navigation variant="full" />
      <SectionTabs tabs={SECTIONS} />

      <main className="media-main">
        {/* ── 앨범 ────────────────────────────────── */}
        <section id="album">
          <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
            <div>
              <h2 style={{ ...H2_STYLE }}>앨범</h2>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              {(
                [
                  ["all", "전체"],
                  ["graduation", "졸업식"],
                  ["event", "학교 행사"],
                  ["class", "수업 활동"],
                  ["culture", "문화 체험"],
                  ["performance", "발표회"],
                ] as [FilterCategory, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor:
                      filter === val ? "#9278D6" : "rgba(0,0,0,0.12)",
                    background: filter === val ? "#E8E0F7" : "transparent",
                    color: filter === val ? "#9278D6" : "#4a5f75",
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div
              className="text-center py-20"
              style={{ color: "#4a5f75", fontSize: 16 }}
            >
              앨범을 불러오는 중...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div style={{ fontSize: 64, marginBottom: 20 }}>📷</div>
              <h3
                style={{
                  fontFamily: "'SUIT', sans-serif",
                  fontSize: 24,
                  color: "#1c2b3a",
                }}
              >
                아직 앨범이 없어요
              </h3>
            </div>
          ) : (
            years.map((year) => (
              <div key={year} style={{ marginBottom: 64 }}>
                <div className="flex items-center gap-4 mb-7">
                  <span
                    style={{
                      fontFamily: "'SUIT', sans-serif",
                      fontSize: 30,
                      fontWeight: 900,
                      color: "#1c2b3a",
                    }}
                  >
                    {year}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: "rgba(0,0,0,0.08)",
                    }}
                  />
                  <span
                    style={{ fontSize: 13, color: "#8a9ab0", fontWeight: 500 }}
                  >
                    앨범 {byYear[year].length}개
                  </span>
                </div>
                <div className="album-grid">
                  {byYear[year].map((album) => (
                    <a
                      key={album.slug}
                      href="#"
                      className="album-card block rounded-2xl overflow-hidden no-underline"
                      style={{
                        background: "#FAF7F2",
                        border: "1px solid rgba(0,0,0,0.07)",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        openLightbox(album);
                      }}
                    >
                      <div
                        className="album-thumb relative"
                        style={{ aspectRatio: "4/3", overflow: "hidden" }}
                      >
                        {album.cover ? (
                          <img
                            src={album.cover}
                            alt={album.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex flex-col items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg,#D0BFEF,#E8E0F7)",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 40,
                                marginBottom: 8,
                                opacity: 0.6,
                              }}
                            >
                              {EMOJIS[album.category] || "📷"}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "rgba(146,120,214,0.7)",
                              }}
                            >
                              {album.title}
                            </div>
                          </div>
                        )}
                        {album.photos.length > 0 && (
                          <span
                            className="absolute top-3 right-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              background: "rgba(146,120,214,0.85)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            📸 {album.photos.length}장
                          </span>
                        )}
                        <span
                          className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md"
                          style={{
                            background: "rgba(146,120,214,0.9)",
                            color: "#fff",
                          }}
                        >
                          {CATEGORIES[album.category] || "기타"}
                        </span>
                      </div>
                      <div style={{ padding: "18px 20px" }}>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#8a9ab0",
                            marginBottom: 5,
                          }}
                        >
                          {formatDate(album.date)}
                        </div>
                        <div
                          style={{
                            fontFamily: "'SUIT', sans-serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#1c2b3a",
                            marginBottom: 5,
                            lineHeight: 1.4,
                          }}
                        >
                          {album.title}
                        </div>
                        {album.description && (
                          <div
                            className="album-desc"
                            style={{
                              fontSize: 15,
                              color: "#4a5f75",
                              lineHeight: 1.6,
                            }}
                          >
                            {album.description}
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}

          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <a
              href="/admin/"
              style={{
                color: "#c4cdd6",
                fontSize: 13,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#9278D6")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#c4cdd6")}
            >
              ⚙️ 관리자 페이지 (앨범 등록/수정)
            </a>
          </div>
        </section>

        {/* ── 인스타그램 ──────────────────────────────── */}
        <section id="instagram" style={{ marginTop: 96 }}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-20">
            <h2 style={{ ...H2_STYLE }}>인스타그램</h2>
            <a
              href="https://www.instagram.com/nzsok.official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 no-underline"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#9278D6",
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
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
          {/* Replace YOUR_FEED_ID after connecting @nzsok.official at behold.so */}
          <behold-widget feed-id="YOUR_FEED_ID" />
        </section>
      </main>

      <Footer />

      {/* ── LIGHTBOX ──────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          style={{
            background: "rgba(244,241,252,0.96)",
            backdropFilter: "blur(8px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div
            className="lightbox-inner lightbox-grid bg-white rounded-3xl overflow-hidden w-full"
          >
            <div
              className="lightbox-image-pane relative flex items-center justify-center"
              style={{ background: "#000", minHeight: 400 }}
            >
              {lightbox.album.photos[lightbox.photoIdx]?.image ? (
                <img
                  src={lightbox.album.photos[lightbox.photoIdx].image!}
                  alt={
                    lightbox.album.photos[lightbox.photoIdx].caption ||
                    lightbox.album.title
                  }
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div className="flex items-center justify-center text-5xl opacity-30">
                  📷
                </div>
              )}
              {lightbox.photoIdx > 0 && (
                <button
                  className="absolute flex items-center justify-center rounded-full cursor-pointer"
                  style={{
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 44,
                    height: 44,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: 18,
                  }}
                  onClick={prevPhoto}
                  aria-label="이전 사진"
                >
                  ‹
                </button>
              )}
              {lightbox.photoIdx < lightbox.album.photos.length - 1 && (
                <button
                  className="absolute flex items-center justify-center rounded-full cursor-pointer"
                  style={{
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 44,
                    height: 44,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: 18,
                  }}
                  onClick={nextPhoto}
                  aria-label="다음 사진"
                >
                  ›
                </button>
              )}
              <div
                className="absolute left-1/2 -translate-x-1/2 text-xs px-3.5 py-1 rounded-full"
                style={{
                  bottom: 16,
                  background: "rgba(0,0,0,0.6)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {lightbox.photoIdx + 1} / {lightbox.album.photos.length}
              </div>
            </div>

            <div
              className="lightbox-info-pane flex flex-col overflow-y-auto"
              style={{ padding: "36px 32px" }}
            >
              <button
                className="self-end flex items-center justify-center rounded-full mb-6 cursor-pointer"
                style={{
                  width: 36,
                  height: 36,
                  background: "#F5EFE3",
                  border: "none",
                  fontSize: 18,
                  color: "#1c2b3a",
                }}
                onClick={closeLightbox}
                aria-label="닫기"
              >
                ✕
              </button>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9278D6",
                  marginBottom: 8,
                }}
              >
                {CATEGORIES[lightbox.album.category] || ""}
              </div>
              <h2
                style={{
                  fontFamily: "'SUIT', sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#1c2b3a",
                  marginBottom: 8,
                  lineHeight: 1.35,
                }}
              >
                {lightbox.album.title}
              </h2>
              <p style={{ fontSize: 14, color: "#4a5f75", marginBottom: 16 }}>
                {formatDate(lightbox.album.date)}
              </p>
              {lightbox.album.description && (
                <p
                  style={{
                    fontSize: 16,
                    color: "#4a5f75",
                    lineHeight: 1.75,
                    marginBottom: 24,
                    flex: 1,
                  }}
                >
                  {lightbox.album.description}
                </p>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 8,
                }}
              >
                {lightbox.album.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="cursor-pointer rounded-lg overflow-hidden"
                    style={{
                      aspectRatio: "1",
                      border: `2px solid ${i === lightbox.photoIdx ? "#9278D6" : "transparent"}`,
                      transition: "all 0.15s",
                    }}
                    onClick={() =>
                      setLightbox((lb) => (lb ? { ...lb, photoIdx: i } : lb))
                    }
                  >
                    {photo.image ? (
                      <img
                        src={photo.image}
                        alt={photo.caption || ""}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-lg"
                        style={{ background: "#D0BFEF" }}
                      >
                        📷
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
