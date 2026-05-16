import { Phone, Mail, Clock } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export default function Admission() {
  return (
    <div>
      <Navigation variant="simple" />

      {/* ── MAIN ──────────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 120px' }}>

        {/* 기본 정보 */}
        <section style={{ marginBottom: 80 }}>
          <span
            className="inline-flex items-center gap-2.5 mb-3"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9278D6' }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#9278D6' }} />
            학교 기본 정보
          </span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 40 }}>
            수업 일정 및 위치
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { icon: '📅', title: '수업 요일 & 시간', body: <span>매주 <strong>토요일</strong> 오전 9:00 – 11:30<br />뉴질랜드 학교 학기 중 운영<br />방학 기간 휴무</span> },
              { icon: '📍', title: '위치', body: <span><strong>40 Sartors Avenue</strong><br />Browns Bay, Auckland 0630<br />New Zealand</span> },
              { icon: '👶', title: '입학 대상', body: <span>한국어를 배우고자 하는<br />모든 어린이 환영<br /><strong>초보자도 걱정 없이 오세요!</strong></span> },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl"
                style={{ background: '#F5EFE3', border: '1px solid rgba(0,0,0,0.06)', padding: '28px 24px' }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 입학 절차 */}
        <section style={{ marginBottom: 80 }}>
          <span
            className="inline-flex items-center gap-2.5 mb-3"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9278D6' }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#9278D6' }} />
            입학 절차
          </span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 0 }}>
            4단계로 간단하게
          </h2>
          <div className="steps-horizontal">
            {[
              { num: 1, title: '문의 & 상담', body: '이메일 또는 전화로 문의해 주세요. 자녀에게 맞는 반을 안내해 드립니다.' },
              { num: 2, title: '레벨 테스트', body: '한국어 실력에 맞는 반 배정을 위해 간단한 구두 테스트를 진행합니다.' },
              { num: 3, title: '등록 & 납부', body: '등록 서류 작성 및 수업료 납부 후 수업 참여가 가능합니다.' },
              { num: 4, title: '수업 시작! 🎉', body: '한민족 한글학교 가족이 된 것을 환영합니다!' },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex flex-col items-center text-center px-4 relative z-[1]">
                <div
                  className="flex items-center justify-center rounded-full mb-5"
                  style={{
                    width: 56, height: 56,
                    background: '#E8E0F7', color: '#B49EE4',
                    fontFamily: "'SUIT', sans-serif", fontSize: 20, fontWeight: 700,
                    border: '3px solid #9278D6',
                    
                  }}
                >
                  {num}
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 8 }}>{title}</h4>
                <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 수업료 안내 */}
        <section style={{ marginBottom: 80 }}>
          <span
            className="inline-flex items-center gap-2.5 mb-3"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9278D6' }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#9278D6' }} />
            수업료 안내
          </span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 0 }}>
            학기별 수업료
          </h2>
          <table
            style={{
              width: '100%', borderCollapse: 'collapse', marginTop: 32,
              borderRadius: 16, overflow: 'hidden', 
            }}
          >
            <thead>
              <tr>
                {['구분', '내용', '금액', '비고'].map(h => (
                  <th key={h} style={{ background: '#E8E0F7', color: '#1c2b3a', padding: '16px 24px', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textAlign: 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['등록비', '최초 1회 (입학 시)', '문의 요망', '재등록 시 면제'],
                ['1학기 수업료', 'Term 1 (약 10주)', '문의 요망', '학기 시작 전 납부'],
                ['2학기 수업료', 'Term 2 (약 10주)', '문의 요망', '학기 시작 전 납부'],
                ['3학기 수업료', 'Term 3 (약 10주)', '문의 요망', '학기 시작 전 납부'],
                ['4학기 수업료', 'Term 4 (약 8주)', '문의 요망', '학기 시작 전 납부'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: '16px 24px', fontSize: 14, color: '#1c2b3a',
                        borderBottom: i < 4 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                        background: i % 2 === 1 ? '#F5EFE3' : '#fff',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 12, fontSize: 13, color: '#4a5f75', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.6 }}>
            <span style={{ flexShrink: 0, color: '#9278D6', fontWeight: 700 }}>※</span>
            정확한 수업료는 학기마다 변동될 수 있습니다. 자세한 금액은 이메일 또는 전화로 문의해 주세요.
          </p>
        </section>

        {/* 연락처 & 위치 */}
        <section style={{ marginBottom: 80 }}>
          <span
            className="inline-flex items-center gap-2.5 mb-3"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9278D6' }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#9278D6' }} />
            연락처 & 위치
          </span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 0 }}>
            지금 문의하세요
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 32 }}>
            <div className="rounded-3xl" style={{ background: '#E8E0F7', padding: 40 }}>
              <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 20, fontWeight: 700, color: '#1c2b3a', marginBottom: 24 }}>문의하기</h3>
              {[
                { icon: <Phone size={18} />, label: '전화', value: '021 733 5706', href: null },
                { icon: <Mail size={18} />, label: '이메일', value: 'admin@nzsok.school.nz', href: 'mailto:admin@nzsok.school.nz' },
                { icon: <InstagramIcon size={18} />, label: 'Instagram', value: 'nzsok.official', href: 'https://www.instagram.com/nzsok.official' },
                { icon: <Clock size={18} />, label: '문의 가능 시간', value: '월–금 오전 9시 – 오후 5시', href: null },
              ].map(({ icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
                >
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{ width: 40, height: 40, background: 'rgba(146,120,214,0.15)', color: '#9278D6' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#B49EE4', textTransform: 'uppercase', marginBottom: 2 }}>
                      {label}
                    </label>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: 14, color: '#9278D6', textDecoration: 'none' }}>
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 14, color: '#1c2b3a' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl" style={{ background: '#FAF7F2', padding: 40, border: '1px solid rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 20, fontWeight: 700, color: '#1c2b3a', marginBottom: 24 }}>찾아오시는 길</h3>
              <div
                className="rounded-2xl mb-4 overflow-hidden"
                style={{ background: '#F5EFE3', aspectRatio: '16/10', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=40+Sartors+Avenue,+Browns+Bay,+Auckland+0630,+New+Zealand&output=embed"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: 14 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="학교 위치"
                />
              </div>
              <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.7 }}>
                <strong style={{ color: '#1c2b3a', display: 'block', fontSize: 15, marginBottom: 4 }}>40 Sartors Avenue, Browns Bay</strong>
                Auckland 0630, New Zealand<br />
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#8a9ab0' }}>Browns Bay 지역, 대중교통 이용 가능</span>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div
          className="rounded-3xl text-center"
          style={{
            background: 'linear-gradient(135deg,#E8E0F7,#D0BFEF)',
            padding: '60px 48px',
          }}
        >
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: '#1c2b3a', marginBottom: 12 }}>
            지금 바로 입학 문의하세요
          </h2>
          <p style={{ color: '#4a5f75', fontSize: 15, marginBottom: 32 }}>
            궁금한 점이 있으시면 편하게 연락 주세요. 친절하게 안내해 드리겠습니다.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:admin@nzsok.school.nz"
              className="inline-flex items-center gap-2 font-bold rounded-xl no-underline transition-all"
              style={{ background: '#9278D6', color: '#fff', fontSize: 15, padding: '14px 32px' }}
              onMouseOver={e => { e.currentTarget.style.background = '#B49EE4'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={e => { e.currentTarget.style.background = '#9278D6'; e.currentTarget.style.transform = '' }}
            >
              ✉️ 이메일 문의하기
            </a>
            <a
              href="tel:02173356706"
              className="inline-flex items-center gap-2 font-medium rounded-xl no-underline transition-all"
              style={{ background: 'transparent', color: '#fff', fontSize: 15, padding: '14px 32px', border: '1px solid rgba(255,255,255,0.3)' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent' }}
            >
              📞 전화 문의하기
            </a>
          </div>
        </div>
      </main>

      <Footer variant="minimal" />
    </div>
  )
}
