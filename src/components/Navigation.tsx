import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type NavVariant = "full" | "simple" | "gallery";

interface NavigationProps {
  variant?: NavVariant;
  transparent?: boolean;
}

export default function Navigation({
  variant = "full",
  transparent = false,
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const Logo = () => (
    <Link
      to="/"
      className="flex items-center no-underline transition-transform duration-[350ms] hover:scale-110"
      onClick={closeMenu}
    >
      <img
        src="/logo.png"
        alt="NZSOK 로고"
        style={{ height: 44, width: "auto" }}
      />
    </Link>
  );

  if (variant === "simple" || variant === "gallery") {
    return (
      <>
        <nav
          className="fixed top-0 left-0 right-0 z-[100] nav-main flex items-center justify-between"
          style={{
            height: 72,
            background: "rgba(250,247,242,0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #EDE4D3",
          }}
        >
          <Logo />
          <div className="flex items-center gap-4">
            <Link
              to="/"
              style={{
                color: "#4a5f75",
                textDecoration: "none",
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#9278D6")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#4a5f75")}
            >
              <ArrowLeft size={14} /> 홈으로
            </Link>
            {variant === "gallery" && (
              <Link
                to="/admin"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 6,
                  padding: "4px 10px",
                  transition: "color 0.2s",
                }}
              >
                ⚙️ 관리자
              </Link>
            )}
          </div>
        </nav>
      </>
    );
  }

  const navBg = transparent ? "#FAF7F2" : "rgba(250,247,242,0.97)";
  const navBorder = "none";
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
          borderBottom: navBorder,
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
              <Link
                to="/about"
                className="block px-4 py-2 text-base font-medium rounded-md"
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                학교소개
              </Link>
              <div className="dropdown">
                <Link to="/about#intro" onClick={closeMenu}>
                  소개글
                </Link>
                <Link to="/about#hymn" onClick={closeMenu}>
                  교가
                </Link>
                <Link to="/about#history" onClick={closeMenu}>
                  연혁
                </Link>
                <Link to="/about#board" onClick={closeMenu}>
                  이사회
                </Link>
                <Link to="/about#staff" onClick={closeMenu}>
                  교직원
                </Link>
              </div>
            </li>
            <li>
              <Link
                to="/education"
                className="block px-4 py-2 text-base font-medium rounded-md"
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                교육
              </Link>
              <div className="dropdown">
                <Link to="/education#schedule" onClick={closeMenu}>
                  시간표
                </Link>
                <Link to="/education#programs" onClick={closeMenu}>
                  커리큘럼
                </Link>
                <Link to="/education#annual" onClick={closeMenu}>
                  연간 교육계획
                </Link>
                <Link to="/education#campus" onClick={closeMenu}>
                  Sherwood School
                </Link>
              </div>
            </li>
            <li>
              <Link
                to="/media"
                className="block px-4 py-2 text-base font-medium rounded-md"
                style={{
                  color: linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                알림마당
              </Link>
              <div className="dropdown">
                <Link to="/media#album" onClick={closeMenu}>
                  앨범
                </Link>
                <Link to="/media#instagram" onClick={closeMenu}>
                  인스타그램
                </Link>
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
          <Link
            to="/enrol"
            className="btn-primary hidden md:block text-sm font-bold rounded-lg no-underline"
            style={{ padding: "9px 20px" }}
          >
            입학안내
          </Link>
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
              ],
            },
            {
              header: "교육",
              headerTo: "/education",
              links: [
                { to: "/education#schedule", label: "시간표" },
                { to: "/education#programs", label: "커리큘럼" },
                { to: "/education#annual", label: "연간 교육계획" },
                { to: "/education#campus", label: "Sherwood School" },
              ],
            },
            {
              header: "알림마당",
              headerTo: "/media",
              links: [
                { to: "/media#album", label: "앨범" },
                { to: "/media#instagram", label: "인스타그램" },
              ],
            },
          ].map(({ header, headerTo, links }) => (
            <div key={header} className="mobile-menu-section">
              <Link
                to={headerTo}
                onClick={closeMenu}
                className="mobile-menu-header"
              >
                {header}
              </Link>
              <div className="flex flex-col gap-0.5">
                {links.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className="mobile-menu-link"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile floating CTA */}
      <Link
        to="/enrol"
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
      </Link>
    </>
  );
}
