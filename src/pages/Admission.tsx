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
      <Navigation />

      {/* ── MAIN ──────────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 120px' }}>

        {/* 수업 일정 및 위치 */}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28 }}>
            {/* 수업 시간 */}
            <div className="rounded-2xl" style={{ background: '#F5EFE3', border: '1px solid rgba(0,0,0,0.06)', padding: '32px 28px' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>📅</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 12 }}>수업 요일 & 시간</h3>
              <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.9 }}>
                매주 <strong style={{ color: '#1c2b3a' }}>토요일</strong> 오전 9:00 – 11:30<br />
                뉴질랜드 학교 학기 중 운영<br />
                방학 기간 휴무
              </p>
            </div>

            {/* 지도 */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', aspectRatio: '1.42 / 1' }}>
              <iframe
                src="https://maps.google.com/maps?q=40+Sartors+Avenue,+Browns+Bay,+Auckland+0630,+New+Zealand&output=embed"
                style={{ width: '100%', flex: 1, minHeight: 0, border: 'none', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="학교 위치"
              />
              <div style={{ padding: '16px 20px', background: '#FAF7F2' }}>
                <p style={{ fontSize: 14, color: '#1c2b3a', fontWeight: 600, marginBottom: 2 }}>40 Sartors Avenue, Browns Bay</p>
                <p style={{ fontSize: 13, color: '#4a5f75' }}>Auckland 0630, New Zealand</p>
              </div>
            </div>
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

        {/* 문의하기 */}
        <section>
          <span
            className="inline-flex items-center gap-2.5 mb-3"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9278D6' }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#9278D6' }} />
            연락처
          </span>
          <h2 style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3, marginBottom: 8 }}>
            궁금하신 게 있으신가요?
          </h2>
          <p style={{ fontSize: 15, color: '#4a5f75', lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}>
            저희 학교는 학부모님과 자원봉사자들이 함께 운영하는 작은 공동체입니다.<br />
            편하게 연락 주시면 성심껏 안내해 드리겠습니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              {
                icon: <Phone size={22} />,
                label: '전화',
                value: '021 733 5706',
                sub: '월–금 오전 9시 – 오후 5시',
                href: 'tel:02173356706',
              },
              {
                icon: <Mail size={22} />,
                label: '이메일',
                value: 'admin@nzsok.school.nz',
                sub: '답변까지 1–2 영업일 소요',
                href: 'mailto:admin@nzsok.school.nz',
              },
              {
                icon: <InstagramIcon size={22} />,
                label: 'Instagram',
                value: '@nzsok.official',
                sub: '학교 소식 및 근황',
                href: 'https://www.instagram.com/nzsok.official',
              },
            ].map(({ icon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="rounded-2xl no-underline block"
                style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '28px 24px', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#B49EE4'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(146,120,214,0.12)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-5"
                  style={{ width: 48, height: 48, background: '#E8E0F7', color: '#9278D6' }}
                >
                  {icon}
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B49EE4', marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1c2b3a', marginBottom: 4 }}>{value}</p>
                <p style={{ fontSize: 12, color: '#8a9ab0' }}>{sub}</p>
              </a>
            ))}
          </div>

          <div
            className="rounded-2xl flex items-center gap-4"
            style={{ background: '#F5EFE3', border: '1px solid rgba(0,0,0,0.06)', padding: '20px 28px', marginTop: 20 }}
          >
            <Clock size={18} style={{ color: '#9278D6', flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: '#1c2b3a' }}>문의 가능 시간</strong>은 월요일부터 금요일, 오전 9시부터 오후 5시까지입니다.
              토요일 수업 중 직접 담당 선생님께 여쭤보셔도 됩니다.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
