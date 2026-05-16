import { Link } from "react-router-dom";

const NAV = [
  {
    title: "학교소개",
    links: [
      ["/about#intro", "소개글"],
      ["/about#hymn", "교가"],
      ["/about#history", "연혁"],
      ["/about#board", "이사회"],
      ["/about#staff", "교직원"],
    ],
  },
  {
    title: "교육",
    links: [
      ["/education#schedule", "시간표"],
      ["/education#programs", "커리큘럼"],
      ["/education#annual", "연간 교육계획"],
      ["/education#campus", "Sherwood School"],
    ],
  },
  {
    title: "알림마당",
    links: [
      ["/media#album", "앨범"],
      ["/media#instagram", "인스타그램"],
    ],
  },
  {
    title: "입학안내",
    links: [
      ["/enrol#procedure", "등록 절차"],
      ["/enrol#tuition", "학비"],
      ["/enrol#contact", "입학 문의"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid">
          {/* Section 1: Brand */}
          <div className="footer-brand">
            <Link
              to="/"
              style={{
                display: "inline-block",
                marginBottom: 16,
                textDecoration: "none",
              }}
            >
              <img
                src="/logo.png"
                alt="NZSOK 로고"
                style={{ height: 48, width: "auto" }}
              />
            </Link>
            <h3
              style={{
                fontFamily: "'SUIT', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#1c2b3a",
                marginBottom: 6,
              }}
            >
              뉴질랜드 한민족 한글학교
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "#4a5f75",
                marginBottom: 0,
              }}
            >
              New Zealand School of Korea (NZSOK)
              <br />
              40 Sartors Avenue, Browns Bay, Auckland 0630
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#8a9ab0",
                marginTop: 24,
                marginBottom: 0,
              }}
            >
              © 2012–2026 NZSOK
            </p>
          </div>

          {/* Section 2: Sitemap */}
          <div className="footer-sitemap">
            {NAV.map(({ title, links }) => (
              <div key={title}>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9278D6",
                    marginBottom: 16,
                  }}
                >
                  {title}
                </h4>
                <ul className="list-none flex flex-col gap-2">
                  {links.map(([href, label]) => (
                    <li key={label + href}>
                      <Link
                        to={href}
                        style={{
                          fontSize: 15,
                          color: "#4a5f75",
                          textDecoration: "none",
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
