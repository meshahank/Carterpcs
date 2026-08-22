'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, useMagnetic } from '@/lib/animations'
import { scrollToTarget } from '@/components/smooth-scroll'
import { READY_EVENT } from '@/components/preloader'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'Community', href: '#community' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const logoRef = useMagnetic<HTMLButtonElement>(0.35)
  const ctaRef = useMagnetic<HTMLButtonElement>(0.2)

  // entrance after preloader
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    if (prefersReducedMotion()) {
      nav.style.opacity = '1'
      return
    }
    const play = () => {
      gsap.fromTo(nav, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
    }
    window.addEventListener(READY_EVENT, play, { once: true })
    return () => window.removeEventListener(READY_EVENT, play)
  }, [])

  // scroll state + progress
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? window.scrollY / docHeight : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (href: string) => {
    setMenuOpen(false)
    scrollToTarget(href)
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className={`fixed inset-x-0 top-0 z-[110] border-b transition-all duration-500 ${
          scrolled
            ? 'border-line bg-background/70 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div
          className={`flex items-center justify-between px-6 transition-all duration-500 md:px-12 ${
            scrolled ? 'py-3.5' : 'py-6'
          }`}
        >
          <button
            ref={logoRef}
            onClick={() => goTo('#hero')}
            className={`press font-sans font-bold tracking-tight ${
              scrolled ? 'text-base' : 'text-lg'
            }`}
            data-cursor=""
          >
            Carter<span className="text-accent">PCs</span>
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => goTo(link.href)}
                className="link-sweep tech-label press text-muted transition-colors hover:text-foreground hover:-translate-y-0.5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              ref={ctaRef}
              onClick={() => goTo('#content')}
              className="press tech-label hidden border border-accent/40 px-4 py-2.5 text-accent transition-colors hover:bg-accent hover:text-background md:block"
              data-cursor="VIEW"
            >
              Watch Latest
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="press tech-label text-foreground md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <div className="absolute bottom-0 left-0 h-px w-full">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-accent/70" />
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[105] flex flex-col justify-center bg-background px-6 md:hidden">
          <span className="tech-label mb-8 text-dim">NAVIGATION</span>
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => goTo(link.href)}
              className="press display-tight border-b border-line py-5 text-left font-sans text-5xl font-bold text-foreground transition-colors hover:text-accent"
            >
              <span className="tech-label mr-4 align-middle text-accent">0{i + 1}</span>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => goTo('#content')}
            className="press tech-label mt-10 w-fit border border-accent/40 px-5 py-3 text-accent transition-colors hover:bg-accent hover:text-background"
          >
            WATCH LATEST →
          </button>
        </div>
      )}
    </>
  )
}
