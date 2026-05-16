import { useEffect, useRef } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const SECTIONS = [
  { id: 'intro',   label: '소개글' },
  { id: 'purpose', label: '설립 취지' },
  { id: 'staff',   label: '교직원 소개' },
  { id: 'hymn',    label: '학교 교가' },
  { id: 'history', label: '학교 연혁' },
  { id: 'board',   label: '이사회' },
]

export default function About() {
  const tabsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const offset = (tabsRef.current?.clientHeight ?? 0) + 72 + 20
      for (const { id } of [...SECTIONS].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          tabsRef.current?.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'))
          tabsRef.current?.querySelector(`[href="#${id}"]`)?.classList.add('active')
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const SectionLabel = ({ text, pill = false }: { text: string; pill?: boolean }) =>
    pill
      ? <span className="section-label-pill">{text}</span>
      : <span className="section-label-line">{text}</span>

  return (
    <div>
      <Navigation variant="full" />

      {/* ── PAGE HERO ─────────────────────────────────── */}
      <section
        className="page-hero-gradient text-center"
        style={{ padding: '140px 48px 80px' }}
      >
        <div className="relative z-[1] max-w-[700px] mx-auto">
          <span
            className="inline-block rounded-full mb-5"
            style={{
              background: 'rgba(146,120,214,0.15)', color: '#B49EE4',
              border: '1px solid rgba(146,120,214,0.3)',
              padding: '6px 18px', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}
          >
            학교소개
          </span>
          <h1 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 48, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.2, marginBottom: 16 }}>
            뉴질랜드 한민족<br />한글학교를 소개합니다
          </h1>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.7 }}>
            1997년 설립 이래, 한국어와 문화를 미래 세대에 전하는<br />뉴질랜드 오클랜드의 한글 교육 공동체입니다.
          </p>
        </div>
      </section>

      {/* ── SECTION TABS (sticky) ──────────────────────── */}
      <nav
        ref={tabsRef}
        className="sticky z-[90] overflow-x-auto"
        style={{ background: '#FDFCFA', borderBottom: '2px solid #EDE4D3', top: 72, padding: '0 48px' }}
      >
        <div className="flex max-w-[1100px] mx-auto" style={{ minWidth: 'max-content' }}>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`section-tab${id === 'intro' ? ' active' : ''}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── 1. 소개글 ─────────────────────────────────── */}
      <section id="intro" style={{ padding: '100px 48px', background: '#FDFCFA' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel text="소개글" pill />
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 24 }}>
            한국어와 문화를<br />미래 세대에게
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.8, maxWidth: 720 }}>
            뉴질랜드에서 자라는 한국계 어린이들이 한국어와 한국 문화를 자연스럽게 습득하고, 두 문화권에서 자신감 있게 성장할 수 있도록 돕는 교육 공동체입니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginTop: 48 }}>
            <div>
              <div
                className="rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg,#E8E0F7 0%,#D0BFEF 100%)',
                  padding: '48px 40px', border: '1px solid rgba(146,120,214,0.2)',
                }}
              >
                <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 22, fontWeight: 700, color: '#1c2b3a', marginBottom: 16, lineHeight: 1.4 }}>
                  이중언어 교육을 통한<br />정체성 확립
                </h3>
                <p style={{ fontSize: 15, color: '#4a5f75', lineHeight: 1.8 }}>
                  뉴질랜드 한인 사회와 함께 성장해 온 한글학교입니다. 열정적인 교직원과 체계적인 커리큘럼으로 매주 토요일, 200여 명의 학생들이 한국어와 한국 문화를 배우고 있습니다.
                </p>
              </div>
              <div
                className="rounded-2xl flex items-center gap-4 mt-4"
                style={{ background: '#9278D6', padding: '24px 32px' }}
              >
                <div style={{ fontFamily: "'SUIT', sans-serif", fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1 }}>28</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>년의 교육 전통</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>1997년 설립</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { icon: '🇰🇷', title: '언어 · 문화 교육', body: '체계적인 한국어 읽기·쓰기·말하기와 함께 전통 문화와 역사를 배웁니다.' },
                { icon: '🌏', title: '이중문화 정체성', body: '뉴질랜드 사회의 일원이면서도 한국인으로서의 자부심을 키웁니다.' },
                { icon: '🤝', title: '한인 커뮤니티', body: '같은 배경을 가진 가족들과 함께 따뜻한 공동체를 이룹니다.' },
                { icon: '📚', title: '체계적 커리큘럼', body: '연령별 맞춤 교재와 레벨별 수업으로 효율적인 학습 환경을 제공합니다.' },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-5 items-start">
                  <div className="text-[28px] flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 6 }}>{title}</h4>
                    <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 설립 취지 ───────────────────────────────── */}
      <section id="purpose" style={{ padding: '100px 48px', background: '#F5EFE3' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel text="학교 설립 취지" pill />
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 24 }}>
            우리가 이 학교를<br />만든 이유
          </h2>

          <div
            className="rounded-2xl mb-10"
            style={{
              background: 'linear-gradient(135deg,#E8E0F7 0%,#D0BFEF 100%)',
              padding: 48, borderLeft: '5px solid #9278D6', color: '#4a5f75',
              fontFamily: "'SUIT', sans-serif", fontSize: 18, lineHeight: 1.9,
            }}
          >
            <strong style={{ color: '#1c2b3a' }}>"긍정적인 생활태도와 이중문화 소유자"</strong><br /><br />
            뉴질랜드에서 태어나고 자라는 우리 아이들이 한국인으로서의 뿌리와 정체성을 잃지 않고, 동시에 뉴질랜드 사회의 당당한 구성원으로 성장하기를 바라는 마음에서 이 학교를 세웠습니다.<br /><br />
            언어는 단순한 의사소통 도구가 아니라 문화와 역사, 그리고 가족과 이어주는 소중한 연결고리입니다.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { icon: '🌱', title: '정체성 교육', body: '한국인으로서의 자부심과 뿌리를 심어주어 건강한 자아정체성을 형성합니다.' },
              { icon: '🌐', title: '글로벌 인재 양성', body: '두 언어와 두 문화를 자유롭게 넘나드는 글로벌 인재로 성장시킵니다.' },
              { icon: '👨‍👩‍👧‍👦', title: '가족과의 연결', body: '한국어를 통해 한국의 가족, 친척과 소통하고 유대를 이어나갑니다.' },
              { icon: '🏫', title: '커뮤니티 형성', body: '같은 배경의 한인 가정들이 함께 모여 따뜻한 공동체를 만들어갑니다.' },
              { icon: '📖', title: '문화 계승', body: '한국의 전통 문화, 역사, 예술을 체험하며 문화적 유산을 이어받습니다.' },
              { icon: '🎯', title: '미래 경쟁력', body: '이중언어 능력은 미래 사회에서 강력한 경쟁력이 되어줄 것입니다.' },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl card-hover"
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: '32px 28px' }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 10 }}>{title}</h4>
                <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 교직원 소개 ─────────────────────────────── */}
      <section id="staff" style={{ padding: '100px 48px', background: '#FDFCFA' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel text="교직원 소개" pill />
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 24 }}>
            열정적인 선생님들을<br />소개합니다
          </h2>
          <p style={{ fontSize: 15, color: '#4a5f75', lineHeight: 1.8, marginBottom: 40 }}>
            뉴질랜드 한민족 한글학교의 선생님들은 한국어 교육과 한국 문화 전파에 대한 깊은 열정을 가진 분들입니다.
          </p>

          {[
            {
              dept: '🏫 교장 · 교감',
              cols: 2,
              maxWidth: 520,
              staff: [
                { char: '김', name: '김현정', role: '교장', sub: '제6대 교장', gradient: '' },
                { char: '장', name: '장우리', role: '교감', sub: '교육과정 담당', gradient: '' },
              ],
            },
            {
              dept: '🌸 유치부 선생님',
              cols: 3,
              staff: [
                { char: '유', name: '유은경 · 강수진 · 신미영', role: '담임교사', sub: '병아리반', gradient: 'linear-gradient(135deg,#D0BFEF,#9278D6)' },
                { char: '다', name: '이유선 · 김민경', role: '담임교사', sub: '다람쥐반', gradient: 'linear-gradient(135deg,#D0BFEF,#9278D6)' },
                { char: '개', name: '심성미 · 임마리', role: '담임교사', sub: '개나리반', gradient: 'linear-gradient(135deg,#D0BFEF,#9278D6)' },
              ],
            },
            {
              dept: '📚 초등부 선생님',
              cols: 4,
              staff: [
                { char: '권', name: '권영희 · 백주영', role: '담임교사', sub: '초등 1학년', gradient: '' },
                { char: '박', name: '박선혜 · 이옥진', role: '담임교사', sub: '초등 2학년', gradient: '' },
                { char: '조', name: '조하은', role: '담임교사', sub: '초등 3학년', gradient: '' },
                { char: '최', name: '최윤우 · 은지현', role: '담임교사', sub: '초등 4학년', gradient: '' },
                { char: '정', name: '정지윤', role: '담임교사', sub: '초등 5학년', gradient: '' },
                { char: '심', name: '심은정', role: '담임교사', sub: '초등 6학년', gradient: '' },
              ],
            },
            {
              dept: '🎓 중등부 선생님',
              cols: 4,
              maxWidth: 280,
              staff: [
                { char: '이', name: '이계우', role: '담임교사', sub: '중등', gradient: '' },
              ],
            },
            {
              dept: '🎨 특강 선생님',
              cols: 4,
              staff: [
                { char: '미', name: '장혜윤 · 유은경', role: '특강교사', sub: '유아미술', gradient: 'linear-gradient(135deg,#9278D6,#7c5ecf)' },
                { char: '미', name: '이계우 · 심성미', role: '특강교사', sub: '초등미술', gradient: 'linear-gradient(135deg,#9278D6,#7c5ecf)' },
                { char: '바', name: '루크 바트람 · 정믿음', role: '특강교사', sub: '바이올린', gradient: 'linear-gradient(135deg,#9278D6,#7c5ecf)' },
                { char: '태', name: '박민재', role: '특강교사', sub: '태권도', gradient: 'linear-gradient(135deg,#9278D6,#7c5ecf)' },
                { char: '4D', name: '권영희', role: '특강교사', sub: '4D 프레임', gradient: 'linear-gradient(135deg,#9278D6,#7c5ecf)' },
              ],
            },
          ].map(({ dept, cols, maxWidth, staff }) => (
            <div key={dept} style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c5ecf', borderBottom: '2px solid rgba(124,94,207,0.2)', paddingBottom: 10, marginBottom: 20 }}>
                {dept}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: 20,
                  maxWidth: maxWidth,
                }}
              >
                {staff.map(({ char, name, role, sub, gradient }) => (
                  <div
                    key={name + sub}
                    className="text-center rounded-2xl card-hover"
                    style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: '28px 20px' }}
                  >
                    <div
                      className="flex items-center justify-center mx-auto rounded-full mb-3.5"
                      style={{
                        width: 64, height: 64,
                        background: gradient || 'linear-gradient(135deg,#9278D6,#7c5ecf)',
                        fontFamily: "'SUIT', sans-serif",
                        fontWeight: 900, fontSize: 18, color: '#fff',
                      }}
                    >
                      {char}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: 12, color: '#9278D6', fontWeight: 600, marginBottom: 6 }}>{role}</div>
                    <div style={{ fontSize: 12, color: '#4a5f75' }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. 학교 교가 ───────────────────────────────── */}
      <section id="hymn" style={{ padding: '100px 48px', background: '#F5EFE3' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel text="학교 교가" pill />
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 24 }}>
            우리들의 노래
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.8, maxWidth: 720, marginBottom: 40 }}>
            뉴질랜드 한민족 한글학교의 교가입니다. 함께 부르며 우리의 정체성과 꿈을 키워갑니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 48, alignItems: 'start' }}>
            <div
              className="rounded-2xl"
              style={{
                background: 'linear-gradient(135deg,#E8E0F7 0%,#D0BFEF 100%)',
                padding: 48, border: '1px solid rgba(146,120,214,0.2)', minWidth: 280,
              }}
            >
              <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 20, fontWeight: 700, color: '#9278D6', marginBottom: 24 }}>🎵 교가 가사</h3>
              {[
                { verse: '1절', lines: ['우리 모여 배우자', '씩씩하게 즐겁게', '우리글과 우리말', '우리 자랑 익히자'] },
                { verse: '2절', lines: ['부모님과 선생님', '사랑으로 땀으로', '우리들을 가르쳐', '대한민국 빛내네'] },
                { verse: '3절', lines: ['넓은 세계 우리것', '맘껏 배워 힘키워', '우리나라 힘키워', '모든나라 벗 삼자'] },
              ].map(({ verse, lines }) => (
                <div key={verse} style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, color: 'rgba(180,158,228,0.8)', letterSpacing: '0.08em', marginBottom: 10 }}>{verse}</p>
                  <p style={{ fontSize: 15, lineHeight: 2.2, color: '#4a5f75' }}>
                    {lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}
                  </p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(146,120,214,0.3)', paddingTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#B49EE4', textTransform: 'uppercase', marginBottom: 12 }}>후렴</p>
                <p style={{ fontSize: 15, lineHeight: 2.2, color: 'rgba(255,255,255,0.88)' }}>
                  한민족 한글학교<br />오래오래 빛나라<br />아리랑 아리랑 아라리요<br />아리랑고개로 넘어간다
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(146,120,214,0.2)', fontSize: 12, color: '#8a9ab0', textAlign: 'right', letterSpacing: '0.05em' }}>
                작곡 박은별 &nbsp;·&nbsp; 작사 유승재 &nbsp;·&nbsp; 2010
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[
                { title: '🎼 교가에 담긴 의미', body: '한민족의 언어와 문화를 함께 배우고, 대한민국을 빛내며, 세계 모든 나라와 벗이 되자는 소망이 담겨 있습니다. 아리랑 선율에 실어 한민족의 얼을 이어갑니다.' },
                { title: '🌟 교훈', special: true },
                { title: '📅 교가 제정', body: '2010년 제정된 교가로, 작곡 박은별, 작사 유승재 선생님의 작품입니다. 매 학기 시작 및 행사 때 함께 부릅니다.' },
              ].map(({ title, body, special }) => (
                <div
                  key={title}
                  className="rounded-2xl"
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 28 }}
                >
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 8 }}>{title}</h4>
                  {special ? (
                    <>
                      <p style={{ fontFamily: "'SUIT', sans-serif", fontSize: 18, fontWeight: 700, color: '#1c2b3a', marginBottom: 8, lineHeight: 1.6 }}>
                        "긍정적인 생활태도와<br />이중문화 소유자"
                      </p>
                      <p style={{ fontSize: 14, color: '#4a5f75' }}>Think positively and be bicultural</p>
                    </>
                  ) : (
                    <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 학교 연혁 ───────────────────────────────── */}
      <section id="history" style={{ padding: '100px 48px', background: '#FDFCFA' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel text="학교 연혁" pill />
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 24 }}>
            함께 걸어온 길
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.8, maxWidth: 720, marginBottom: 0 }}>
            1997년 설립 이래, 뉴질랜드 한인 사회와 함께 성장해 온 한글학교의 발자취입니다.
          </p>

          <div className="timeline mt-12">
            {[
              { date: '1997. 8. 23', title: '학교 설립', body: '뉴질랜드 한민족 한글학교 설립. 이사장 임충선, 초대 교장 윤홍기, 교감 김진기 취임.' },
              { date: '1997. 10. 18', title: '개교', body: 'Ponsonby Intermediate School에서 첫 수업 시작.' },
              { date: '1999. 1. 30', title: '학교 이전', body: "St. Mary's School, Northcote로 이전." },
              { date: '2001. 1', title: '김종연 교감 취임', body: '' },
              { date: '2004. 10', title: '조상철 중등교감 취임', body: '' },
              { date: '2005. 1', title: '이명점 교감 취임', body: '' },
              { date: '2007. 2', title: '전임례 교감 취임', body: '' },
              { date: '2008. 2', title: '제2대 전임례 교장 취임', body: '김종연 중등교감, 김진미 초등교감 취임.' },
              { date: '2008. 5', title: '유승재 이사회의장 취임', body: '' },
              { date: '2009. 2', title: '외국인 한국어반 개설', body: '' },
              { date: '2010. 10', title: '교가 제정', body: '' },
              { date: '2011. 4', title: '제3대 김종연 교장 취임', body: '' },
              { date: '2013. 1', title: '박은경 이사 취임', body: '' },
              { date: '2014. 2', title: '김난희 교감 취임', body: '' },
              { date: '2014. 8', title: 'Stuart Johns 이사 취임', body: '' },
              { date: '2017. 2', title: '제4대 정은영 교장 취임', body: '' },
              { date: '2017. 9', title: '개교 20주년 예술제', body: 'Rosmini College 강당에서 개교 20주년 기념 예술제 개최.' },
              { date: '2018. 2', title: '학교 이전', body: 'Sherwood School, Browns Bay로 이전.' },
              { date: '2018. 7', title: '김미경 중등교감 취임', body: '' },
              { date: '2018. 9', title: '정창민 이사 취임', body: '' },
              { date: '2019. 12. 7', title: '제5대 김난희 교장 취임', body: '김미경 교감, 정한진 교감 취임.' },
              { date: '2023. 2', title: '장우리 교감 취임 · 김정근 이사회의장 취임', body: '' },
              { date: '2023. 12. 9', title: '제6대 김현정 교장 취임', body: '' },
              { date: '2026. 2', title: '노재회 이사회의장 취임', body: '' },
            ].map(({ date, title, body }) => (
              <div key={date + title} className="timeline-item">
                <span
                  className="inline-block rounded-full mb-2.5"
                  style={{ background: '#E8E0F7', color: '#B49EE4', fontSize: 13, fontWeight: 700, padding: '4px 14px', letterSpacing: '0.05em' }}
                >
                  {date}
                </span>
                <h4 style={{ fontSize: 17, fontWeight: 700, color: '#1c2b3a', marginBottom: 6 }}>{title}</h4>
                {body && <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. 이사회 ──────────────────────────────────── */}
      <section id="board" style={{ padding: '100px 48px', background: '#F5EFE3' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel text="이사회" pill />
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 24 }}>
            학교를 이끌어가는<br />이사회
          </h2>
          <p style={{ fontSize: 15, color: '#4a5f75', lineHeight: 1.8, marginBottom: 40 }}>
            뉴질랜드 한민족 한글학교의 이사회는 학교의 교육 방향과 운영 전반을 책임지는 기구입니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { char: '노', name: '노재회', role: '이사회의장', desc: '2026년 2월 이사회의장 취임. 학교의 교육 방향과 운영 전반을 이끌고 있습니다.' },
              { char: '김', name: '김보연', role: '이사', desc: '학교 발전을 위해 헌신하고 있습니다.' },
              { char: '정', name: '정창민', role: '이사', desc: '2018년 9월 이사 취임. 학교 발전을 위해 헌신하고 있습니다.' },
              { char: '김', name: '김정근', role: '이사', desc: '전 이사회의장 역임. 학교 발전을 위해 헌신하고 있습니다.' },
              { char: '김', name: '김아름', role: '이사', desc: '학교 발전을 위해 헌신하고 있습니다.' },
            ].map(({ char, name, role, desc }) => (
              <div
                key={name}
                className="text-center rounded-2xl card-hover"
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: '32px 28px' }}
              >
                <div
                  className="flex items-center justify-center mx-auto rounded-full mb-4"
                  style={{
                    width: 72, height: 72,
                    background: 'linear-gradient(135deg,#E8E0F7,#D0BFEF)',
                    fontFamily: "'SUIT', sans-serif",
                    fontWeight: 900, fontSize: 22, color: '#B49EE4',
                  }}
                >
                  {char}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 13, color: '#9278D6', fontWeight: 600, marginBottom: 8 }}>{role}</div>
                <div style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32, fontSize: 13, color: '#8a9ab0', textAlign: 'center' }}>
            * 이사회 구성원 정보는 변경될 수 있습니다. 최신 정보는 학교로 문의해 주세요.
          </p>
        </div>
      </section>

      <Footer variant="about" />
    </div>
  )
}
