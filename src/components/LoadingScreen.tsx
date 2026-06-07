import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * Intro loading motion — the logo reveals bottom-to-top, holds, then fades.
 * Rendered in the layout with `client:load transition:persist`, so it plays
 * once on a full page load and is NOT replayed on View Transition navigations.
 */
function LoadingScreenInner() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // reveal: 1.1s  →  hold: 0  →  fade-out: 0.25s
    const t1 = setTimeout(() => setExiting(true), 1100);
    const t2 = setTimeout(() => setDone(true), 1350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      aria-hidden
      style={{
        background: "var(--bg-50)",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.25s ease" : undefined,
        pointerEvents: "none",
        display: done ? "none" : undefined,
      }}
    >
      <div className="relative" style={{ width: 128, height: 128 }}>
        {/* Ghost: barely-visible placeholder while fill rises */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          width={310}
          height={293}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ filter: "grayscale(1) opacity(0.1)" }}
        />
        {/* Full-colour logo revealed bottom-to-top */}
        <img
          src="/logo.png"
          alt="NZ School of Korean"
          width={310}
          height={293}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain logo-reveal"
        />
      </div>
    </div>
  );
}

export default function LoadingScreen() {
  return (
    <ErrorBoundary name="LoadingScreen">
      <LoadingScreenInner />
    </ErrorBoundary>
  );
}
