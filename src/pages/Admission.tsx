import { Phone, Mail, ExternalLink } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)


const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(24px,3vw,36px)' as const,
  fontWeight: 700, color: '#1c2b3a', lineHeight: 1.3,
}

export default function Admission() {
  return (
    <div>
      <Navigation />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 120px' }}>

        {/* 수업 일정 및 위치 */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 40 }}>수업 일정 및 위치</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28 }}>
            {/* 수업 시간 */}
            <div className="rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '32px 28px' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 4 }}>수업 시간표</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                {[
                  { label: '1교시', time: '10:00 – 10:40', note: null },
                  { label: '2교시', time: '10:50 – 11:30', note: '점심시간 11:30 – 12:10' },
                  { label: '3교시', time: '12:10 – 12:50', note: null },
                  { label: '4교시', time: '13:00 – 13:40', note: null },
                  { label: '특강', time: '13:50 – 15:00', note: '선택 수업', special: true },
                ].map(({ label, time, note, special }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                    style={{ paddingBlock: 4 }}
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 11, fontWeight: 700, color: special ? '#B49EE4' : '#9278D6', width: 32, flexShrink: 0 }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1c2b3a' }}>{time}</span>
                    </div>
                    {note && <span style={{ fontSize: 11, color: '#8a9ab0' }}>{note}</span>}
                  </div>
                ))}
              </div>
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

        {/* 등록 절차 */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 48 }}>등록 절차</h2>

          {/* 입학원서 링크 */}
          <div
            className="rounded-2xl flex items-center justify-between gap-6"
            style={{ background: '#E8E0F7', border: '1px solid rgba(146,120,214,0.2)', padding: '24px 32px', marginBottom: 28 }}
          >
            <div>
              <p style={{ fontSize: 13, color: '#6b5aa0', marginBottom: 4 }}>링크를 누르면 바로 입학원서를 작성하실 수 있습니다.</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a' }}>뉴질랜드 한민족 한글학교 입학원서 2026</p>
            </div>
            <a
              href="https://forms.office.com/r/bRMHMZQF65"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-xl no-underline flex-shrink-0"
              style={{ fontSize: 14, fontWeight: 700, padding: '12px 24px' }}
            >
              양식 작성 <ExternalLink size={15} />
            </a>
          </div>

          {/* 2 steps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {[
              {
                num: 1,
                title: '입학 원서 제출',
                body: '입학 원서를 작성해 제출해 주세요. 교감 선생님께서 확인 이메일을 보내드립니다.',
              },
              {
                num: 2,
                title: '학비 납부',
                body: '학비 입금이 확인되면 2026학년도 등록이 최종 완료됩니다.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '28px 28px' }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 40, height: 40, background: '#E8E0F7', color: '#9278D6', fontSize: 17, fontWeight: 700, fontFamily: "'SUIT', sans-serif", marginBottom: 20 }}
                >
                  {num}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl flex items-start gap-3" style={{ background: '#FFF8EC', border: '1px solid rgba(212,170,80,0.25)', padding: '16px 20px' }}>
            <span style={{ color: '#c8963a', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>※</span>
            <p style={{ fontSize: 13, color: '#6b5000', lineHeight: 1.6, margin: 0 }}>
              입학 원서만 제출하신 경우에는 등록이 완료되지 않습니다. 학비 납부까지 완료하셔야 등록이 확정됩니다.
            </p>
          </div>
        </section>

        {/* 학비 안내 */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>학비 안내</h2>

          {/* 정규 수업 학비 + 다자녀 할인 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div className="rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '32px 36px' }}>
              <p style={{ fontSize: 13, color: '#8a9ab0', marginBottom: 6 }}>정규 한국어 수업 · 연 학비</p>
              <div className="flex items-baseline gap-3">
                <span style={{ fontFamily: "'SUIT', sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, color: '#9278D6', lineHeight: 1 }}>$450</span>
                <span style={{ fontSize: 14, color: '#4a5f75' }}>/ 년</span>
              </div>
              <p style={{ fontSize: 13, color: '#4a5f75', marginTop: 8, lineHeight: 1.6 }}>
                학비는 1년 전체 학비(연 학비)입니다.<br />
                학비 납부가 완료되어야 등록이 확정됩니다.
              </p>
            </div>

            <div className="rounded-2xl" style={{ background: '#E8E0F7', border: '1px solid rgba(146,120,214,0.15)', padding: '32px 36px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#7a62c0', letterSpacing: '0.06em', marginBottom: 16 }}>다자녀 학비 할인</p>
              {[
                { label: '첫째', amount: '$450' },
                { label: '둘째', amount: '$430', note: '$20 할인' },
                { label: '셋째', amount: '$225', note: '50% 할인' },
              ].map(({ label, amount, note }) => (
                <div key={label} className="flex items-center justify-between" style={{ paddingBlock: 8, borderBottom: label !== '셋째' ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                  <span style={{ fontSize: 14, color: '#4a5f75' }}>{label}</span>
                  <div className="flex items-center gap-2">
                    {note && <span style={{ fontSize: 11, color: '#9278D6', background: 'rgba(146,120,214,0.12)', padding: '2px 7px', borderRadius: 99 }}>{note}</span>}
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#1c2b3a' }}>{amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 특강 */}
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1c2b3a', marginBottom: 14, marginTop: 36 }}>
            특강 안내 <span style={{ fontSize: 13, fontWeight: 400, color: '#8a9ab0' }}>— 선택 수업 · 별도 신청</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 36 }}>
            {[
              {
                emoji: '🎨',
                title: '미술',
                levels: ['미술 1 (만 4세)', '미술 2 (만 5세)', '미술 3 (초1–초3)', '미술 4 (초4 이상)'],
                fee: '$350',
                note: '재료비 $20 포함',
              },
              {
                emoji: '🧩',
                title: '4D 프레임',
                levels: ['초2 이상'],
                fee: '$360',
                note: '재료비 $30 포함',
              },
              {
                emoji: '🥋',
                title: '태권도',
                levels: ['만 5세 개나리반 이상'],
                fee: '$330',
                note: null,
              },
              {
                emoji: '🎻',
                title: '바이올린',
                levels: ['바이올린 1 (기초반)', '바이올린 2 (중·고급반)', '만 5세부터 신청 가능'],
                fee: '$330',
                note: null,
              },
            ].map(({ emoji, title, levels, fee, note }) => (
              <div key={title} className="rounded-2xl flex flex-col" style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '24px 20px' }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{emoji}</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1c2b3a', marginBottom: 10 }}>{title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {levels.map(l => (
                    <li key={l} style={{ fontSize: 12, color: '#4a5f75', lineHeight: 1.7 }}>· {l}</li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: 'auto', paddingTop: 14 }}>
                  <p style={{ fontSize: 17, fontWeight: 800, color: '#9278D6', fontFamily: "'SUIT', sans-serif" }}>{fee}</p>
                  <p style={{ fontSize: 11, color: '#8a9ab0', marginTop: 2, minHeight: 16 }}>{note ?? ''}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 학비 납부 */}
          <div className="rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '28px 32px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: '#9278D6', textTransform: 'uppercase', marginBottom: 16 }}>학비 납부 — 인터넷 뱅킹</p>
            {[
              { label: '계좌명', value: 'The NZ School of Korea Charitable Trust' },
              { label: '계좌번호', value: 'ANZ 01-0277-0861225-51' },
              { label: 'Reference', value: '학생 이름(영문) / 출생연월 · 예) HongGildong1105' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-6" style={{ paddingBlock: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8a9ab0', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0, width: 72 }}>{label}</span>
                <span style={{ fontSize: 14, color: '#1c2b3a' }}>{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 문의하기 */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>궁금하신 게 있으신가요?</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: <Phone size={20} />, value: '021 391 106', href: 'tel:021391106' },
              { icon: <Mail size={20} />, value: 'wrjang@nzsok.school.nz', href: 'mailto:wrjang@nzsok.school.nz' },
              { icon: <InstagramIcon size={20} />, value: '@nzsok.official', href: 'https://www.instagram.com/nzsok.official' },
            ].map(({ icon, value, href }) => (
              <a
                key={value}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="rounded-2xl no-underline flex items-center gap-4"
                style={{ background: '#FAF7F2', border: '1px solid rgba(0,0,0,0.07)', padding: '20px 24px' }}
              >
                <span style={{ color: '#8a9ab0', flexShrink: 0 }}>{icon}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1c2b3a' }}>{value}</p>
              </a>
            ))}
          </div>

        </section>

      </main>

      <Footer />
    </div>
  )
}
