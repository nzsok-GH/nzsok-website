import { useRef, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SectionTabs from '../components/SectionTabs'

const SECTIONS = [
  { id: 'intro',   label: '소개글' },
  { id: 'hymn',    label: '교가' },
  { id: 'history', label: '연혁' },
  { id: 'board',   label: '이사회' },
  { id: 'staff',   label: '교직원' },
]

const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)' as const,
  fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3,
}

export default function About() {
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = historyRef.current
    if (!el) return
    let raf: number
    let paused = false
    const tick = () => {
      if (!paused && el.scrollLeft < el.scrollWidth - el.clientWidth)
        el.scrollLeft += 0.5
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const pause = () => { paused = true }
    const resume = () => { paused = false }
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <div>
      <Navigation variant="full" />
      <SectionTabs tabs={SECTIONS} />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '140px 48px 120px' }}>

        {/* ── 1. 소개글 ─────────────────────────────────── */}
        <section id="intro" style={{ marginBottom: 80 }}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #ede8f8 0%, #c9b8ec 60%, #b8a8e0 100%)',
              border: '1px solid rgba(146,120,214,0.25)',
              padding: '64px 48px',
              textAlign: 'center',
              marginBottom: 64,
              position: 'relative',
            }}
          >
            {/* decorative circles */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -28, left: -28, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.13)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 24, left: 32, width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />

            <p style={{ position: 'relative', fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#1c2b3a', lineHeight: 1.4, marginBottom: 16 }}>
              긍정적인 생활태도와 이중문화 소유자
            </p>
            <p style={{ position: 'relative', fontSize: 15, color: '#6b4faa', letterSpacing: '0.04em' }}>Think positively and be bicultural</p>
          </div>

          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>한국어와 문화를 미래 세대에게</h2>
          <p style={{ fontSize: 15, color: '#4a5f75', lineHeight: 1.8, marginBottom: 40 }}>
            뉴질랜드에서 자라는 한국계 어린이들이 한국어와 한국 문화를 자연스럽게 습득하고, 두 문화권에서 자신감 있게 성장할 수 있도록 돕는 교육 공동체입니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { icon: '🇰🇷', title: '언어 · 문화 교육', body: '체계적인 한국어 읽기·쓰기·말하기와 함께 전통 문화와 역사를 배웁니다.' },
              { icon: '🌏', title: '이중문화 정체성', body: '뉴질랜드 사회의 일원이면서도 한국인으로서의 자부심을 키웁니다.' },
              { icon: '🤝', title: '한인 커뮤니티', body: '같은 배경을 가진 가족들과 함께 따뜻한 공동체를 이룹니다.' },
              { icon: '📚', title: '체계적 커리큘럼', body: '연령별 맞춤 교재와 레벨별 수업으로 효율적인 학습 환경을 제공합니다.' },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl flex gap-4 items-start"
                style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '20px 24px' }}
              >
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 4 }}>{title}</h4>
                  <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. 교가 ────────────────────────────────────── */}
        <section id="hymn" style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>교가</h2>

          <div
            className="rounded-2xl"
            style={{
              background: '#EDF2F7',
              border: '1px solid rgba(44,82,130,0.15)',
              padding: '40px',
              display: 'block',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 40px' }}>
              {[
                { verse: '1절', lines: ['우리 모여 배우자', '씩씩하게 즐겁게', '우리글과 우리말', '우리 자랑 익히자'] },
                { verse: '2절', lines: ['부모님과 선생님', '사랑으로 땀으로', '우리들을 가르쳐', '대한민국 빛내네'] },
                { verse: '3절', lines: ['넓은 세계 우리것', '맘껏 배워 힘키워', '우리나라 힘키워', '모든나라 벗 삼자'] },
              ].map(({ verse, lines }, colIdx) => (
                <div key={verse} style={{ borderLeft: colIdx > 0 ? '1px solid rgba(44,82,130,0.12)' : 'none', paddingLeft: colIdx > 0 ? 40 : 0 }}>
                  <p style={{ fontSize: 11, color: 'rgba(44,82,130,0.6)', letterSpacing: '0.08em', marginBottom: 8 }}>{verse}</p>
                  <p style={{ fontSize: 14, lineHeight: 2.2, color: '#4a5f75' }}>
                    {lines.map((l, i) => <span key={i}>{l}<br /></span>)}
                    <br />
                    한민족 한글학교<br />오래오래 빛나라
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: '#8a9ab0', letterSpacing: '0.05em' }}>작곡 박은별 &nbsp;·&nbsp; 작사 유승재</span>
            </div>
          </div>
        </section>

        {/* ── 3. 연혁 ────────────────────────────────────── */}
        <section id="history" style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>연혁</h2>

          <div ref={historyRef} className="history-scroll" style={{ overflowX: 'auto', overflowY: 'visible', paddingBottom: 8, margin: '0 -4px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', minWidth: 'max-content', padding: '0 4px' }}>
              {/* track line — vertically centred on the dot */}
              <div style={{ position: 'absolute', top: 5, left: 0, right: 0, height: 1.5, background: 'rgba(44,82,130,0.18)', zIndex: 0 }} />

              {[
                { date: '1997. 8. 23',  title: '학교 설립',                              body: '이사장 임충선, 초대 교장 윤홍기, 교감 김진기 취임' },
                { date: '1997. 10. 18', title: '개교',                                   body: 'Ponsonby Intermediate School에서 첫 수업 시작' },
                { date: '1999. 1. 30',  title: '학교 이전',                               body: "St. Mary's School로 이전" },
                { date: '2001. 1',      title: '김종연 교감 취임',                         body: '' },
                { date: '2004. 10',     title: '조상철 중등교감 취임',                      body: '' },
                { date: '2005. 1',      title: '이명점 교감 취임',                         body: '' },
                { date: '2007. 2',      title: '전임례 교감 취임',                         body: '' },
                { date: '2008. 2',      title: '제2대 전임례 교장 취임',                   body: '김종연 중등부 교감, 김진미 초등부 교감 취임' },
                { date: '2008. 5',      title: '유승재 이사회 의장 취임',                  body: '' },
                { date: '2009. 2',      title: '외국인 한국어반 개설',                     body: '' },
                { date: '2010. 10',     title: '교가 제정',                               body: '' },
                { date: '2011. 4',      title: '제3대 김종연 교장 취임',                   body: '' },
                { date: '2013. 1',      title: '박은경 이사 취임',                        body: '' },
                { date: '2014. 2',      title: '김난희 교감 취임',                        body: '' },
                { date: '2014. 8',      title: 'Stuart Johns 이사 취임',                 body: '' },
                { date: '2017. 2',      title: '제4대 정은영 교장 취임',                   body: '' },
                { date: '2017. 9',      title: '개교 20주년 예술제',                      body: '개교 20주년 기념 예술제 개최 (Rosmini College)' },
                { date: '2018. 2',      title: '학교 이전',                               body: 'Sherwood School, Browns Bay로 이전' },
                { date: '2018. 7',      title: '김미경 중등교감 취임',                      body: '' },
                { date: '2018. 9',      title: '정창민 이사 취임',                        body: '' },
                { date: '2019. 12. 7',  title: '제5대 김난희 교장 취임',                   body: '김미경 교감, 정한진 교감 취임' },
                { date: '2023. 2',      title: '장우리 교감 취임 · 김정근 이사회 의장 취임', body: '' },
                { date: '2023. 12. 9',  title: '제6대 김현정 교장 취임',                   body: '' },
                { date: '2026. 2',      title: '노재회 이사회 의장 취임',                  body: '' },
              ].map((item) => (
                <div key={item.date} style={{ width: 200, flexShrink: 0, paddingRight: 24, position: 'relative', zIndex: 1 }}>
                  {/* dot — sits on the track */}
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#9278D6',
                    border: '2px solid #FDFCFA',
                    boxShadow: '0 0 0 2px rgba(146,120,214,0.25)',
                    marginBottom: 14,
                  }} />
                  {/* date */}
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#9278D6', letterSpacing: '0.04em', marginBottom: 5, whiteSpace: 'nowrap' }}>
                    {item.date}
                  </p>
                  {/* title */}
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1c2b3a', lineHeight: 1.5, marginBottom: item.body ? 5 : 0 }}>
                    {item.title}
                  </p>
                  {/* body */}
                  {item.body && (
                    <p style={{ fontSize: 12, color: '#8a9ab0', lineHeight: 1.6 }}>{item.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. 이사회 ──────────────────────────────────── */}
        <section id="board" style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>이사회</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              { name: '노재회', role: '이사회 의장' },
              { name: '김보연', role: '이사' },
              { name: '정창민', role: '이사' },
              { name: '김정근', role: '이사' },
              { name: '김아름', role: '이사' },
            ].map(({ name, role }) => (
              <div
                key={name}
                style={{ padding: '12px 4px' }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1c2b3a', marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: 12, color: '#4a5f75', fontWeight: 400 }}>{role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. 교직원 소개 ─────────────────────────────── */}
        <section id="staff">
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>교직원 소개</h2>

          {[
            {
              dept: '교장단',

              staff: [
                { name: '김현정', label: '교장' },
                { name: '장우리', label: '교감' },
              ],
            },
            {
              dept: '유치부',

              staff: [
                { name: '유은경', label: '다람쥐 1반' },
                { name: '강수진', label: '다람쥐 2반' },
                { name: '심성미', label: '개나리 1반' },
                { name: '임마리', label: '개나리 2반' },
              ],
            },
            {
              dept: '초등부',

              staff: [
                { name: '권영희', label: '1학년 1반' },
                { name: '김민경', label: '1학년 2반' },
                { name: '이옥진', label: '2학년' },
                { name: '조하은', label: '3학년 1반' },
                { name: '조은희', label: '3학년 2반' },
                { name: '최윤우', label: '4학년' },
                { name: '백캐서린', label: '5학년' },
                { name: '장명옥', label: '6학년' },
              ],
            },
            {
              dept: '중등부',

              staff: [
                { name: '홍성룡', label: '1학년' },
                { name: '이계우', label: '2·3학년' },
              ],
            },
            {
              dept: '특강',

              staff: [
                { name: '조하은', label: '미술 1·2' },
                { name: '이계우', label: '미술 3' },
                { name: '심성미', label: '미술 4' },
                { name: '권영희', label: '4D 프레임' },
                { name: '루크 바트람', label: '바이올린 1·2' },
                { name: '이건', label: '태권도' },
              ],
            },
          ].map(({ dept, staff }) => (
            <div key={dept} style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9278D6', borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: 10, marginBottom: 20 }}>
                {dept}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {staff.map(({ name, label }) => (
                  <div
                    key={name + label}
                    style={{ padding: '12px 4px' }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1c2b3a', marginBottom: 3 }}>{name}</div>
                    <div style={{ fontSize: 12, color: '#4a5f75', fontWeight: 400 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

      </main>

      <Footer />
    </div>
  )
}
