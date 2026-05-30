// TEMPORARY landing-page A/B selector.
// Renders buttons 1–3 that swap between the current physics hero (1) and the
// non-interactive concept variants. Selection persists in localStorage so it
// survives reloads. Remove this island (and src/components/heroes/) once a
// direction is chosen.

import { useEffect, useState } from "react";
import HeroPhysics from "./HeroPhysics";
import Hero1Reveal from "./heroes/Hero1Reveal";
import Hero3Collage from "./heroes/Hero3Collage";

const VARIANTS = [
  { label: "물리 (현재)", Comp: HeroPhysics },
  { label: "타이포 조립", Comp: Hero1Reveal },
  { label: "포토 콜라주", Comp: Hero3Collage },
] as const;

const STORAGE_KEY = "nzsok-hero-variant";

export default function HeroSelector() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (!Number.isNaN(saved) && saved >= 0 && saved < VARIANTS.length) setSelected(saved);
  }, []);

  const choose = (n: number) => {
    setSelected(n);
    localStorage.setItem(STORAGE_KEY, String(n));
  };

  const Active = VARIANTS[selected].Comp;

  return (
    <>
      {/* Floating selector — temporary, sits just below the 72px nav */}
      <div
        style={{
          position: "fixed",
          top: 84,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 8px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #d0bfef",
          backdropFilter: "blur(12px)",
          maxWidth: "calc(100vw - 24px)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#8a9ab0",
            padding: "0 4px",
            letterSpacing: "0.04em",
          }}
        >
          시안
        </span>
        {VARIANTS.map((v, i) => {
          const isActive = i === selected;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              title={v.label}
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                border: isActive ? "1px solid #9278d6" : "1px solid transparent",
                background: isActive ? "#9278d6" : "transparent",
                color: isActive ? "#fff" : "#4a5f75",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <Active />
    </>
  );
}
