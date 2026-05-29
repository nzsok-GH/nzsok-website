import { useState } from "react";

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const Logo = () => (
    <a
      href="/"
      className="flex items-center no-underline transition-transform duration-[350ms] hover:scale-110"
      onClick={closeMenu}
    >
      <img
        src="/logo.png"
        alt="NZSOK 로고"
        style={{ height: 44, width: "auto" }}
      />
    </a>
  );

  const navBg = transparent ? "#FAF7F2" : "rgba(250,247,242,0.97)";
  const linkColor = transparent ? "#1c2b3a" : "#4a5f75";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] grid nav-main"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          height: 72,
          background: navBg,
          backdropFilter: transparent ? undefined : "blur(12px)",
          borderBottom: "none",
        }}
      >
        {/* Left: hamburger (mobile) + nav links (desktop) */}
        <div
          className="flex items-center justify-start"
          style={{ gridColumn: 1 }}
        >
          <button
            className={`nav-hamburger md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border-0 cursor-pointer p-1 rounded-lg ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <span
              style={{ background: transparent ? "#1c2b3a" : "var(--text)" }}
            />
            <span
              style={{ background: transparent ? "#1c2b3a" : "var(--text)" }}
            />
            <span
              style={{ background: transparent ? "#1c2b3a" : "var(--text)" }}
            />
          </button>
          <ul className="nav-links hidden md:flex items-center gap-8 list-none">
            <li>
              <a
                href="/about"
                className="block px-4 py-2 text-base font-medium rounded-md"
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                학교소개
              </a>
              <div className="dropdown">
                <a href="/about#intro" onClick={closeMenu}>
                  소개글
                </a>
                <a href="/about#hymn" onClick={closeMenu}>
                  교가
                </a>
                <a href="/about#history" onClick={closeMenu}>
                  연혁
                </a>
                <a href="/about#board" onClick={closeMenu}>
                  이사회
                </a>
                <a href="/about#staff" onClick={closeMenu}>
                  교직원
                </a>
                <a href="/about#campus" onClick={closeMenu}>
                  Sherwood School
                </a>
              </div>
            </li>
            <li>
              <a
                href="/education"
                className="block px-4 py-2 text-base font-medium rounded-md"
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                교육
              </a>
              <div className="dropdown">
                <a href="/education#schedule" onClick={closeMenu}>
                  시간표
                </a>
                <a href="/education#programs" onClick={closeMenu}>
                  커리큘럼
                </a>
                <a href="/education#annual" onClick={closeMenu}>
                  연간 교육계획
                </a>
                <a href="/education#classdojo" onClick={closeMenu}>
                  클래스도조
                </a>
              </div>
            </li>
            <li>
              <a
                href="/media"
                className="block px-4 py-2 text-base font-medium rounded-md"
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                알림마당
              </a>
              <div className="dropdown">
                <a href="/media#instagram" onClick={closeMenu}>
                  인스타그램
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Center: logo */}
        <div
          className="flex items-center justify-center"
          style={{ gridColumn: 2 }}
        >
          <Logo />
        </div>

        {/* Right: admission button (desktop only) */}
        <div
          className="flex items-center justify-end"
          style={{ gridColumn: 3 }}
        >
          <a
            href="/enrol"
            className="btn-primary hidden md:block text-sm font-bold rounded-lg no-underline"
            style={{ padding: "9px 20px" }}
          >
            입학안내
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="flex flex-col px-5 py-2 max-h-[calc(100vh-72px)] overflow-y-auto">
          {[
            {
              header: "학교소개",
              headerTo: "/about",
              links: [
                { to: "/about#intro", label: "소개글" },
                { to: "/about#hymn", label: "교가" },
                { to: "/about#history", label: "연혁" },
                { to: "/about#board", label: "이사회" },
                { to: "/about#staff", label: "교직원" },
                { to: "/about#campus", label: "Sherwood School" },
              ],
            },
            {
              header: "교육",
              headerTo: "/education",
              links: [
                { to: "/education#schedule", label: "시간표" },
                { to: "/education#programs", label: "커리큘럼" },
                { to: "/education#annual", label: "연간 교육계획" },
                { to: "/education#classdojo", label: "클래스도조" },
              ],
            },
            {
              header: "알림마당",
              headerTo: "/media",
              links: [{ to: "/media#instagram", label: "인스타그램" }],
            },
          ].map(({ header, headerTo, links }) => (
            <div key={header} className="mobile-menu-section">
              <a href={headerTo} onClick={closeMenu} className="mobile-menu-header">
                {header}
              </a>
              <div className="flex flex-col gap-0.5">
                {links.map(({ to, label }) => (
                  <a
                    key={to}
                    href={to}
                    onClick={closeMenu}
                    className="mobile-menu-link"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile floating CTA */}
      <a
        href="/enrol"
        onClick={closeMenu}
        className="btn-primary md:hidden fixed z-[90] text-sm font-bold no-underline"
        style={{
          bottom: "max(24px, env(safe-area-inset-bottom))",
          right: 20,
          borderRadius: 999,
          padding: "13px 28px",
        }}
      >
        입학안내
      </a>
    </>
  );
}
