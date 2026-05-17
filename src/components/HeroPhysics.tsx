import { useEffect, useRef } from "react";
import Matter from "matter-js";

const JASO = ["ㅎ", "ㅏ", "ㄴ", "ㅁ", "ㅣ", "ㄴ", "ㅈ", "ㅗ", "ㄱ"] as const;

const PALETTE = [
  { bg: "#9278D6", fg: "#FAF7F2" },
  { bg: "#1c2b3a", fg: "#E8E0F7" },
  { bg: "#B49EE4", fg: "#1c2b3a" },
  { bg: "#9278D6", fg: "#FAF7F2" },
  { bg: "#1c2b3a", fg: "#B49EE4" },
  { bg: "#7B5FC7", fg: "#FAF7F2" },
  { bg: "#B49EE4", fg: "#1c2b3a" },
  { bg: "#1c2b3a", fg: "#FAF7F2" },
  { bg: "#9278D6", fg: "#FAF7F2" },
];

export default function HeroPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const { Engine, Bodies, Body, World, Composite } = Matter;

    const dpr = window.devicePixelRatio || 1;
    const W = section.clientWidth;
    const H = section.clientHeight;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const R = Math.min(W * 0.07, H * 0.085, 164);
    const CR = R * 0.72; // collision radius — tuned to glyph size at 2× font
    const FONT_SIZE = R * 1.25 * 2;

    // Preload logo image
    const logoImg = new Image();
    logoImg.src = "/logo.png";

    const engine = Engine.create();
    engine.gravity.scale = 0.2;
    engine.gravity.y = 0;
    engine.gravity.x = 0;

    const navH =
      (document.querySelector("nav") as HTMLElement | null)?.clientHeight ?? 70;

    const wallOpts = {
      isStatic: true,
      label: "wall",
      friction: 0.05,
      restitution: 0.7,
    };
    World.add(engine.world, [
      Bodies.rectangle(W / 2, H + 25, W + 200, 50, wallOpts), // floor
      Bodies.rectangle(W / 2, navH - 25, W + 200, 50, wallOpts), // ceiling just below nav
      Bodies.rectangle(-25, H / 2, 50, H + 200, wallOpts), // left
      Bodies.rectangle(W + 25, H / 2, 50, H + 200, wallOpts), // right
    ]);

    const ballProps = {
      density: 8e-6,
      frictionAir: 0.006,
      restitution: 0.65,
      friction: 0.01,
    };

    // Natural Korean syllable layout for 한민족.
    // 한/민: initial(top-left) + vowel(top-right) + final(bottom-center)
    // 족: vertical stack — initial(top) + vowel(mid) + final(bottom)
    const syl = R * 4.0; // centre-to-centre syllable spacing (2× wider for 2× font)
    const cx = W * 0.54; // centre of 민 — shifted left to keep 족 on-screen
    const cy = H * 0.38;

    const han = cx - syl;
    const min = cx;
    const jok = cx + syl;

    const START_POSITIONS = [
      { x: han - R * 1.1, y: cy - R * 1.0 }, // ㅎ  top-left
      { x: han + R * 0.82, y: cy - R * 0.7 }, // ㅏ  top-right
      { x: han - R * 0.16, y: cy + R * 1.5 }, // ㄴ  bottom
      { x: min - R * 1.1, y: cy - R * 1.0 }, // ㅁ  top-left
      { x: min + R * 0.82, y: cy - R * 0.7 }, // ㅣ  top-right
      { x: min - R * 0.16, y: cy + R * 1.5 }, // ㄴ  bottom
      { x: jok, y: cy - R * 1.8 }, // ㅈ  top
      { x: jok, y: cy }, // ㅗ  mid
      { x: jok, y: cy + R * 1.8 }, // ㄱ  bottom
    ];

    const LOGO_START = { x: han - syl * 1.1, y: cy };

    // Each jaso launches in its own slice of the circle (40° apart)
    const LAUNCH_SPEED = 0.5;
    const START_VELOCITIES = JASO.map((_, i) => {
      const angle = (i / JASO.length) * Math.PI * 2;
      return { x: Math.cos(angle) * LAUNCH_SPEED, y: Math.sin(angle) * LAUNCH_SPEED };
    });

    const jasoBodies = JASO.map((char, i) => {
      const pos = START_POSITIONS[i];
      const body = Bodies.circle(pos.x, pos.y, CR, {
        ...ballProps,
        label: "jaso",
      });
      Body.setVelocity(body, START_VELOCITIES[i]);
      (body as any)._jaso = char;
      (body as any)._pal = PALETTE[i];
      return body;
    });

    // Logo ball — slightly larger for visual emphasis
    const LR = CR * 1.15;
    const LR_DRAW = LR * 1.5;
    const logoBall = Bodies.circle(LOGO_START.x, LOGO_START.y, LR, {
      ...ballProps,
      label: "logo",
    });
    Body.setVelocity(logoBall, {
      x: (Math.random() - 0.5) * 1,
      y: (Math.random() - 0.5) * 1,
    });

    World.add(engine.world, [...jasoBodies, logoBall]);

    // Physical cursor — a static circle that teleports to the mouse each frame and
    // collides naturally with the jaso/logo bodies. Starts off-screen.
    const CURSOR_R = 12;
    const cursorBody = Bodies.circle(-500, -500, CURSOR_R, {
      isStatic: true,
      label: "cursor",
      restitution: 0.8,
      friction: 0,
      frictionAir: 0,
    });
    World.add(engine.world, cursorBody);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      Body.setPosition(cursorBody, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const onMouseLeave = () =>
      Body.setPosition(cursorBody, { x: -500, y: -500 });
    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      Body.setPosition(cursorBody, {
        x: t.clientX - rect.left,
        y: t.clientY - rect.top,
      });
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });

    // Unique phase offset per body so each floats independently
    const PHASES = JASO.map((_, i) => (i / JASO.length) * Math.PI * 2);

    let rafId = 0;
    let tick = 0;

    const loop = () => {
      tick += 0.006;

      // Apply gentle water-surface forces to each jaso
      jasoBodies.forEach((body, i) => {
        const p = PHASES[i];
        const fx =
          Math.sin(tick * 1.1 + p) * 0.000022 +
          Math.sin(tick * 0.6 + p * 1.7) * 0.000012;
        const fy =
          Math.cos(tick * 0.8 + p * 1.3) * 0.000022 +
          Math.cos(tick * 1.4 + p * 0.9) * 0.000012;
        Body.applyForce(body, body.position, { x: fx, y: fy });
      });
      Body.applyForce(logoBall, logoBall.position, {
        x: Math.sin(tick * 0.9 + 1.2) * 0.000028,
        y: Math.cos(tick * 0.7 + 2.5) * 0.000028,
      });

      Engine.update(engine, 1000 / 60);

      // Cap speed so bodies can't tunnel through walls after hard collisions or fast drags
      const MAX_SPEED = 18;
      for (const body of Composite.allBodies(engine.world)) {
        if (!body.isStatic) {
          const { x: vx, y: vy } = body.velocity;
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > MAX_SPEED) {
            Body.setVelocity(body, {
              x: (vx / speed) * MAX_SPEED,
              y: (vy / speed) * MAX_SPEED,
            });
          }
        }
      }

      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${FONT_SIZE}px 'KerisKedyuche', sans-serif`;

      // Draw jaso — letters only, no circle background
      for (const body of jasoBodies) {
        const { x, y } = body.position;
        const { bg } = (body as any)._pal;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);

        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = bg;
        ctx.fillText((body as any)._jaso, 0, FONT_SIZE * 0.05);

        ctx.restore();
      }

      // Draw logo — image only, no circle clip
      {
        const { x, y } = logoBall.position;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(logoBall.angle);

        ctx.shadowColor = "rgba(0,0,0,0.12)";
        ctx.shadowBlur = 10;
        if (logoImg.complete && logoImg.naturalWidth > 0) {
          const aspect = logoImg.naturalWidth / logoImg.naturalHeight;
          const dw = aspect >= 1 ? LR_DRAW * 2 : LR_DRAW * 2 * aspect;
          const dh = aspect >= 1 ? (LR_DRAW * 2) / aspect : LR_DRAW * 2;
          ctx.drawImage(logoImg, -dw / 2, -dh / 2, dw, dh);
        }

        ctx.restore();
      }

      // Draw cursor dot on top
      const { x: cx2, y: cy2 } = cursorBody.position;
      if (cx2 >= 0 && cx2 <= W && cy2 >= 0 && cy2 <= H) {
        ctx.beginPath();
        ctx.arc(cx2, cy2, CURSOR_R, 0, Math.PI * 2);
        ctx.fillStyle = "#1c2b3a";
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    };

    resetRef.current = () => {
      jasoBodies.forEach((body, i) => {
        const pos = START_POSITIONS[i];
        Body.setPosition(body, pos);
        Body.setVelocity(body, START_VELOCITIES[i]);
        Body.setAngle(body, 0);
        Body.setAngularVelocity(body, 0);
      });
      Body.setPosition(logoBall, LOGO_START);
      Body.setVelocity(logoBall, {
        x: (Math.random() - 0.5) * 1,
        y: (Math.random() - 0.5) * 1,
      });
      Body.setAngle(logoBall, 0);
      Body.setAngularVelocity(logoBall, 0);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "#FAF7F2", cursor: "none" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <h1
        ref={textRef}
        className="absolute z-20 hidden md:block"
        onClick={() => resetRef.current()}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'SUIT', sans-serif",
          fontSize: "clamp(26px, 3.5vw, 52px)",
          fontWeight: 900,
          color: "#1c2b3a",
          lineHeight: 1.2,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        뉴질랜드
        <br />
        <em style={{ fontStyle: "normal", color: "#9278D6" }}>
          한민족 한글학교
        </em>
      </h1>
    </section>
  );
}
