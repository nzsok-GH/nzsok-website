const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)" as const,
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
};

const HYMN = [
  {
    verse: "1절",
    lines: ["우리 모여 배우자", "씩씩하게 즐겁게", "우리글과 우리말", "우리 자랑 익히자"],
  },
  {
    verse: "2절",
    lines: ["부모님과 선생님", "사랑으로 땀으로", "우리들을 가르쳐", "대한민국 빛내네"],
  },
  {
    verse: "3절",
    lines: ["넓은 세계 우리것", "맘껏 배워 힘키워", "우리나라 힘키워", "모든나라 벗 삼자"],
  },
];

const BOARD = [
  { name: "노재회", role: "이사회 의장" },
  { name: "김보연", role: "이사" },
  { name: "정창민", role: "이사" },
  { name: "김정근", role: "이사" },
  { name: "김아름", role: "이사" },
];

const STAFF = [
  {
    dept: "교장단",
    staff: [
      { name: "김현정", label: "교장" },
      { name: "장우리", label: "교감" },
    ],
  },
  {
    dept: "유치부",
    staff: [
      { name: "유은경", label: "다람쥐 1반" },
      { name: "강수진", label: "다람쥐 2반" },
      { name: "심성미", label: "개나리 1반" },
      { name: "임마리", label: "개나리 2반" },
    ],
  },
  {
    dept: "초등부",
    staff: [
      { name: "권영희", label: "1학년 1반" },
      { name: "김민경", label: "1학년 2반" },
      { name: "이옥진", label: "2학년" },
      { name: "조하은", label: "3학년 1반" },
      { name: "조은희", label: "3학년 2반" },
      { name: "최윤우", label: "4학년" },
      { name: "백캐서린", label: "5학년" },
      { name: "장명옥", label: "6학년" },
    ],
  },
  {
    dept: "중등부",
    staff: [
      { name: "홍성룡", label: "1학년" },
      { name: "이계우", label: "2·3학년" },
    ],
  },
  {
    dept: "특강",
    staff: [
      { name: "조하은", label: "미술 1" },
      { name: "엘리 프란시스코", label: "미술 2" },
      { name: "이계우", label: "미술 3" },
      { name: "심성미", label: "미술 4" },
      { name: "권영희", label: "4D 프레임" },
      { name: "루크 바트람", label: "바이올린 1·2" },
      { name: "이건", label: "태권도" },
    ],
  },
];

export function AboutIntroHymn() {
  return (
    <>
      {/* ── 1. 소개글 ─────────────────────────────────── */}
      <section id="intro" style={{ marginBottom: 80 }}>
        <div
          style={{
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "48px 0 0",
          }}
        >
          <p
            style={{
              fontFamily: "'SUIT', sans-serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "#1c2b3a",
              lineHeight: 1.4,
              marginBottom: 20,
            }}
          >
            긍정적인 생활태도와
            <br />
            이중문화 소유자
          </p>
          <div
            style={{
              width: 40,
              height: 2,
              background: "rgba(146,120,214,0.45)",
              borderRadius: 2,
              marginBottom: 18,
            }}
          />
          <p style={{ fontSize: 17, color: "#6b4faa", letterSpacing: "0.04em" }}>
            Think positively and be bicultural
          </p>
        </div>
      </section>

      {/* ── 2. 교가 ────────────────────────────────────── */}
      <section id="hymn" style={{ marginBottom: 80 }}>
        <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>교가</h2>

        <div
          className="rounded-2xl"
          style={{
            background: "rgba(193,220,245,0.3)",
            border: "1px solid rgba(60,120,180,0.3)",
            padding: "40px",
            display: "block",
          }}
        >
          <div className="about-hymn-grid">
            {HYMN.map(({ verse, lines }, colIdx) => (
              <div key={verse} className={colIdx > 0 ? "about-hymn-col-divider" : ""}>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--gray)",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  {verse}
                </p>
                <p style={{ fontSize: 16, lineHeight: 2.2, color: "#4a5f75" }}>
                  {lines.map((l, i) => (
                    <span key={i}>
                      {l}
                      <br />
                    </span>
                  ))}
                  <br />
                  한민족 한글학교
                  <br />
                  오래오래 빛나라
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, textAlign: "right" }}>
            <span style={{ fontSize: 12, color: "#8a9ab0", letterSpacing: "0.05em" }}>
              작곡 박은별 &nbsp;·&nbsp; 작사 유승재
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutBoardStaffCampus() {
  return (
    <>
      {/* ── 4. 이사회 ──────────────────────────────────── */}
      <section id="board" style={{ marginBottom: 80 }}>
        <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>이사회</h2>

        <div className="about-board-grid">
          {BOARD.map(({ name, role }) => (
            <div key={name} style={{ padding: "12px 4px" }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1c2b3a",
                  marginBottom: 3,
                }}
              >
                {name}
              </div>
              <div style={{ fontSize: 14, color: "#4a5f75", fontWeight: 400 }}>{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. 교직원 ─────────────────────────────── */}
      <section id="staff" style={{ marginBottom: 80 }}>
        <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>교직원</h2>

        {STAFF.map(({ dept, staff }) => (
          <div key={dept} style={{ marginBottom: 40 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9278D6",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                paddingBottom: 10,
                marginBottom: 20,
              }}
            >
              {dept}
            </div>
            <div className="about-staff-grid">
              {staff.map(({ name, label }) => (
                <div key={name + label} style={{ padding: "12px 4px" }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1c2b3a",
                      marginBottom: 3,
                    }}
                  >
                    {name}
                  </div>
                  <div style={{ fontSize: 14, color: "#4a5f75", fontWeight: 400 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── 6. Sherwood School ─────────────────────── */}
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
          수업이 진행되는 <strong style={{ color: "#1c2b3a" }}>Sherwood School</strong>은
          브라운스 베이에 위치한 공립 초등학교입니다. 우리 학교는 14개의 교실, 3개의
          놀이터와 강당을 사용하며, 수업 시간 중에는 외부인의 교내 출입이 통제되어 우리
          아이들에게 안전한 학습 환경을 제공합니다.
        </p>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.07)", marginBottom: 16 }}
        >
          <img
            src="/sherwood-school/sherwood-school.png"
            alt="Sherwood School campus"
            width={1910}
            height={891}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 340 }}
          />
        </div>

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
    </>
  );
}
