import { Phone, Mail, ExternalLink } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const H2_STYLE = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)" as const,
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
};

export default function Enrol() {
  return (
    <div>
      <Navigation />

      <main className="enrol-main">
        {/* 등록 절차 */}
        <section
          id="procedure"
          style={{ marginBottom: 80, scrollMarginTop: 100 }}
        >
          <h2 style={{ ...H2_STYLE, marginBottom: 48 }}>등록 절차</h2>

          {/* 2 steps */}
          <div className="enrol-procedure-grid">
            {/* Step 1 — manual to include the CTA button */}
            <div style={{ padding: "4px 0" }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  background: "#E8E0F7",
                  color: "#9278D6",
                  fontSize: 17,
                  fontWeight: 700,
                  fontFamily: "'SUIT', sans-serif",
                  marginBottom: 20,
                }}
              >
                1
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1c2b3a",
                  marginBottom: 8,
                }}
              >
                입학 원서 제출
              </h3>
              <p style={{ fontSize: 13, color: "#4a5f75", lineHeight: 1.7, marginBottom: 16 }}>
                입학 원서를 작성해 제출해 주세요. 교감 선생님께서 확인 이메일을 보내드립니다.
              </p>
              <a
                href="https://forms.office.com/r/bRMHMZQF65"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-xl no-underline"
                style={{ fontSize: 13, fontWeight: 700, padding: "10px 20px" }}
              >
                양식 작성 <ExternalLink size={14} />
              </a>
            </div>

            {/* Step 2 */}
            <div style={{ padding: "4px 0" }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  background: "#E8E0F7",
                  color: "#9278D6",
                  fontSize: 17,
                  fontWeight: 700,
                  fontFamily: "'SUIT', sans-serif",
                  marginBottom: 20,
                }}
              >
                2
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1c2b3a",
                  marginBottom: 8,
                }}
              >
                학비 납부
              </h3>
              <p style={{ fontSize: 13, color: "#4a5f75", lineHeight: 1.7 }}>
                학비 입금이 확인되면 2026학년도 등록이 최종 완료됩니다.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl flex items-start gap-3"
            style={{
              background: "#FFF8EC",
              border: "1px solid rgba(212,170,80,0.25)",
              padding: "16px 20px",
            }}
          >
            <span
              style={{
                color: "#c8963a",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              ※
            </span>
            <p
              style={{
                fontSize: 13,
                color: "#6b5000",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              입학 원서만 제출하신 경우에는 등록이 완료되지 않습니다. 학비
              납부까지 완료하셔야 등록이 확정됩니다.
            </p>
          </div>
        </section>

        {/* 학비 */}
        <section
          id="tuition"
          style={{ marginBottom: 80, scrollMarginTop: 100 }}
        >
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>학비</h2>

          {/* 정규 수업 학비 + 다자녀 할인 */}
          <div className="enrol-tuition-grid">
            <div style={{ padding: "4px 0" }}>
              <p style={{ fontSize: 13, color: "#8a9ab0", marginBottom: 6 }}>
                정규 수업
              </p>
              <div className="flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: "'SUIT', sans-serif",
                    fontSize: "clamp(36px,5vw,52px)",
                    fontWeight: 800,
                    color: "#9278D6",
                    lineHeight: 1,
                  }}
                >
                  $450
                </span>
                <span style={{ fontSize: 14, color: "#4a5f75" }}>/ 년</span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#4a5f75",
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                학비는 1년 전체 학비(연 학비)입니다.
                <br />
                학비 납부가 완료되어야 등록이 확정됩니다.
              </p>
            </div>

            <div
              className="rounded-2xl"
              style={{
                background: "#E8E0F7",
                border: "1px solid rgba(146,120,214,0.15)",
                padding: "32px 36px",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#7a62c0",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                다자녀 학비 할인
              </p>
              {[
                { label: "첫째", amount: "$450" },
                { label: "둘째", amount: "$430", note: "$20 할인" },
                { label: "셋째", amount: "$225", note: "50% 할인" },
              ].map(({ label, amount, note }) => (
                <div
                  key={label}
                  className="flex items-center justify-between"
                  style={{
                    paddingBlock: 8,
                    borderBottom:
                      label !== "셋째" ? "1px solid rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#4a5f75" }}>
                    {label}
                  </span>
                  <div className="flex items-center gap-2">
                    {note && (
                      <span
                        style={{
                          fontSize: 11,
                          color: "#9278D6",
                          background: "rgba(146,120,214,0.12)",
                          padding: "2px 7px",
                          borderRadius: 99,
                        }}
                      >
                        {note}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#1c2b3a",
                      }}
                    >
                      {amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 특강 */}
          <h3
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1c2b3a",
              marginBottom: 14,
              marginTop: 36,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "#8a9ab0",
                marginBottom: 24,
              }}
            >
              선택 수업
            </span>
            <br />
          </h3>
          <div className="enrol-classes-grid">
            {[
              {
                title: "미술",
                levels: [
                  "미술 1 (다람쥐반)",
                  "미술 2 (개나리반)",
                  "미술 3 (초등부 저학년)",
                  "미술 4 (초등부 4학년 이상)",
                ],
                fee: "$350",
                note: "재료비 $20 포함",
              },
              {
                title: "4D 프레임",
                levels: ["초등부 2학년 이상"],
                fee: "$360",
                note: "재료비 $30 포함",
              },
              {
                title: "태권도",
                levels: ["개나리반 이상"],
                fee: "$330",
                note: null,
              },
              {
                title: "바이올린",
                levels: ["바이올린 1 (기초반)", "바이올린 2 (중·고급반)"],
                fee: "$330",
                note: null,
              },
            ].map(({ title, levels, fee, note }) => (
              <div
                key={title}
                className="rounded-2xl flex flex-col"
                style={{
                  background: "#FAF7F2",
                  border: "1px solid rgba(0,0,0,0.07)",
                  padding: "24px 20px",
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1c2b3a",
                    marginBottom: 10,
                  }}
                >
                  {title}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, paddingBottom: 12 }}>
                  {levels.map((l) => (
                    <li
                      key={l}
                      style={{
                        fontSize: 12,
                        color: "#4a5f75",
                        lineHeight: 1.7,
                      }}
                    >
                      · {l}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.07)",
                    marginTop: "auto",
                    paddingTop: 14,
                  }}
                >
                  <p
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#9278D6",
                      fontFamily: "'SUIT', sans-serif",
                    }}
                  >
                    {fee}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#8a9ab0",
                      marginTop: 2,
                      minHeight: 16,
                    }}
                  >
                    {note ?? ""}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 학비 납부 */}
          <div style={{ padding: "4px 0" }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#9278D6",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              학비 납부
            </p>
            {[
              {
                label: "계좌명",
                value: "The NZ School of Korea Charitable Trust",
              },
              { label: "계좌번호", value: "ANZ 01-0277-0861225-51" },
              {
                label: "레퍼런스",
                value: "학생 이름(영문) / 출생연월 · 예) HongGildong1105",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline gap-6"
                style={{ paddingBlock: 8 }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#8a9ab0",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                    width: 72,
                  }}
                >
                  {label}
                </span>
                <span style={{ fontSize: 14, color: "#1c2b3a" }}>{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 문의하기 */}
        <section
          id="contact"
          style={{ marginBottom: 80, scrollMarginTop: 100 }}
        >
          <h2 style={{ ...H2_STYLE, marginBottom: 32 }}>입학 문의</h2>

          <div
            className="rounded-2xl enrol-contact-card"
            style={{
              background: "#FAF7F2",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {/* 담당자 */}
            <div className="enrol-contact-person">
              <p style={{ fontSize: 13, color: "#8a9ab0", marginBottom: 4 }}>교감</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#1c2b3a" }}>장우리</p>
            </div>

            <div className="enrol-contact-divider" />

            {/* 연락처 */}
            <div className="enrol-contact-links">
              {[
                {
                  icon: <Phone size={16} />,
                  value: "021 391 106",
                  href: "tel:021391106",
                },
                {
                  icon: <Mail size={16} />,
                  value: "wrjang@nzsok.school.nz",
                  href: "mailto:wrjang@nzsok.school.nz",
                },
              ].map(({ icon, value, href }) => (
                <a
                  key={value}
                  href={href}
                  className="no-underline flex items-center gap-3"
                  style={{ color: "#1c2b3a" }}
                >
                  <span style={{ color: "#8a9ab0", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
