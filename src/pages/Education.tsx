import { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const SECTIONS = [
  { id: 'schedule', label: '수업 시간표' },
  { id: 'programs', label: '커리큘럼' },
  { id: 'annual',   label: '연간 교육계획' },
]

const TABS = [
  { id: 'kinder',    label: '유치부',           color: '#9278D6', icon: '🌱', title: '유치부', sub: '놀이 중심 한국어 기초 · 정서 발달', tags: ['주제별 수업','사회성·인성 교육','한글 모음 & 자음','기본 어휘','짧은 문장','전래동화'] },
  { id: 'elem-low',  label: '초등저 (1–3학년)', color: '#7c5ecf', icon: '📖', title: '초등저 (1–3학년)', sub: '읽기·쓰기 기초 완성 · 어휘 확장', tags: ['한글 모음·자음 정리','어휘 확장','기본 문법','문장 연습','전래동화'] },
  { id: 'elem-high', label: '초등고 (4–6학년)', color: '#B49EE4', icon: '✏️', title: '초등고 (4–6학년)', sub: '고급 어휘 · 문법 심화 · 역사·문화', tags: ['어휘 확장','고급 어휘','기본 문법','자신의 생각 표현','글의 흐름 이해','역사','속담','한자어','사자성어'] },
  { id: 'middle',    label: '중등',             color: '#5a4190', icon: '🎓', title: '중등', sub: '심화 독해 · 글쓰기 · 토론·발표', tags: ['고급 어휘 확장','문법','글쓰기 확장','여러 종류의 글','배경 지식 확장','토론','발표','역사','한자어','속담','사자성어'] },
  { id: 'music',     label: '음악',             color: '#1c2b3a', icon: '🎵', title: '음악', sub: '전래동요 · 민요 · 리듬 활동', tags: ['전래동요','창작동요','민요','애국가','교가','리듬 게임'] },
  { id: 'pe',        label: '체육',             color: '#1c2b3a', icon: '⚽', title: '체육', sub: '신체 발달 · 협동심 · 기초 체력', tags: ['연령에 따른 신체 발달','협동심 발달','사회성 발달','전학년 줄넘기','기초 체력 단련'] },
]

export default function Education() {
  const [activeTab, setActiveTab] = useState('kinder')
  const tabsRef = useRef<HTMLElement>(null)
  const tab = TABS.find(t => t.id === activeTab)!

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

  return (
    <div>
      <Navigation variant="full" />

      {/* ── SECTION TABS (sticky) ──────────────────────── */}
      <nav
        ref={tabsRef}
        className="sticky z-[90] overflow-x-auto"
        style={{ background: '#FDFCFA', borderBottom: '2px solid #EDE4D3', top: 72, padding: '0 48px' }}
      >
        <div className="flex max-w-[1100px] mx-auto" style={{ minWidth: 'max-content' }}>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`section-tab${id === 'schedule' ? ' active' : ''}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── 1. 수업 시간표 ────────────────────────────── */}
      <section id="schedule" style={{ background: '#FDFCFA', padding: '100px 48px' }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="section-label-pill">수업 시간표</span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.25, marginBottom: 0 }}>
            토요일 정기 수업
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, marginTop: 56, alignItems: 'start' }}>
            <div>
              {[
                { icon: '📅', title: '수업 요일', body: <>매주 <strong style={{ color: '#1c2b3a' }}>토요일</strong> 운영<br />학기 중 운영 (뉴질랜드 학교 방학 휴무)</> },
                { icon: '🕙', title: '정규 수업', body: <><strong style={{ color: '#1c2b3a' }}>오전 10:00 ~ 오후 1:40</strong></> },
                { icon: '🎨', title: '특강 수업', body: <><strong style={{ color: '#1c2b3a' }}>오후 1:50 ~ 오후 3:00</strong><br />미술 · 바이올린 · 태권도 · 4D프레임</> },
                { icon: '📍', title: '장소', body: <>40 Sartors Avenue<br />Browns Bay, Auckland 0630</> },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl mb-6"
                  style={{ background: 'rgba(146,120,214,0.1)', border: '1px solid rgba(146,120,214,0.25)', padding: 24 }}
                >
                  <h4 style={{ color: '#B49EE4', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {icon} {title}
                  </h4>
                  <p style={{ color: '#4a5f75', fontSize: 14, lineHeight: 1.65 }}>{body}</p>
                </div>
              ))}
              <p style={{ color: '#8a9ab0', fontSize: 13, lineHeight: 1.7 }}>
                정확한 수업 일정 및 반 배정은 입학 상담 시 안내해 드립니다.
              </p>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <div
                className="timetable-header px-7 py-5"
                style={{ background: 'rgba(146,120,214,0.1)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B49EE4' }}>교시</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B49EE4' }}>시간</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B49EE4' }}>내용</span>
              </div>
              {[
                { badge: '1교시', time: '10:00 ~ 10:40', label: '한국어 수업', special: false },
                { badge: '2교시', time: '10:50 ~ 11:30', label: '한국어 수업', special: false },
                { badge: '점심',  time: '11:30 ~ 12:10', label: '점심 식사',   special: 'lunch' },
                { badge: '3교시', time: '12:10 ~ 12:50', label: '한국어 수업', special: false },
                { badge: '4교시', time: '1:00 ~ 1:40',   label: '한국어 수업', special: false },
                { badge: '특강',  time: '1:50 ~ 3:00',   label: '특강 수업',   special: 'extra' },
              ].map(({ badge, time, label, special }) => (
                <div
                  key={badge}
                  className="timetable-row px-7 py-[18px] items-center"
                  style={{
                    borderBottom: special === 'extra' ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    background: special === 'extra' ? 'rgba(146,120,214,0.1)' : special === 'lunch' ? 'rgba(245,224,154,0.15)' : 'transparent',
                    borderTop: special === 'extra' ? '1px solid rgba(146,120,214,0.2)' : 'none',
                  }}
                >
                  <span
                    className="px-2.5 py-[5px] rounded-md text-xs font-semibold text-center"
                    style={{
                      background: special === 'extra' ? '#7c5ecf' : special === 'lunch' ? 'rgba(245,224,154,0.4)' : 'rgba(146,120,214,0.15)',
                      color: '#B49EE4',
                    }}
                  >
                    {badge}
                  </span>
                  <span style={{ color: '#4a5f75', fontSize: 13 }}>{time}</span>
                  <span>
                    <span
                      className="inline-block px-2.5 py-[3px] rounded text-xs font-medium"
                      style={{
                        background: special === 'extra' ? '#7c5ecf' : 'rgba(146,120,214,0.15)',
                        color: special === 'extra' ? '#fff' : '#B49EE4',
                      }}
                    >
                      {label}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 커리큘럼 ──────────────────────────────── */}
      <section id="programs" style={{ background: '#F5EFE3', padding: '100px 48px' }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="section-label-pill">교육 과정</span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.25, marginBottom: 16 }}>
            학년별 연계 수업 커리큘럼
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.75, maxWidth: 520 }}>
            2024년도 학년별 중점 교육 사항입니다. 각 학년의 발달 단계에 맞춘 체계적인 커리큘럼으로 운영됩니다.
          </p>

          <div className="flex gap-2 mt-12 flex-wrap justify-center">
            {TABS.map(t => (
              <button
                key={t.id}
                className="curriculum-tab flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
                style={{
                  border: '2px solid',
                  borderColor: activeTab === t.id ? t.color : 'rgba(0,0,0,0.12)',
                  background: activeTab === t.id ? t.color : 'transparent',
                  color: activeTab === t.id ? '#fff' : '#4a5f75',
                  letterSpacing: '0.02em',
                }}
                onClick={() => setActiveTab(t.id)}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', opacity: 0.8, flexShrink: 0 }} />
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-9">
            <div
              className="rounded-2xl"
              style={{
                padding: '40px 48px',
                background: 'rgba(255,255,255,0.7)',
                border: `1px solid ${tab.color}40`,
              }}
            >
              <div
                className="flex items-center gap-5 mb-8 pb-6"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              >
                <div
                  className="flex items-center justify-center rounded-2xl text-[26px] flex-shrink-0"
                  style={{ width: 56, height: 56, background: `${tab.color}26` }}
                >
                  {tab.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'SUIT', sans-serif", fontSize: 24, fontWeight: 700, color: '#1c2b3a', marginBottom: 4 }}>
                    {tab.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#4a5f75', letterSpacing: '0.03em' }}>
                    {tab.sub}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {tab.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-transform hover:-translate-y-0.5"
                    style={{
                      background: `${tab.color}1f`,
                      color: tab.color,
                      border: `1px solid ${tab.color}4d`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 연간 교육계획 ──────────────────────────── */}
      <section id="annual" style={{ background: '#FDFCFA', padding: '100px 48px' }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="section-label-pill">연간 교육계획</span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 900, color: '#1c2b3a', lineHeight: 1.25, marginBottom: 16 }}>
            2025 연간계획표
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.75 }}>
            뉴질랜드 한민족 한글학교 2025년도 연간 교육 일정입니다.
          </p>

          <div className="annual-grid grid gap-4 mt-12">
            {[
              {
                term: 'Term 1', hdr: 'term1-hdr', weeks: '8주 (8주)',
                rows: [
                  { date: '2/15', label: '입학식 개학식', type: 'highlight' },
                  { date: '2/22', label: '특강 시작', type: '' },
                  { date: '3/1',  label: '', type: '' },
                  { date: '3/8',  label: '화재 대피 훈련', type: '' },
                  { date: '3/15', label: '나의 꿈 말하기 대회', type: 'special' },
                  { date: '3/22', label: '', type: '' },
                  { date: '3/29', label: '', type: '' },
                  { date: '4/5',  label: '특강 없음', type: '' },
                  { date: '4/12', label: '전국말하기대회', type: 'special' },
                ],
              },
              {
                term: 'Term 2', hdr: 'term2-hdr', weeks: '8주 (6주)',
                rows: [
                  { date: '5/3',  label: '어버이날 수업', type: '' },
                  { date: '5/10', label: '특강 시작', type: '' },
                  { date: '5/17', label: '', type: '' },
                  { date: '5/24', label: '지진 대피 훈련', type: '' },
                  { date: '5/31', label: "King's birthday 휴교", type: 'holiday' },
                  { date: '6/7',  label: '동화구연 대회', type: 'special' },
                  { date: '6/14', label: '특강 있음', type: '' },
                  { date: '6/21', label: 'Matariki 휴교\n자체 교사 연수', type: 'holiday' },
                  { date: '—',    label: '리더십 워크숍\n중고등 강연회', type: '' },
                ],
              },
              {
                term: 'Term 3', hdr: 'term3-hdr', weeks: '9주 (9주)',
                rows: [
                  { date: '7/19', label: '3팀 독도대회 준비', type: 'highlight' },
                  { date: '7/26', label: '특강 시작', type: '' },
                  { date: '8/2',  label: '학부모상담', type: '' },
                  { date: '8/9',  label: '학부모상담', type: '' },
                  { date: '8/16', label: '8.15 수업', type: '' },
                  { date: '8/23', label: '', type: '' },
                  { date: '8/30', label: '', type: '' },
                  { date: '9/6',  label: '예술제 (독도대회 시상식)', type: 'special' },
                  { date: '9/13', label: '특강 없음', type: '' },
                  { date: '10월 3,4', label: '오세아니아 연수', type: 'special' },
                ],
              },
              {
                term: 'Term 4', hdr: 'term4-hdr', weeks: '10주 (9주)',
                rows: [
                  { date: '10/11', label: '추석 전통 수업', type: '' },
                  { date: '10/18', label: '한글사랑 대회\n특강 시작', type: 'highlight' },
                  { date: '10/25', label: 'Labour day 휴교', type: 'holiday' },
                  { date: '11/1',  label: '', type: '' },
                  { date: '11/8',  label: '학년말 평가', type: 'special' },
                  { date: '11/15', label: '', type: '' },
                  { date: '11/22', label: '성적표', type: '' },
                  { date: '11/29', label: '', type: '' },
                  { date: '12/6',  label: '', type: '' },
                  { date: '12/13', label: '종업식 졸업식\n특강 없음', type: 'highlight' },
                ],
              },
            ].map(({ term, hdr, weeks, rows }) => (
              <div key={term} className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className={`${hdr} px-5 py-4`}>
                  <div style={{ fontFamily: "'SUIT', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{term}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{weeks}</div>
                </div>
                <div className="py-2">
                  {rows.map(({ date, label, type }, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 px-4 py-[7px]"
                      style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#4a5f75', whiteSpace: 'nowrap', minWidth: 46, paddingTop: 1 }}>
                        {date}
                      </span>
                      <span
                        style={{
                          fontSize: 12, lineHeight: 1.4,
                          color: type === 'highlight' ? '#7c5ecf' : type === 'holiday' ? '#888' : type === 'special' ? '#5a4190' : '#1c2b3a',
                          fontWeight: type === 'highlight' || type === 'special' ? 600 : 400,
                          fontStyle: type === 'holiday' ? 'italic' : 'normal',
                        }}
                      >
                        {label.split('\n').map((l, j) => <span key={j}>{l}{j < label.split('\n').length - 1 && <br />}</span>)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
