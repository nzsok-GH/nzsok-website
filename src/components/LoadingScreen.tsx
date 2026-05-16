import { useEffect, useState } from "react";

interface Props {
  onDone?: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!onDone) return;
    // reveal: 1.1s  →  hold: 0.3s  →  fade-out: 0.4s
    const t1 = setTimeout(() => setExiting(true), 1400);
    const t2 = setTimeout(() => onDone(), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "var(--bg-50)",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.4s ease" : undefined,
        pointerEvents: exiting ? "none" : undefined,
      }}
    >
      <div className="relative" style={{ width: 128, height: 128 }}>
        {/* Ghost: barely-visible placeholder while fill rises */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain"
          style={{ filter: "grayscale(1) opacity(0.1)" }}
        />
        {/* Full-colour logo revealed bottom-to-top */}
        <img
          src="/logo.png"
          alt="NZ School of Korean"
          className="absolute inset-0 w-full h-full object-contain logo-reveal"
        />
      </div>
    </div>
  );
}
