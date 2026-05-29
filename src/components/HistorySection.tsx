import { useRef, useEffect } from "react";

const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)" as const,
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
};

const HISTORY = [
  {
    date: "1997. 8. 23",
    title: "학교 설립",
    body: "이사장 임충선, 초대 교장 윤홍기, 교감 김진기 취임",
  },
  {
    date: "1997. 10. 18",
    title: "개교",
    body: "Ponsonby Intermediate School",
  },
  {
    date: "1999. 1. 30",
    title: "학교 이전",
    body: "St. Mary's School",
  },
  { date: "2001. 1", title: "김종연 교감 취임", body: "" },
  { date: "2004. 10", title: "조상철 중등교감 취임", body: "" },
  { date: "2005. 1", title: "이명점 교감 취임", body: "" },
  { date: "2007. 2", title: "전임례 교감 취임", body: "" },
  {
    date: "2008. 2",
    title: "제2대 전임례 교장 · 김종연 중등부 교감 · 김진미 초등부 교감 취임",
    body: "",
  },
  { date: "2008. 5", title: "유승재 이사회 의장 취임", body: "" },
  { date: "2009. 2", title: "외국인 한국어반 개설", body: "" },
  { date: "2010. 10", title: "교가 제정", body: "" },
  { date: "2011. 4", title: "제3대 김종연 교장 취임", body: "" },
  { date: "2013. 1", title: "박은경 이사 취임", body: "" },
  { date: "2014. 2", title: "김난희 교감 취임", body: "" },
  { date: "2014. 8", title: "Stuart Johns 이사 취임", body: "" },
  { date: "2017. 2", title: "제4대 정은영 교장 취임", body: "" },
  {
    date: "2017. 9",
    title: "개교 20주년 예술제",
    body: "Rosmini College",
  },
  {
    date: "2018. 2",
    title: "학교 이전",
    body: "Sherwood School",
  },
  { date: "2018. 7", title: "김미경 중등교감 취임", body: "" },
  { date: "2018. 9", title: "정창민 이사 취임", body: "" },
  {
    date: "2019. 12. 7",
    title: "제5대 김난희 교장 · 김미경 교감 · 정한진 교감 취임",
    body: "",
  },
  {
    date: "2023. 2",
    title: "장우리 교감 · 김정근 이사회 의장 취임",
    body: "",
  },
  {
    date: "2023. 12. 9",
    title: "제6대 김현정 교장 취임",
    body: "",
  },
  { date: "2026. 2", title: "노재회 이사회 의장 취임", body: "" },
];

export default function HistorySection() {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = historyRef.current;
    if (!el) return;
    let raf: number;
    let paused = false;
    const tick = () => {
      if (!paused && el.scrollLeft < el.scrollWidth - el.clientWidth)
        el.scrollLeft += 0.5;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section id="history" style={{ marginBottom: 80 }}>
      <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>연혁</h2>

      <div
        ref={historyRef}
        className="history-scroll"
        style={{
          overflowX: "auto",
          overflowY: "visible",
          paddingTop: 8,
          paddingBottom: 8,
          margin: "0 -4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
            minWidth: "max-content",
            padding: "0 4px",
          }}
        >
          {/* track line — vertically centred on the dot */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: 0,
              right: 0,
              height: 1.5,
              background: "rgba(44,82,130,0.18)",
              zIndex: 0,
            }}
          />

          {HISTORY.map((item) => (
            <div
              key={item.date}
              style={{
                width: 200,
                flexShrink: 0,
                paddingRight: 24,
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* dot — sits on the track */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#9278D6",
                  border: "2px solid #FDFCFA",
                  boxShadow: "0 0 0 2px rgba(146,120,214,0.25)",
                  marginBottom: 14,
                }}
              />
              {/* date */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#9278D6",
                  letterSpacing: "0.04em",
                  marginBottom: 5,
                  whiteSpace: "nowrap",
                }}
              >
                {item.date}
              </p>
              {/* title */}
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1c2b3a",
                  lineHeight: 1.5,
                  marginBottom: item.body ? 5 : 0,
                }}
              >
                {item.title.split(" · ").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
              {/* body */}
              {item.body && (
                <p
                  style={{
                    fontSize: 13,
                    color: "#8a9ab0",
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
