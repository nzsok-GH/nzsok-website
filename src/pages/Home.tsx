import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Calendar } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export default function Home() {

  return (
    <div>
      <Navigation variant="full" transparent />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        id="top"
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '100vh', background: '#E8E0F7' }}
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
              background: 'rgba(146,120,214,0.12)',
              border: '1px solid rgba(146,120,214,0.3)',
              padding: '6px 16px',
            }}
          >
            <div
              className="hero-badge-dot w-1.5 h-1.5 rounded-full"
              style={{ background: '#9278D6' }}
            />
            <span style={{ color: '#B49EE4', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              뉴질랜드 · 오클랜드 · Browns Bay
            </span>
          </div>

          <h1
            className="anim-delay-2"
            style={{
              fontFamily: "'SUIT', sans-serif",
              fontSize: 'clamp(36px,6vw,72px)',
              fontWeight: 900,
              color: '#1c2b3a',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            뉴질랜드<br />
            <em style={{ fontStyle: 'normal', color: '#B49EE4' }}>한민족 한글학교</em>
          </h1>

          <p
            className="anim-delay-3"
            style={{
              fontFamily: "'SUIT', sans-serif",
              fontSize: 'clamp(16px,2vw,22px)',
              color: '#4a5f75',
              marginBottom: 12,
              letterSpacing: '0.04em',
            }}
          >
            New Zealand School of Korea
          </p>
          <p
            className="anim-delay-35"
            style={{ fontSize: 15, color: '#9278D6', letterSpacing: '0.06em', marginBottom: 48, fontStyle: 'italic' }}
          >
            "긍정적인 생활태도와 이중문화 소유자 · Think positively and be bicultural"
          </p>

          <div className="flex gap-4 flex-wrap anim-delay-45">
            <Link
              to="/admission"
              className="btn-primary inline-flex items-center gap-2.5 font-bold rounded-xl no-underline"
              style={{ fontSize: 15, padding: '15px 32px' }}
            >
              <span>입학 안내 보기</span><span>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 font-medium rounded-xl no-underline transition-all"
              style={{
                background: 'transparent', color: '#1c2b3a', fontSize: 15, padding: '15px 32px',
                border: '1px solid rgba(0,0,0,0.18)',
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'
                e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span>학교 소개</span>
            </Link>
          </div>

          <div
            className="flex gap-10 mt-16 pt-12 flex-wrap anim-delay-55"
            style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
          >
            {[['1997', '설립 연도'], ['28+', '운영 연수'], ['200+', '재학생']].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span style={{ fontFamily: "'SUIT', sans-serif", fontSize: 36, fontWeight: 700, color: '#9278D6', lineHeight: 1 }}>
                  {num}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO STRIP ──────────────────────────────────── */}
      <div style={{ background: '#E8E0F7', padding: '0 48px' }}>
        <div className="info-strip-inner">
          {[
            { icon: <MapPin size={22} />, iconBg: 'rgba(168,212,184,0.3)', iconColor: '#4a9a6a', title: '위치', body: '40 Sartors Avenue\nBrowns Bay, Auckland 0630' },
            { icon: <Phone size={22} />, iconBg: 'rgba(168,196,232,0.3)', iconColor: '#4a7ab0', title: '연락처', body: '021 733 5706\nadmin@nzsok.school.nz' },
            { icon: <Calendar size={22} />, iconBg: 'rgba(245,224,154,0.4)', iconColor: '#9a8030', title: '수업 일정', body: '매주 토요일\n학기 중 운영 · 상세 일정 확인' },
          ].map(({ icon, iconBg, iconColor, title, body }) => (
            <div key={title} className="info-card-strip">
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 48, height: 48, background: iconBg, color: iconColor }}
              >
                {icon}
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9278D6', marginBottom: 6 }}>
                  {title}
                </h3>
                <p style={{ color: '#4a5f75', fontSize: 14, lineHeight: 1.65 }}>
                  {body.split('\n').map((line, i) => <span key={i}>{line}{i < body.split('\n').length - 1 && <br />}</span>)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ──────────────────────────────────────── */}
      <section id="about" style={{ background: '#FAF7F2', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line">학교 소개</span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.25, marginBottom: 16 }}>
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
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)',  padding: '36px 28px' }}
              >
                <div style={{ fontFamily: "'SUIT', sans-serif", fontSize: 52, fontWeight: 900, color: '#9278D6', lineHeight: 1, marginBottom: 8 }}>
                  {num}<span style={{ fontSize: 24 }}>+</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1c2b3a', marginBottom: 6 }}>{unit}</div>
                <div style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.6 }}>
                  {desc.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-10 justify-center flex-wrap">
            <Link
              to="/about"
              className="btn-primary inline-flex items-center gap-2 rounded-xl no-underline font-semibold"
              style={{ padding: '14px 32px', fontSize: 15, letterSpacing: '0.02em' }}
            >
              학교소개 자세히 보기 →
            </Link>
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 rounded-xl no-underline font-semibold transition-all"
              style={{ padding: '14px 32px', background: 'transparent', color: '#9278D6', fontSize: 15, border: '2px solid #9278D6' }}
              onMouseOver={e => { e.currentTarget.style.background = '#9278D6'; e.currentTarget.style.color = '#fff' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9278D6' }}
            >
              입학 안내
            </Link>
          </div>
        </div>
      </section>

      {/* ── ADMISSION SNIPPET ────────────────────────────── */}
      <section id="admission" style={{ background: '#FDFCFA', padding: '100px 48px' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label-line">입학 안내</span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.25, marginBottom: 16 }}>
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
                    style={{ width: 40, height: 40, background: '#9278D6', color: '#fff', fontSize: 14 }}
                  >
                    {num}
                  </div>
                  <div style={{ paddingBottom: i < arr.length - 1 ? 36 : 0 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 6 }}>{title}</h4>
                    <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="rounded-3xl sticky top-[100px]" style={{ background: '#E8E0F7', padding: 48 }}>
              <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 24, fontWeight: 700, color: '#1c2b3a', marginBottom: 8 }}>지금 문의하세요</h3>
              <p style={{ color: '#4a5f75', fontSize: 14, marginBottom: 36 }}>입학 관련 궁금한 점을 자유롭게 문의해 주세요</p>

              {[
                { icon: <Phone size={18} />, label: '전화', value: '021 733 5706' },
                { icon: <Mail size={18} />, label: '이메일', value: 'admin@nzsok.school.nz' },
                { icon: <InstagramIcon size={18} />, label: 'Instagram', value: 'nzsok.official' },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 py-4"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 42, height: 42, background: 'rgba(146,120,214,0.15)', color: '#9278D6' }}>
                    {icon}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#9278D6', textTransform: 'uppercase', marginBottom: 2 }}>
                      {label}
                    </label>
                    <span style={{ fontSize: 14, color: '#1c2b3a' }}>{value}</span>
                  </div>
                </div>
              ))}

              <Link
                to="/admission"
                className="btn-primary flex items-center justify-center no-underline font-bold rounded-xl mt-2"
                style={{ padding: '14px 32px', fontSize: 15, width: '100%' }}
              >
                입학 신청하기 →
              </Link>

              <div className="mt-7 rounded-xl p-5" style={{ background: 'rgba(146,120,214,0.08)', border: '1px solid rgba(146,120,214,0.15)' }}>
                <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#9278D6', textTransform: 'uppercase', marginBottom: 6 }}>
                  🗺 찾아오시는 길
                </h4>
                <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.6 }}>
                  40 Sartors Avenue, Browns Bay<br />Auckland 0630, New Zealand
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
