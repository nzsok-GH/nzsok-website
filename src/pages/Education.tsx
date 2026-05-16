import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SectionTabs from '../components/SectionTabs'

const SECTIONS = [
  { id: 'schedule', label: '시간표' },
  { id: 'programs', label: '커리큘럼' },
  { id: 'annual',   label: '연간 교육계획' },
]

const LEVELS = [
  {
    label: '유치부',
    bg: 'rgba(245,224,154,0.25)',
    border: 'rgba(200,150,58,0.3)',
    headerBg: 'rgba(245,224,154,0.5)',
    headerColor: '#8a6200',
    items: ['한글 모음, 자음', '기초 어휘', '짧은 문장', '주제별 수업', '사회성 인성 교육'],
  },
  {
    label: '초등 저학년',
    sub: '1–3학년',
    bg: 'rgba(230,210,245,0.3)',
    border: 'rgba(146,120,214,0.3)',
    headerBg: 'rgba(230,210,245,0.6)',
    headerColor: '#5a4190',
    items: ['한글 모음, 자음 정리', '기본 어휘', '의성어, 의태어', '기본 문법', '문장 연습', '초3부터 역사'],
  },
  {
    label: '초등 고학년',
    sub: '4–6학년',
    bg: 'rgba(193,235,215,0.3)',
    border: 'rgba(60,160,110,0.3)',
    headerBg: 'rgba(193,235,215,0.6)',
    headerColor: '#1e6e48',
    items: ['중급 어휘', '어휘 확장 (동의어, 반의어)', '중급 문법', '글의 흐름 이해', '자신의 생각 표현', '역사', '속담, 한자어, 사자성어'],
  },
  {
    label: '중등',
    bg: 'rgba(193,220,245,0.3)',
    border: 'rgba(60,120,180,0.3)',
    headerBg: 'rgba(193,220,245,0.6)',
    headerColor: '#1a4e7a',
    items: ['고급 어휘', '어휘 확장 (동의어, 반의어)', '고급 문법', '여러 종류의 글', '배경 지식 확장', '내용 요약하기', '자신의 의견 표현', '토론, 발표', '역사', '속담, 한자어, 사자성어'],
  },
]

const MAX_WEEKS = 9
const TERMS = [
  {
    label: '텀 1', weeks: '7주',
    rows: [
      { week: 1,  date: '2월 14일',  event: '입학 및 개학식 (1교시)',    type: 'special' },
      { week: 2,  date: '2월 21일',  event: '',                         type: '' },
      { week: 3,  date: '2월 28일',  event: '',                         type: '' },
      { week: 4,  date: '3월 7일',   event: '독서 프로그램 시작',         type: 'special' },
      { week: 5,  date: '3월 14일',  event: '화재대피 훈련',              type: '' },
      { week: 6,  date: '3월 21일',  event: '',                         type: '' },
      { week: 7,  date: '3월 28일',  event: '',                type: '' },
    ],
  },
  {
    label: '텀 2', weeks: '8주',
    rows: [
      { week: 1,  date: '5월 2일',   event: '그림일기 대회',                          type: 'special' },
      { week: 2,  date: '5월 9일',   event: '',                                       type: '' },
      { week: 3,  date: '5월 16일',  event: '학부모 상담',                             type: '' },
      { week: 4,  date: '5월 23일',  event: '학부모 상담', type: '' },
      { week: 5,  date: '5월 30일',  event: "King's Birthday 휴교",        type: 'holiday' },
      { week: 6,  date: '6월 6일',   event: '',                                       type: '' },
      { week: 7,  date: '6월 13일',  event: '중간 평가',                               type: '' },
      { week: 8,  date: '6월 20일',  event: '지진대피 훈련',                           type: 'special' },
      { week: 9,  date: '6월 27일',  event: '',                              type: '' },
    ]
  },
  {
    label: '텀 3', weeks: '9주',
    rows: [
      { week: 1,  date: '7월 25일',  event: '',                                              type: '' },
      { week: 2,  date: '8월 1일',   event: '',                                              type: '' },
      { week: 3,  date: '8월 8일',   event: '',                                              type: '' },
      { week: 4,  date: '8월 15일',  event: '',                                              type: '' },
      { week: 5,  date: '8월 22일',  event: '초등 저학년 동화 발표회',                           type: 'special' },
      { week: 6,  date: '8월 29일',  event: '',                                              type: '' },
      { week: 7,  date: '9월 5일',   event: '',                                              type: '' },
      { week: 8,  date: '9월 12일',  event: '',                                              type: '' },
      { week: 9,  date: '9월 19일',  event: '추석 수업', type: 'special' },
    ]
  },
  {
    label: '텀 4', weeks: '8주',
    rows: [
      { week: 1,  date: '10월 17일', event: '한글 사랑 대회',                        type: 'special' },
      { week: 2,  date: '10월 24일', event: 'Labour day 휴교',                            type: 'holiday' },
      { week: 3,  date: '10월 31일', event: '',                                      type: '' },
      { week: 4,  date: '11월 7일',  event: '',                                      type: '' },
      { week: 5,  date: '11월 14일', event: '',                            type: '' },
      { week: 6,  date: '11월 21일', event: '',  type: '' },
      { week: 7,  date: '11월 28일', event: '교내 나의 꿈 말하기 대회',              type: 'special' },
      { week: 8,  date: '12월 5일',  event: '',                                      type: '' },
      { week: 9,  date: '12월 12일', event: '종업식 및 졸업식',                 type: 'special' },
    ],
  },
]

const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)' as const,
  fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3,
}

const eventColor = (type: string) =>
  type === 'holiday' ? '#b94040' : type === 'special' ? '#7c5ecf' : '#1c2b3a'

const TODAY = new Date()

function renderEventLine(line: string, type: string, j: number) {
  const match = line.match(/^(.*?)\s*(\(.*\))\s*$/)
  const main = match ? match[1].trim() : line
  const note = match ? match[2] : null
  return (
    <div key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 4, ...(j > 0 ? { marginTop: 5 } : {}) }}>
      <span style={{ color: eventColor(type), fontWeight: type ? 500 : 400 }}>{main}</span>
      {note && <span style={{ color: '#8a9ab0', fontSize: 10, fontWeight: 400, flexShrink: 0 }}>{note}</span>}
    </div>
  )
}

function isCurrentWeek(dateStr: string): boolean {
  const m = dateStr.match(/(\d+)월\s*(\d+)일/)
  if (!m) return false
  const month = parseInt(m[1])
  const day = parseInt(m[2])
  const year = month >= 10 ? 2026 : month <= 3 ? 2026 : 2026
  const d = new Date(year, month - 1, day)
  const diffDays = (d.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays >= -6 && diffDays <= 0
}

export default function Education() {
  return (
    <div>
      <Navigation variant="full" />
      <SectionTabs tabs={SECTIONS} />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '140px 48px 120px' }}>

        {/* ── 1. 시간표 ── */}
        <section id="schedule" style={{ marginBottom: 80, scrollMarginTop: 128 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 40 }}>시간표</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 28, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { title: '정규 수업', body: <><strong style={{ color: '#1c2b3a' }}>오전 10:00 ~ 오후 1:40</strong></> },
                { title: '특강 수업', body: <><strong style={{ color: '#1c2b3a' }}>오후 1:50 ~ 오후 3:00</strong><br />미술 · 바이올린 · 태권도 · 4D프레임</> },
              ].map(({ title, body }, i) => (
                <div key={title} style={{ padding: '16px 0', borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#9278D6', marginBottom: 6 }}>{title}</p>
                  <p style={{ color: '#4a5f75', fontSize: 14, lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>

            <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 400 }}>
              <thead>
                <tr style={{ background: '#FAF7F2' }}>
                  <th style={{ width: 80, padding: '7px 10px', color: '#8a9ab0', fontWeight: 600, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>교시</th>
                  <th style={{ width: 160, padding: '7px 10px', color: '#8a9ab0', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>시간</th>
                  <th style={{ padding: '7px 10px', color: '#8a9ab0', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>내용</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { badge: '1교시', time: '10:00 ~ 10:40', label: '정규 수업', type: 'regular' },
                  { badge: '2교시', time: '10:50 ~ 11:30', label: '정규 수업', type: 'regular' },
                  { badge: '점심',  time: '11:30 ~ 12:10', label: '점심 시간',  type: 'lunch' },
                  { badge: '3교시', time: '12:10 ~ 12:50', label: '정규 수업', type: 'regular' },
                  { badge: '4교시', time: '1:00 ~ 1:40',   label: '정규 수업', type: 'regular' },
                  { badge: '특강',  time: '1:50 ~ 3:00',   label: '미술 · 바이올린 · 태권도 · 4D프레임', type: 'extra' },
                ].map(({ badge, time, label, type }, i) => (
                  <tr key={badge} style={{ background: i % 2 === 0 ? '#fff' : '#FDFCFA' }}>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', color: type === 'lunch' ? '#8a9ab0' : '#4a5f75', fontWeight: 600 }}>
                      {badge}
                    </td>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)', color: '#4a5f75', whiteSpace: 'nowrap' }}>{time}</td>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', color: type === 'lunch' ? '#8a9ab0' : '#4a5f75' }}>{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>

        {/* ── 2. 커리큘럼 ── */}
        <section id="programs" style={{ marginBottom: 80, scrollMarginTop: 128 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 40 }}>커리큘럼</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {LEVELS.map(({ label, sub, bg, border, headerBg, headerColor, items }) => (
              <div key={label} className="rounded-2xl overflow-hidden flex flex-col" style={{ border: `1px solid ${border}` }}>
                <div style={{ background: headerBg, padding: '14px 18px', borderBottom: `1px solid ${border}` }}>
                  <div style={{ fontFamily: "'SUIT', sans-serif", fontSize: 15, fontWeight: 700, color: headerColor }}>{label}</div>
                  <div style={{ fontSize: 11, color: headerColor, opacity: 0.7, marginTop: 2, minHeight: 16 }}>{sub ?? ''}</div>
                </div>
                <div style={{ background: bg, padding: '16px 18px', flex: 1 }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map(item => (
                      <li key={item} style={{ fontSize: 13, color: '#1c2b3a', lineHeight: 1.5, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: headerColor, flexShrink: 0, marginTop: 3, fontSize: 10 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl flex items-center gap-3"
            style={{ background: 'rgba(193,220,245,0.25)', border: '1px solid rgba(60,120,180,0.2)', padding: '16px 20px', marginTop: 20 }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1a4e7a' }}>전학년 공통</span>
            <span style={{ width: 1, height: 16, background: 'rgba(60,120,180,0.3)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#1c2b3a' }}>독서 프로그램 · 체육 · 음악</span>
          </div>
        </section>

        {/* ── 3. 연간 교육계획 ── */}
        <section id="annual" style={{ scrollMarginTop: 128 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 40 }}>연간 교육계획</h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 720 }}>
              <thead>
                {/* Term header row */}
                <tr>
                  {TERMS.map(({ label, weeks }) => (
                    <th
                      key={label}
                      colSpan={3}
                      style={{
                        background: '#FAF7F2',
                        color: '#1c2b3a',
                        fontFamily: "'SUIT', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        padding: '10px 14px',
                        textAlign: 'left',
                        borderBottom: '2px solid rgba(0,0,0,0.10)',
                        borderRight: '1px solid rgba(0,0,0,0.07)',
                      }}
                    >
                      {label} <span style={{ fontWeight: 400, color: '#8a9ab0', marginLeft: 6 }}>{weeks}</span>
                    </th>
                  ))}
                </tr>
                {/* Column labels row */}
                <tr style={{ background: '#FAF7F2' }}>
                  {TERMS.map(({ label }) => (
                    [
                      <th key={`${label}-w`} style={{ width: 36, padding: '7px 10px', color: '#8a9ab0', fontWeight: 600, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>W</th>,
                      <th key={`${label}-d`} style={{ width: 70, padding: '7px 10px', color: '#8a9ab0', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>날짜</th>,
                      <th key={`${label}-e`} style={{ padding: '7px 10px', color: '#8a9ab0', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)', borderRight: label !== '텀 4' ? '2px solid rgba(0,0,0,0.1)' : 'none' }}>일정</th>,
                    ]
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: MAX_WEEKS }, (_, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FDFCFA' }}>
                    {TERMS.map(({ label, rows }) => {
                      const row = rows[i]
                      const isLast = label === '텀 4'
                      if (!row) {
                        return [
                          <td key={`${label}-w`} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', color: '#c8d4de' }}>—</td>,
                          <td key={`${label}-d`} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)' }} />,
                          <td key={`${label}-e`} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: isLast ? 'none' : '2px solid rgba(0,0,0,0.1)' }} />,
                        ]
                      }
                      const current = isCurrentWeek(row.date)
                      const cellBg = current ? 'rgba(146,120,214,0.08)' : undefined
                      return [
                        <td key={`${label}-w`} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)', borderLeft: current ? '3px solid #9278D6' : '3px solid transparent', textAlign: 'center', color: current ? '#7c5ecf' : '#8a9ab0', fontWeight: 700, background: cellBg }}>{row.week}</td>,
                        <td key={`${label}-d`} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)', color: '#4a5f75', whiteSpace: 'nowrap', background: cellBg }}>{row.date}</td>,
                        <td key={`${label}-e`} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.05)', borderRight: isLast ? 'none' : '2px solid rgba(0,0,0,0.1)', lineHeight: 1.4, background: cellBg }}>
                          {row.event.split('\n').map((l, j) => renderEventLine(l, row.type, j))}
                        </td>,
                      ]
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
