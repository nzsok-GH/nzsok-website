import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const TABS = [
  { id: 'kinder',    label: '유치부',           color: '#2aa99a', icon: '🌱', title: '유치부', sub: '놀이 중심 한국어 기초 · 정서 발달', tags: ['주제별 수업','사회성·인성 교육','한글 모음 & 자음','기본 어휘','짧은 문장','전래동화'] },
  { id: 'elem-low',  label: '초등저 (1–3학년)', color: '#c8973a', icon: '📖', title: '초등저 (1–3학년)', sub: '읽기·쓰기 기초 완성 · 어휘 확장', tags: ['한글 모음·자음 정리','어휘 확장','기본 문법','문장 연습','전래동화'] },
  { id: 'elem-high', label: '초등고 (4–6학년)', color: '#e07830', icon: '✏️', title: '초등고 (4–6학년)', sub: '고급 어휘 · 문법 심화 · 역사·문화', tags: ['어휘 확장','고급 어휘','기본 문법','자신의 생각 표현','글의 흐름 이해','역사','속담','한자어','사자성어'] },
  { id: 'middle',    label: '중등',             color: '#6a7a90', icon: '🎓', title: '중등', sub: '심화 독해 · 글쓰기 · 토론·발표', tags: ['고급 어휘 확장','문법','글쓰기 확장','여러 종류의 글','배경 지식 확장','토론','발표','역사','한자어','속담','사자성어'] },
  { id: 'music',     label: '음악',             color: '#b464dc', icon: '🎵', title: '음악', sub: '전래동요 · 민요 · 리듬 활동', tags: ['전래동요','창작동요','민요','애국가','교가','리듬 게임'] },
  { id: 'pe',        label: '체육',             color: '#3cb878', icon: '⚽', title: '체육', sub: '신체 발달 · 협동심 · 기초 체력', tags: ['연령에 따른 신체 발달','협동심 발달','사회성 발달','전학년 줄넘기','기초 체력 단련'] },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('kinder')
  const tab = TABS.find(t => t.id === activeTab)!

  return (
    <div>
      <Navigation variant="full" />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        id="top"
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '100vh', background: '#0d2340' }}
      >
        <div className="hero-bg absolute inset-0" />
        <div className="hero-pattern absolute inset-0" />
        <div className="hero-deco" />
        <div
          className="relative z-[2] w-full mx-auto"
          style={{ maxWidth: 1200, padding: '120px 48px 80px' }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full mb-8 anim-delay-1"
            style={{
              background: 'rgba(200,151,58,0.12)',
              border: '1px solid rgba(200,151,58,0.3)',
              padding: '6px 16px',
            }}
          >
            <div
              className="hero-badge-dot w-1.5 h-1.5 rounded-full"
              style={{ background: '#2aa99a' }}
            />
            <span style={{ color: '#c8973a', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              뉴질랜드 · 오클랜드 · Browns Bay
            </span>
          </div>

          <h1
            className="anim-delay-2"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: 'clamp(36px,6vw,72px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            뉴질랜드<br />
            <em style={{ fontStyle: 'normal', color: '#c8973a' }}>한민족 한글학교</em>
          </h1>

          <p
            className="anim-delay-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(16px,2vw,22px)',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 12,
              letterSpacing: '0.04em',
            }}
          >
            New Zealand School of Korea
          </p>
          <p
            className="anim-delay-35"
            style={{ fontSize: 15, color: '#2aa99a', letterSpacing: '0.06em', marginBottom: 48, fontStyle: 'italic' }}
          >
            "긍정적인 생활태도와 이중문화 소유자 · Think positively and be bicultural"
          </p>

          <div className="flex gap-4 flex-wrap anim-delay-45">
            <Link
              to="/admission"
              className="inline-flex items-center gap-2.5 font-bold rounded-xl no-underline transition-all"
              style={{ background: '#c8973a', color: '#0d2340', fontSize: 15, padding: '15px 32px' }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#e8b84b'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(200,151,58,0.35)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#c8973a'
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <span>입학 안내 보기</span><span>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 font-medium rounded-xl no-underline transition-all"
              style={{
                background: 'transparent', color: '#fff', fontSize: 15, padding: '15px 32px',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span>학교 소개</span>
            </Link>
          </div>

          <div
            className="flex gap-10 mt-16 pt-12 flex-wrap anim-delay-55"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            {[['1997', '설립 연도'], ['28+', '운영 연수'], ['200+', '재학생']].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#c8973a', lineHeight: 1 }}>
                  {num}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO STRIP ──────────────────────────────────── */}
      <div style={{ background: '#0d2340', padding: '0 48px' }}>
        <div className="info-strip-inner">
          {[
            { icon: '📍', title: '위치', body: '40 Sartors Avenue\nBrowns Bay, Auckland 0630' },
            { icon: '📞', title: '연락처', body: '021 733 5706\nadmin@nzsok.school.nz' },
            { icon: '🗓', title: '수업 일정', body: '매주 토요일\n학기 중 운영 · 상세 일정 확인' },
          ].map(({ icon, title, body }) => (
            <div key={title} className="info-card-strip">
              <div
                className="flex items-center justify-center rounded-xl text-[22px] flex-shrink-0"
                style={{ width: 48, height: 48, background: 'rgba(200,151,58,0.12)' }}
              >
                {icon}
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 6 }}>
                  {title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.65 }}>
                  {body.split('\n').map((line, i) => <span key={i}>{line}{i < body.split('\n').length - 1 && <br />}</span>)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ──────────────────────────────────────── */}
      <section id="about" style={{ background: '#f9f5ee', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line" style={{ color: '#1a7a6e' }}>학교 소개</span>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#0d2340', lineHeight: 1.25, marginBottom: 16 }}>
            한국어와 문화를<br />미래 세대에게
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.75, maxWidth: 520, marginBottom: 0 }}>
            1997년 설립 이래, 뉴질랜드 한인 사회와 함께 성장해 온 한글학교입니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 48 }}>
            {[
              { num: '28', unit: '년의 역사', desc: '1997년 설립 이래\n뉴질랜드 최장수 한글학교' },
              { num: '150', unit: '명의 학생', desc: '유치부·초등·중등\n다양한 연령대 교육' },
              { num: '20', unit: '명의 교직원', desc: '헌신적인 교장·교사·강사진\n체계적인 교육 제공' },
            ].map(({ num, unit, desc }) => (
              <div
                key={unit}
                className="text-center rounded-2xl"
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', padding: '36px 28px' }}
              >
                <div style={{ fontFamily: "'Playfair Display','Noto Serif KR',serif", fontSize: 52, fontWeight: 900, color: '#1a7a6e', lineHeight: 1, marginBottom: 8 }}>
                  {num}<span style={{ fontSize: 24 }}>+</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0d2340', marginBottom: 6 }}>{unit}</div>
                <div style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.6 }}>
                  {desc.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-10 justify-center flex-wrap">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl no-underline font-semibold transition-all"
              style={{ padding: '14px 32px', background: '#1a7a6e', color: '#fff', fontSize: 15, letterSpacing: '0.02em' }}
              onMouseOver={e => { e.currentTarget.style.background = '#2aa99a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={e => { e.currentTarget.style.background = '#1a7a6e'; e.currentTarget.style.transform = '' }}
            >
              학교소개 자세히 보기 →
            </Link>
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 rounded-xl no-underline font-semibold transition-all"
              style={{ padding: '14px 32px', background: 'transparent', color: '#1a7a6e', fontSize: 15, border: '2px solid #1a7a6e' }}
              onMouseOver={e => { e.currentTarget.style.background = '#1a7a6e'; e.currentTarget.style.color = '#fff' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a7a6e' }}
            >
              입학 안내
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ────────────────────────────────────── */}
      <section id="schedule" style={{ background: '#0d2340', color: '#fff', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line" style={{ color: '#2aa99a' }}>수업 시간표</span>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 0 }}>
            토요일 정기 수업
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, marginTop: 56, alignItems: 'start' }}>
            <div>
              {[
                { icon: '📅', title: '수업 요일', body: <>매주 <strong style={{ color: '#fff' }}>토요일</strong> 운영<br />학기 중 운영 (뉴질랜드 학교 방학 휴무)</> },
                { icon: '🕙', title: '정규 수업', body: <><strong style={{ color: '#fff' }}>오전 10:00 ~ 오후 1:40</strong></> },
                { icon: '🎨', title: '특강 수업', body: <><strong style={{ color: '#fff' }}>오후 1:50 ~ 오후 3:00</strong><br />미술 · 바이올린 · 태권도 · 4D프레임</> },
                { icon: '📍', title: '장소', body: <>40 Sartors Avenue<br />Browns Bay, Auckland 0630</> },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl mb-6"
                  style={{ background: 'rgba(200,151,58,0.1)', border: '1px solid rgba(200,151,58,0.25)', padding: 24 }}
                >
                  <h4 style={{ color: '#c8973a', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {icon} {title}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.65 }}>{body}</p>
                </div>
              ))}
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>
                정확한 수업 일정 및 반 배정은 입학 상담 시 안내해 드립니다.
              </p>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="timetable-header px-7 py-5"
                style={{ background: 'rgba(200,151,58,0.12)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8973a' }}>교시</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8973a' }}>시간</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8973a' }}>내용</span>
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
                    borderBottom: special === 'extra' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    background: special === 'extra' ? 'rgba(26,122,110,0.15)' : special === 'lunch' ? 'rgba(255,255,255,0.04)' : 'transparent',
                    borderTop: special === 'extra' ? '1px solid rgba(26,122,110,0.3)' : 'none',
                  }}
                >
                  <span
                    className="px-2.5 py-[5px] rounded-md text-xs font-semibold text-center"
                    style={{
                      background: special === 'extra' ? '#1a7a6e' : special === 'lunch' ? 'rgba(255,255,255,0.1)' : 'rgba(26,122,110,0.2)',
                      color: '#2aa99a',
                    }}
                  >
                    {badge}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13 }}>{time}</span>
                  <span>
                    <span
                      className="inline-block px-2.5 py-[3px] rounded text-xs font-medium"
                      style={{
                        background: special === 'extra' ? '#1a7a6e' : 'rgba(26,122,110,0.15)',
                        color: special === 'extra' ? '#fff' : '#2aa99a',
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

      {/* ── PROGRAMS / CURRICULUM TABS ────────────────── */}
      <section id="programs" style={{ background: '#0d2340', color: '#fff', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span
            className="inline-block text-[11px] font-bold mb-4 rounded-full"
            style={{
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c8973a',
              background: 'rgba(200,151,58,0.08)', border: '1px solid rgba(200,151,58,0.3)',
              padding: '5px 14px',
            }}
          >
            교육 과정
          </span>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 16 }}>
            학년별 연계 수업 커리큘럼
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520 }}>
            2024년도 학년별 중점 교육 사항입니다. 각 학년의 발달 단계에 맞춘 체계적인 커리큘럼으로 운영됩니다.
          </p>

          {/* Tab buttons */}
          <div className="flex gap-2 mt-12 flex-wrap justify-center">
            {TABS.map(t => (
              <button
                key={t.id}
                className="curriculum-tab flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
                style={{
                  border: '2px solid',
                  borderColor: activeTab === t.id ? t.color : 'rgba(255,255,255,0.15)',
                  background: activeTab === t.id ? t.color : 'rgba(255,255,255,0.05)',
                  color: activeTab === t.id ? '#0d2340' : 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.02em',
                }}
                onClick={() => setActiveTab(t.id)}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', opacity: 0.8, flexShrink: 0 }} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="mt-9">
            <div
              className="rounded-2xl"
              style={{
                padding: '40px 48px',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${tab.color}40`,
              }}
            >
              <div
                className="flex items-center gap-5 mb-8 pb-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="flex items-center justify-center rounded-2xl text-[26px] flex-shrink-0"
                  style={{ width: 56, height: 56, background: `${tab.color}26` }}
                >
                  {tab.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {tab.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>
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

      {/* ── ANNUAL PLAN ──────────────────────────────────── */}
      <section id="annual" style={{ background: '#f2f4f7', padding: '80px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line">연간 교육계획</span>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#0d2340', lineHeight: 1.25, marginBottom: 16 }}>
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
              <div key={term} className={`rounded-2xl overflow-hidden`} style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <div className={`${hdr} px-5 py-4`}>
                  <div style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{term}</div>
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
                          color: type === 'highlight' ? '#e05a2b' : type === 'holiday' ? '#888' : type === 'special' ? '#2a7a2a' : '#1c2b3a',
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

      {/* ── NOTICE ──────────────────────────────────────── */}
      <section id="notice" style={{ background: '#f9f5ee', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line">알림마당</span>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#0d2340', lineHeight: 1.25, marginBottom: 16 }}>
            공지사항
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.75, maxWidth: 520 }}>
            한민족 한글학교의 주요 소식과 공지를 안내합니다.
          </p>

          <div className="flex flex-col gap-4 mt-12">
            {[
              { badge: '중요', badgeType: 'important', title: '2025년 Term 1 개학 안내 – 2월 15일(토) 입학식 및 개학식', date: '2025년 2월 10일' },
              { badge: '행사', badgeType: 'event',     title: '나의 꿈 말하기 대회 – 3월 15일(토)',                    date: '2025년 3월 1일' },
              { badge: '행사', badgeType: 'event',     title: '전국 말하기 대회 – 4월 12일(토)',                      date: '2025년 4월 1일' },
              { badge: '안내', badgeType: 'general',   title: 'Term 1 특강 안내 – 미술, 바이올린, 태권도, 4D프레임',   date: '2025년 2월 10일' },
            ].map(({ badge, badgeType, title, date }) => {
              const badgeStyle =
                badgeType === 'important' ? { background: 'rgba(200,151,58,0.15)', color: '#c8973a', border: '1px solid rgba(200,151,58,0.3)' } :
                badgeType === 'event'     ? { background: 'rgba(13,35,64,0.08)',    color: '#1a3a5c', border: '1px solid rgba(13,35,64,0.15)' } :
                                            { background: 'rgba(26,122,110,0.1)',   color: '#1a7a6e', border: '1px solid rgba(26,122,110,0.2)' }
              return (
                <div
                  key={title}
                  className="rounded-2xl flex items-start gap-6 transition-all cursor-default"
                  style={{
                    background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    padding: '24px 32px',
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,122,110,0.2)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={e => {
                    ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.07)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                    ;(e.currentTarget as HTMLDivElement).style.transform = ''
                  }}
                >
                  <span
                    className="flex-shrink-0 rounded-full text-[11px] font-bold text-center"
                    style={{ minWidth: 64, padding: '4px 12px', letterSpacing: '0.05em', textTransform: 'uppercase', ...badgeStyle }}
                  >
                    {badge}
                  </span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 6, lineHeight: 1.4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#4a5f75' }}>{date}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ADMISSION SNIPPET ────────────────────────────── */}
      <section id="admission" style={{ background: '#fff', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line">입학 안내</span>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#0d2340', lineHeight: 1.25, marginBottom: 16 }}>
            함께 시작해요
          </h2>
          <p style={{ fontSize: 16, color: '#4a5f75', lineHeight: 1.75, maxWidth: 520 }}>
            입학 절차는 간단합니다. 아래 단계를 따라 신청해 주세요.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 56, alignItems: 'start' }}>
            {/* Steps */}
            <div className="flex flex-col gap-0">
              {[
                { num: 1, title: '문의 및 상담', body: '이메일 또는 전화로 먼저 문의해 주세요. 학교에 대한 자세한 안내와 함께 자녀에게 맞는 반을 안내해 드립니다.' },
                { num: 2, title: '레벨 테스트', body: '한국어 실력에 따라 적합한 수준의 반에 배정하기 위해 간단한 테스트를 진행합니다. (초보자 환영!)' },
                { num: 3, title: '등록 및 수업 시작', body: '등록 서류 작성 및 수업료 납부 후 바로 수업에 참여하실 수 있습니다.' },
                { num: 4, title: '환영합니다! 🎉', body: '한민족 한글학교 가족이 된 것을 환영합니다. 즐겁고 의미 있는 시간이 되길 바랍니다.' },
              ].map(({ num, title, body }, i, arr) => (
                <div key={num} className="flex gap-6 step-connector">
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-full font-bold relative z-[1]"
                    style={{ width: 40, height: 40, background: '#1a7a6e', color: '#fff', fontSize: 14 }}
                  >
                    {num}
                  </div>
                  <div style={{ paddingBottom: i < arr.length - 1 ? 36 : 0 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0d2340', marginBottom: 6 }}>{title}</h4>
                    <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="rounded-3xl sticky top-[100px]" style={{ background: '#0d2340', padding: 48, color: '#fff' }}>
              <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>지금 문의하세요</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginBottom: 36 }}>입학 관련 궁금한 점을 자유롭게 문의해 주세요</p>

              {[
                { icon: '📞', label: '전화', value: '021 733 5706' },
                { icon: '✉️', label: '이메일', value: 'admin@nzsok.school.nz' },
                { icon: '📘', label: 'Facebook', value: 'newzealandschoolofkorea' },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 py-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center justify-center rounded-xl flex-shrink-0 text-lg" style={{ width: 42, height: 42, background: 'rgba(200,151,58,0.12)' }}>
                    {icon}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#c8973a', textTransform: 'uppercase', marginBottom: 2 }}>
                      {label}
                    </label>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{value}</span>
                  </div>
                </div>
              ))}

              <Link
                to="/admission"
                className="flex items-center justify-center no-underline font-bold rounded-xl mt-2 transition-all"
                style={{ background: '#c8973a', color: '#0d2340', padding: '14px 32px', fontSize: 15, width: '100%' }}
                onMouseOver={e => { e.currentTarget.style.background = '#e8b84b'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.background = '#c8973a'; e.currentTarget.style.transform = '' }}
              >
                입학 신청하기 →
              </Link>

              <div className="mt-7 rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#c8973a', textTransform: 'uppercase', marginBottom: 6 }}>
                  🗺 찾아오시는 길
                </h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  40 Sartors Avenue, Browns Bay<br />Auckland 0630, New Zealand
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="full" />
    </div>
  )
}
