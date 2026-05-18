import { useEffect, useRef } from "react";
import Matter from "matter-js";

// Row 1: 뉴질랜드  Row 2: 한민족  Row 3: 한글학교
const JASO = [
  "ㄴ", "ㅠ",           // 뉴
  "ㅈ", "ㅣ", "ㄹ",    // 질
  "ㄹ", "ㅐ", "ㄴ",    // 랜
  "ㄷ", "ㅡ",           // 드
  "ㅎ", "ㅏ", "ㄴ",    // 한
  "ㅁ", "ㅣ", "ㄴ",    // 민
  "ㅈ", "ㅗ", "ㄱ",    // 족
  "ㅎ", "ㅏ", "ㄴ",    // 한
  "ㄱ", "ㅡ", "ㄹ",    // 글
  "ㅎ", "ㅏ", "ㄱ",    // 학
  "ㄱ", "ㅛ",           // 교
] as const;

const COLORS = ["#7B5FC7", "#9278D6", "#B49EE4", "#1c2b3a"];

export default function HeroPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

    const R = Math.min(W * 0.055, H * 0.07, 120) * (W < 768 ? 1.25 : 1);
    const CR = R * 0.42;
    const FONT_SIZE = R * 1.8;

    const R_REF = 76;
    const speedScale = R / R_REF;

    const engine = Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0;
    engine.gravity.scale = 0;

    const navH =
      (document.querySelector("nav") as HTMLElement | null)?.clientHeight ?? 70;

    const wallOpts = { isStatic: true, label: "wall", friction: 0.05, restitution: 0.7 };
    // Ceiling must stop bodies so the visual glyph top (body_y - FONT_SIZE/2) stays below nav.
    // When a body rests on the ceiling bottom edge (ceilY + 25), body center = ceilY + 25 + CR.
    // Visual top = body center - FONT_SIZE/2. Setting that = navH + 8px gap:
    //   ceilY = navH + 8 + FONT_SIZE/2 - CR - 25
    const ceilY = navH + 8 + FONT_SIZE / 2 - CR - 25;
    World.add(engine.world, [
      Bodies.rectangle(W / 2, H + 25, W + 200, 50, wallOpts),
      Bodies.rectangle(W / 2, ceilY,  W + 200, 50, wallOpts),
      Bodies.rectangle(-25,   H / 2,  50, H + 200, wallOpts),
      Bodies.rectangle(W + 25, H / 2, 50, H + 200, wallOpts),
    ]);

    const ballProps = { density: 8e-6, frictionAir: 0.03, restitution: 0.55, friction: 0.05 };

    // Three-row syllable layout — 뉴질랜드 / 한민족 / 한글학교
    const syl1 = R * 2.6;  // row 1 (4 syllables)
    const syl2 = R * 3.0;  // row 2 (3 syllables)
    const syl3 = R * 2.6;  // row 3 (4 syllables)

    const isMobile = W < 768;
    const cy1 = H * (isMobile ? 0.30 : 0.22);
    const cy2 = H * 0.50;
    const cy3 = H * (isMobile ? 0.70 : 0.78);

    // row 1 syllable centres
    const nyu_x = W / 2 - 1.5 * syl1;
    const jil_x = W / 2 - 0.5 * syl1;
    const rae_x = W / 2 + 0.5 * syl1;
    const deu_x = W / 2 + 1.5 * syl1;
    // row 2 syllable centres
    const han1_x = W / 2 - syl2;
    const min_x  = W / 2;
    const jok_x  = W / 2 + syl2;
    // row 3 syllable centres
    const han2_x = W / 2 - 1.5 * syl3;
    const gul_x  = W / 2 - 0.5 * syl3;
    const hak_x  = W / 2 + 0.5 * syl3;
    const gyo_x  = W / 2 + 1.5 * syl3;

    const START_POSITIONS = [
      // 뉴 (ㄴ, ㅠ)
      { x: nyu_x - R * 0.4, y: cy1 - R * 0.5 },
      { x: nyu_x - R * 0.5, y: cy1 + R * 0.5 },
      // 질 (ㅈ, ㅣ, ㄹ)
      { x: jil_x - R * 0.7, y: cy1 - R * 0.6 },
      { x: jil_x + R * 0.5, y: cy1 - R * 0.4 },
      { x: jil_x - R * 0.1, y: cy1 + R * 0.9 },
      // 랜 (ㄹ, ㅐ, ㄴ)
      { x: rae_x - R * 0.7, y: cy1 - R * 0.6 },
      { x: rae_x + R * 0.5, y: cy1 - R * 0.4 },
      { x: rae_x - R * 0.1, y: cy1 + R * 0.9 },
      // 드 (ㄷ, ㅡ)
      { x: deu_x,            y: cy1 - R * 0.5 },
      { x: deu_x,            y: cy1 + R * 0.5 },
      // 한 (ㅎ, ㅏ, ㄴ)
      { x: han1_x - R * 0.7, y: cy2 - R * 0.6 },
      { x: han1_x + R * 0.5, y: cy2 - R * 0.4 },
      { x: han1_x - R * 0.1, y: cy2 + R * 0.9 },
      // 민 (ㅁ, ㅣ, ㄴ)
      { x: min_x - R * 0.7,  y: cy2 - R * 0.6 },
      { x: min_x + R * 0.5,  y: cy2 - R * 0.4 },
      { x: min_x - R * 0.1,  y: cy2 + R * 0.9 },
      // 족 (ㅈ, ㅗ, ㄱ)
      { x: jok_x,             y: cy2 - R * 1.1 },
      { x: jok_x,             y: cy2           },
      { x: jok_x,             y: cy2 + R * 1.1 },
      // 한 (ㅎ, ㅏ, ㄴ)
      { x: han2_x - R * 0.7, y: cy3 - R * 0.6 },
      { x: han2_x + R * 0.5, y: cy3 - R * 0.4 },
      { x: han2_x - R * 0.1, y: cy3 + R * 0.9 },
      // 글 (ㄱ, ㅡ, ㄹ)
      { x: gul_x,             y: cy3 - R * 1.1 },
      { x: gul_x,             y: cy3           },
      { x: gul_x,             y: cy3 + R * 1.1 },
      // 학 (ㅎ, ㅏ, ㄱ)
      { x: hak_x - R * 0.7,  y: cy3 - R * 0.6 },
      { x: hak_x + R * 0.5,  y: cy3 - R * 0.4 },
      { x: hak_x - R * 0.1,  y: cy3 + R * 0.9 },
      // 교 (ㄱ, ㅛ)
      { x: gyo_x,             y: cy3 - R * 0.5 },
      { x: gyo_x,             y: cy3 + R * 0.5 },
    ];

    let prevColor: string | null = null;
    const jasoBodies = JASO.map((char, i) => {
      const body = Bodies.circle(START_POSITIONS[i].x, START_POSITIONS[i].y, CR, {
        ...ballProps,
        label: "jaso",
      });
      const angle = (i / JASO.length) * Math.PI * 2;
      const speed = 0.35 * speedScale;
      Body.setVelocity(body, { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
      (body as any)._jaso = char;
      const choices = COLORS.filter((c) => c !== prevColor);
      const bg = choices[Math.floor(Math.random() * choices.length)];
      prevColor = bg;
      (body as any)._pal = { bg };
      return body;
    });

    World.add(engine.world, jasoBodies);

    // Emoji cursors
    const makeCursor = (emoji: string, size = 40) => {
      const c = document.createElement("canvas");
      c.width = size; c.height = size;
      const cx = c.getContext("2d")!;
      cx.font = `${Math.round(size * 0.82)}px serif`;
      cx.textBaseline = "middle";
      cx.textAlign = "center";
      cx.fillText(emoji, size / 2, size / 2);
      return `url(${c.toDataURL()}) ${size / 2} ${size / 2}, auto`;
    };
    const CURSOR_OPEN = makeCursor("🖐️");
    const CURSOR_GRAB = makeCursor("✊");
    canvas.style.cursor = CURSOR_OPEN;

    // Pointer drag
    let dragBody: Matter.Body | null = null;
    let dragPrev = { x: 0, y: 0 };
    let dragCur  = { x: 0, y: 0 };

    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const hitTest = (pos: { x: number; y: number }) => {
      for (const body of jasoBodies) {
        const dx = pos.x - body.position.x;
        const dy = pos.y - body.position.y;
        if (dx * dx + dy * dy <= CR * CR) return body;
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      const pos = getPos(e.clientX, e.clientY);
      const hit = hitTest(pos);
      if (!hit) return;
      dragBody = hit;
      dragPrev = pos;
      dragCur  = pos;
      Body.setStatic(hit, true);
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = CURSOR_GRAB;
    };

    const onPointerMove = (e: PointerEvent) => {
      const pos = getPos(e.clientX, e.clientY);
      if (dragBody) {
        dragPrev = dragCur;
        dragCur  = pos;
        Body.setPosition(dragBody, pos);
        canvas.style.cursor = CURSOR_GRAB;
      } else {
        canvas.style.cursor = CURSOR_OPEN;
      }
    };

    const onPointerUp = () => {
      if (!dragBody) return;
      Body.setStatic(dragBody, false);
      Body.setVelocity(dragBody, {
        x: (dragCur.x - dragPrev.x) * 0.4,
        y: (dragCur.y - dragPrev.y) * 0.4,
      });
      dragBody = null;
      canvas.style.cursor = CURSOR_OPEN;
    };

    const onContextMenu = (e: Event) => e.preventDefault();

    canvas.addEventListener("pointerdown",  onPointerDown);
    canvas.addEventListener("pointermove",  onPointerMove);
    canvas.addEventListener("pointerup",    onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("contextmenu",  onContextMenu);

    let rafId = 0;
    let lastTime = 0;

    const loop = (time: number) => {
      const delta = lastTime === 0 ? 1000 / 60 : Math.min(time - lastTime, 50);
      lastTime = time;

      Engine.update(engine, delta);

      const MAX_SPEED = 18 * speedScale;
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
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${FONT_SIZE}px 'KerisKedyuche', sans-serif`;

      for (const body of jasoBodies) {
        const { x, y } = body.position;
        const { bg } = (body as any)._pal;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = bg;
        ctx.fillText((body as any)._jaso, 0, FONT_SIZE * 0.05);
        ctx.restore();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointerdown",  onPointerDown);
      canvas.removeEventListener("pointermove",  onPointerMove);
      canvas.removeEventListener("pointerup",    onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("contextmenu",  onContextMenu);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "#FAF7F2" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" style={{ touchAction: "none" }} />
      <p className="absolute bottom-4 left-4 text-xs text-[#1c2b3a] pointer-events-none select-none" style={{ animation: "hint-breathe 3s ease-in-out infinite" }}>
        글자를 움직여 새로운 단어를 만들어보세요!
      </p>
    </section>
  );
}
