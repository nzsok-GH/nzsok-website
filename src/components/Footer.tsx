import { Link } from 'react-router-dom'

type FooterVariant = 'full' | 'minimal' | 'about'

interface FooterProps {
  variant?: FooterVariant
}

export default function Footer({ variant = 'full' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer style={{ background: '#060f1a', color: 'rgba(255,255,255,0.45)', padding: '40px 48px 28px' }}>
        <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
          <p style={{ fontSize: 12 }}>Copyright © 2012–2026 NZSOK. All rights reserved.</p>
          <p style={{ fontSize: 12 }}>
            40 Sartors Avenue, Browns Bay, Auckland 0630, NZ &nbsp;|&nbsp;{' '}
            <a href="mailto:admin@nzsok.school.nz" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              admin@nzsok.school.nz
            </a>
          </p>
        </div>
      </footer>
    )
  }

  if (variant === 'about') {
    return (
      <footer style={{ background: '#0d2340', color: 'rgba(255,255,255,0.7)', padding: '64px 48px 32px' }}>
        <div className="max-w-[1100px] mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 44, height: 44,
                  background: '#c8973a',
                  borderRadius: '50%',
                  fontFamily: "'Noto Serif KR', serif",
                  fontWeight: 900,
                  fontSize: 16,
                  color: '#0d2340',
                }}
              >
                한
              </div>
              <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                뉴질랜드 한민족 한글학교
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.8 }}>
                New Zealand School of Korea (NZSOK)<br />
                40 Sartors Avenue, Browns Bay, Auckland 0630<br />
                뉴질랜드 오클랜드 한인 한국어 교육기관
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>학교소개</h4>
              <ul className="list-none flex flex-col gap-2">
                {[['#intro','소개글'],['#purpose','설립 취지'],['#staff','교직원 소개'],['#hymn','학교 교가'],['#history','학교 연혁'],['#board','이사회']].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>바로가기</h4>
              <ul className="list-none flex flex-col gap-2">
                <li><Link to="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>홈</Link></li>
                <li><Link to="/#programs" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>교육과정</Link></li>
                <li><Link to="/gallery" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>학교앨범</Link></li>
                <li><Link to="/admission" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>입학안내</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span>Copyright © 2012–2026 NZSOK. All rights reserved.</span>
            <span>40 Sartors Avenue, Browns Bay, Auckland 0630, NZ</span>
          </div>
        </div>
      </footer>
    )
  }

  // Full footer (home page)
  return (
    <footer style={{ background: '#060f1a', color: 'rgba(255,255,255,0.5)', padding: '60px 48px 32px' }}>
      <div className="max-w-[1200px] mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 32 }}>
          <div>
            <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              뉴질랜드 한민족 한글학교
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              긍정적인 생활태도와 이중문화 소유자를 키우는 한글학교. 1997년부터 뉴질랜드 오클랜드에서 운영 중입니다.
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://www.facebook.com/newzealandschoolofkorea/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-base transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                }}
                title="Facebook"
              >
                f
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
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>
                {title}
              </h4>
              <ul className="list-none flex flex-col gap-2">
                {links.map(([href, label]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs flex-wrap gap-2">
          <span>Copyright © 2012–2026 NZSOK. All rights reserved.</span>
          <span>40 Sartors Avenue, Browns Bay, Auckland 0630, NZ</span>
        </div>
      </div>
    </footer>
  )
}
