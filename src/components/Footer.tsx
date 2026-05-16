import { Link } from 'react-router-dom'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const NAV = [
  {
    title: '학교소개',
    links: [
      ['/about#intro', '소개글'],
      ['/about#purpose', '학교 설립 취지'],
      ['/about#staff', '교직원 소개'],
      ['/about#hymn', '학교 교가'],
      ['/about#history', '학교 연혁'],
      ['/about#board', '이사회'],
    ],
  },
  {
    title: '교육',
    links: [
      ['/education#schedule', '수업 시간'],
      ['/education#programs', '커리큘럼'],
      ['/education#annual', '연간 교육계획'],
    ],
  },
  {
    title: '안내',
    links: [
      ['/media#notice', '공지사항'],
      ['/media#album', '학교앨범'],
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#E8E0F7', padding: '64px 48px 32px' }}>
      <div className="max-w-[1200px] mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 28 }}>

          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 16, textDecoration: 'none' }}>
              <img src="/logo.png" alt="NZSOK 로고" style={{ height: 48, width: 'auto' }} />
            </Link>
            <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 6 }}>
              뉴질랜드 한민족 한글학교
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: '#4a5f75', marginBottom: 20 }}>
              New Zealand School of Korea (NZSOK)<br />
              40 Sartors Avenue, Browns Bay, Auckland 0630
            </p>
            <a
              href="https://www.instagram.com/nzsok.official"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#9278D6', textDecoration: 'none' }}
              title="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>

          {/* Sitemap columns */}
          {NAV.map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9278D6', marginBottom: 16 }}>
                {title}
              </h4>
              <ul className="list-none flex flex-col gap-2">
                {links.map(([href, label]) => (
                  <li key={label + href}>
                    <Link to={href} style={{ fontSize: 13, color: '#4a5f75', textDecoration: 'none' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2" style={{ fontSize: 12, color: '#8a9ab0' }}>
          <span>Copyright © 2012–2026 NZSOK. All rights reserved.</span>
          <span>40 Sartors Avenue, Browns Bay, Auckland 0630, NZ</span>
        </div>
      </div>
    </footer>
  )
}
