import { useEffect, useRef, useCallback } from 'react'

interface Tab { id: string; label: string }

export default function SectionTabs({ tabs }: { tabs: Tab[] }) {
  const navRef  = useRef<HTMLElement>(null)
  const prevRef = useRef<string | null>(null)
  const lockRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activate = useCallback((id: string) => {
    if (id === prevRef.current) return
    prevRef.current = id
    navRef.current?.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'))
    const el = navRef.current?.querySelector<HTMLElement>(`[href="#${id}"]`)
    el?.classList.add('active')
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [])

  // detect active section on scroll, but skip if a click locked it
  useEffect(() => {
    const onScroll = () => {
      if (lockRef.current) return
      const offset = 72 + (navRef.current?.clientHeight ?? 48) + 16
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80
      let found: string | null = atBottom ? (tabs[tabs.length - 1]?.id ?? null) : null
      if (!found) {
        for (const { id } of [...tabs].reverse()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= offset) { found = id; break }
        }
      }
      activate(found ?? tabs[0]?.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [tabs, activate])

  const handleClick = (id: string) => {
    // immediately highlight the clicked tab and suppress scroll-detection
    // until the smooth-scroll animation has finished (~1s)
    if (lockRef.current) clearTimeout(lockRef.current)
    activate(id)
    lockRef.current = setTimeout(() => { lockRef.current = null }, 1000)
  }

  return (
    <nav
      ref={navRef}
      className="sticky z-[90] overflow-x-auto no-scrollbar"
      style={{ background: '#FDFCFA', borderBottom: '1px solid rgba(0,0,0,0.07)', top: 72 }}
    >
      <div className="flex justify-center" style={{ padding: '0 48px' }}>
        {tabs.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="section-tab" onClick={() => handleClick(id)}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
