import { Link } from 'react-router-dom'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

type FooterVariant = 'full' | 'minimal' | 'about'

interface FooterProps {
  variant?: FooterVariant
}

export default function Footer({ variant = 'full' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer style={{ background: '#EDE4D3', padding: '40px 48px 28px' }}>
        <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
          <p style={{ fontSize: 12, color: '#8a9ab0' }}>Copyright © 2012–2026 NZSOK. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#8a9ab0' }}>
            40 Sartors Avenue, Browns Bay, Auckland 0630, NZ &nbsp;|&nbsp;{' '}
            <a href="mailto:admin@nzsok.school.nz" style={{ color: '#9278D6', textDecoration: 'none' }}>
              admin@nzsok.school.nz
            </a>
          </p>
        </div>
      </footer>
    )
  }

  if (variant === 'about') {
    return (
      <footer style={{ background: '#E8E0F7', padding: '64px 48px 32px' }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 44, height: 44,
                  background: '#9278D6',
                  borderRadius: '50%',
                  fontFamily: "'SUIT', sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  color: '#fff',
                }}
              >
                한
              </div>
              <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 8 }}>
                뉴질랜드 한민족 한글학교
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#4a5f75' }}>
                New Zealand School of Korea (NZSOK)<br />
                40 Sartors Avenue, Browns Bay, Auckland 0630<br />
                뉴질랜드 오클랜드 한인 한국어 교육기관
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9278D6', marginBottom: 16 }}>학교소개</h4>
              <ul className="list-none flex flex-col gap-2">
                {[['#intro','소개글'],['#purpose','설립 취지'],['#staff','교직원 소개'],['#hymn','학교 교가'],['#history','학교 연혁'],['#board','이사회']].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} style={{ fontSize: 13, color: '#4a5f75', textDecoration: 'none', transition: 'color 0.2s' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9278D6', marginBottom: 16 }}>바로가기</h4>
              <ul className="list-none flex flex-col gap-2">
                <li><Link to="/" style={{ fontSize: 13, color: '#4a5f75', textDecoration: 'none' }}>홈</Link></li>
                <li><Link to="/#programs" style={{ fontSize: 13, color: '#4a5f75', textDecoration: 'none' }}>교육과정</Link></li>
                <li><Link to="/gallery" style={{ fontSize: 13, color: '#4a5f75', textDecoration: 'none' }}>학교앨범</Link></li>
                <li><Link to="/admission" style={{ fontSize: 13, color: '#4a5f75', textDecoration: 'none' }}>입학안내</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8a9ab0' }}>
            <span>Copyright © 2012–2026 NZSOK. All rights reserved.</span>
            <span>40 Sartors Avenue, Browns Bay, Auckland 0630, NZ</span>
          </div>
        </div>
      </footer>
    )
  }

  // Full footer (home page)
  return (
    <footer style={{ background: '#EDE4D3', padding: '60px 48px 32px' }}>
      <div className="max-w-[1200px] mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <div>
            <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 18, fontWeight: 700, color: '#1c2b3a', marginBottom: 8 }}>
              뉴질랜드 한민족 한글학교
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#4a5f75', marginBottom: 20 }}>
              긍정적인 생활태도와 이중문화 소유자를 키우는 한글학교. 1997년부터 뉴질랜드 오클랜드에서 운영 중입니다.
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/nzsok.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                style={{
                  background: 'rgba(146,120,214,0.1)',
                  color: '#9278D6',
                  border: '1px solid rgba(146,120,214,0.2)',
                  textDecoration: 'none',
                }}
                title="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
            </div>
          </div>
          {[
            {
              title: '학교소개',
              links: [
                ['/about#intro', '소개글'],
                ['/about#purpose', '학교 설립 취지'],
                ['/about#hymn', '학교 교가'],
                ['/about#history', '학교 연혁'],
                ['/about#board', '이사회'],
                ['/about#staff', '교직원 소개'],
              ],
            },
            {
              title: '교육',
              links: [
                ['/#schedule', '수업 시간'],
                ['/#programs', '커리큘럼'],
                ['/#annual', '연간 교육계획'],
              ],
            },
            {
              title: '안내',
              links: [
                ['/gallery', '알림마당'],
                ['/gallery', '공지사항'],
                ['/admission', '입학안내'],
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9278D6', marginBottom: 16 }}>
                {title}
              </h4>
              <ul className="list-none flex flex-col gap-2">
                {links.map(([href, label]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{ color: '#4a5f75', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs flex-wrap gap-2" style={{ color: '#8a9ab0' }}>
          <span>Copyright © 2012–2026 NZSOK. All rights reserved.</span>
          <span>40 Sartors Avenue, Browns Bay, Auckland 0630, NZ</span>
        </div>
      </div>
    </footer>
  )
}
