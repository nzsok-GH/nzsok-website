import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

const JASO = ['ㅎ', 'ㅏ', 'ㄴ', 'ㅁ', 'ㅣ', 'ㄴ', 'ㅈ', 'ㅗ', 'ㄱ'] as const

const PALETTE = [
  { bg: '#9278D6', fg: '#FAF7F2' },
  { bg: '#1c2b3a', fg: '#E8E0F7' },
  { bg: '#B49EE4', fg: '#1c2b3a' },
  { bg: '#9278D6', fg: '#FAF7F2' },
  { bg: '#1c2b3a', fg: '#B49EE4' },
  { bg: '#7B5FC7', fg: '#FAF7F2' },
  { bg: '#B49EE4', fg: '#1c2b3a' },
  { bg: '#1c2b3a', fg: '#FAF7F2' },
  { bg: '#9278D6', fg: '#FAF7F2' },
]


export default function HeroPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const { Engine, Bodies, Body, World, Composite } = Matter

    const dpr = window.devicePixelRatio || 1
    const W = section.clientWidth
    const H = section.clientHeight

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const R = Math.min(W * 0.07, H * 0.085, 164)
    const FONT_SIZE = R * 1.25

    // Preload logo image
    const logoImg = new Image()
    logoImg.src = '/logo.png'

    const engine = Engine.create()
    engine.gravity.scale = 0.2
    engine.gravity.y = 0
    engine.gravity.x = 0

    const navH = (document.querySelector('nav') as HTMLElement | null)?.clientHeight ?? 70

    const wallOpts = { isStatic: true, label: 'wall', friction: 0.05, restitution: 0.7 }
    World.add(engine.world, [
      Bodies.rectangle(W / 2, H + 25, W + 200, 50, wallOpts),        // floor
      Bodies.rectangle(W / 2, navH - 25, W + 200, 50, wallOpts),      // ceiling just below nav
      Bodies.rectangle(-25, H / 2, 50, H + 200, wallOpts),           // left
      Bodies.rectangle(W - R + 25, H / 2, 50, H + 200, wallOpts),    // right
    ])

    const ballProps = {
      density: 8e-6,
      frictionAir: 0.006,
      restitution: 0.65,
      friction: 0.01,
    }

    // 3×3 grid: each column = one syllable (한/민/족), rows = initial/vowel/final.
    // cs and rs are large enough that no two circles overlap (min distance > 2R).
    const cs = R * 2.3   // column spacing  (~189 px for R=82)
    const rs = R * 2.15  // row spacing     (~176 px for R=82, just above 2R=164)
    const cx = W * 0.72  // grid centre — sits in the right half, clear of the text card
    const cy = H * 0.38

    const START_POSITIONS = [
      { x: cx - cs, y: cy - rs }, // ㅎ  han-initial   col0 row0
      { x: cx - cs, y: cy      }, // ㅏ  han-vowel     col0 row1
      { x: cx - cs, y: cy + rs }, // ㄴ  han-final     col0 row2
      { x: cx,      y: cy - rs }, // ㅁ  min-initial   col1 row0
      { x: cx,      y: cy      }, // ㅣ  min-vowel     col1 row1
      { x: cx,      y: cy + rs }, // ㄴ  min-final     col1 row2
      { x: cx + cs, y: cy - rs }, // ㅈ  jok-initial   col2 row0
      { x: cx + cs, y: cy      }, // ㅗ  jok-vowel     col2 row1
      { x: cx + cs, y: cy + rs }, // ㄱ  jok-final     col2 row2
    ]

    const LOGO_START = { x: cx - cs * 2.4, y: cy }

    const jasoBodies = JASO.map((char, i) => {
      const pos = START_POSITIONS[i]
      const body = Bodies.circle(pos.x, pos.y, R, { ...ballProps, label: 'jaso' })
      // Tiny staggered velocity so bodies slowly drift apart from the initial pose
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.8,
        y: (Math.random() - 0.5) * 0.8,
      })
      ;(body as any)._jaso = char
      ;(body as any)._pal = PALETTE[i]
      return body
    })

    // Logo ball — slightly larger for visual emphasis
    const LR = R * 1.15
    const logoBall = Bodies.circle(LOGO_START.x, LOGO_START.y, LR, {
      ...ballProps,
      label: 'logo',
    })
    Body.setVelocity(logoBall, {
      x: (Math.random() - 0.5) * 1,
      y: (Math.random() - 0.5) * 1,
    })

    // Static collider matching the text block's bounding box
    if (textRef.current) {
      const sr = section.getBoundingClientRect()
      const tr = textRef.current.getBoundingClientRect()
      const tx = tr.left - sr.left + tr.width / 2
      const ty = tr.top  - sr.top  + tr.height / 2
      World.add(engine.world, Bodies.rectangle(tx, ty, tr.width, tr.height, {
        isStatic: true,
        label: 'text',
        friction: 0.1,
        restitution: 0.5,
      }))
    }

    World.add(engine.world, [...jasoBodies, logoBall])

    // Physical cursor — a static circle that teleports to the mouse each frame and
    // collides naturally with the jaso/logo bodies. Starts off-screen.
    const CURSOR_R = 12
    const cursorBody = Bodies.circle(-500, -500, CURSOR_R, {
      isStatic: true,
      label: 'cursor',
      restitution: 0.8,
      friction: 0,
      frictionAir: 0,
    })
    World.add(engine.world, cursorBody)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      Body.setPosition(cursorBody, { x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    const onMouseLeave = () => Body.setPosition(cursorBody, { x: -500, y: -500 })
    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      Body.setPosition(cursorBody, { x: t.clientX - rect.left, y: t.clientY - rect.top })
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })

    let rafId = 0
    let tick = 0

    const loop = () => {
      tick += 0.006

      engine.gravity.y = Math.sin(tick * Math.PI * 0.9) * 0.002
      engine.gravity.x = Math.sin(tick * Math.PI * 0.55) * 0.0015

      Engine.update(engine, 1000 / 60)

      // Cap speed so bodies can't tunnel through walls after hard collisions or fast drags
      const MAX_SPEED = 18
      for (const body of Composite.allBodies(engine.world)) {
        if (!body.isStatic) {
          const { x: vx, y: vy } = body.velocity
          const speed = Math.sqrt(vx * vx + vy * vy)
          if (speed > MAX_SPEED) {
            Body.setVelocity(body, { x: (vx / speed) * MAX_SPEED, y: (vy / speed) * MAX_SPEED })
          }
        }
      }

      ctx.clearRect(0, 0, W, H)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `900 ${FONT_SIZE}px 'Paperlogy', sans-serif`

      // Draw jaso balls
      for (const body of jasoBodies) {
        const { x, y } = body.position
        const { bg, fg } = (body as any)._pal

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(body.angle)

        ctx.beginPath()
        ctx.arc(0, 0, R, 0, Math.PI * 2)
        ctx.fillStyle = bg
        ctx.fill()

        ctx.fillStyle = fg
        ctx.fillText((body as any)._jaso, 0, FONT_SIZE * 0.05)

        ctx.restore()
      }

      // Draw logo ball — image clipped to circle
      {
        const { x, y } = logoBall.position
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(logoBall.angle)

        ctx.beginPath()
        ctx.arc(0, 0, LR, 0, Math.PI * 2)
        ctx.fillStyle = '#FAF7F2'
        ctx.fill()
        ctx.clip()
        if (logoImg.complete && logoImg.naturalWidth > 0) {
          ctx.drawImage(logoImg, -LR, -LR, LR * 2, LR * 2)
        }

        ctx.restore()
      }

      // Draw cursor dot on top
      const { x: cx2, y: cy2 } = cursorBody.position
      if (cx2 >= 0 && cx2 <= W && cy2 >= 0 && cy2 <= H) {
        ctx.beginPath()
        ctx.arc(cx2, cy2, CURSOR_R, 0, Math.PI * 2)
        ctx.fillStyle = '#1c2b3a'
        ctx.fill()
      }

      rafId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden"
      style={{ height: '100vh', background: '#FAF7F2', cursor: 'none' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <h1
        ref={textRef}
        className="absolute z-10"
        style={{
          bottom: '3rem',
          right: '3rem',
          fontFamily: "'SUIT', sans-serif",
          fontSize: 'clamp(26px, 3.5vw, 52px)',
          fontWeight: 900,
          color: '#1c2b3a',
          lineHeight: 1.2,
          textAlign: 'right',
          pointerEvents: 'none',
        }}
      >
        뉴질랜드<br />
        <em style={{ fontStyle: 'normal', color: '#9278D6' }}>한민족 한글학교</em>
      </h1>
    </section>
  )
}
