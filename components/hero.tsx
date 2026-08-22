'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/animations'
import { READY_EVENT } from '@/components/preloader'

const floatingMeta = [
  { text: '4× DAILY', className: 'right-[8%] top-[26%] hidden lg:flex' },
  { text: 'TECH / CULTURE', className: 'left-[4%] top-[38%] hidden lg:flex' },
  { text: 'EST. 2005', className: 'right-[14%] bottom-[24%] hidden lg:flex' },
  { text: 'LOS ANGELES', className: 'left-[10%] bottom-[16%] hidden lg:flex' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (prefersReducedMotion()) {
      section
        .querySelectorAll<HTMLElement>('.reveal-line > span, .hero-fade')
        .forEach((el) => {
          el.style.transform = 'none'
          el.style.opacity = '1'
        })
      return
    }

    let tl: gsap.core.Timeline | undefined
    const play = () => {
      tl = gsap.timeline()
      tl.to(section.querySelectorAll('.reveal-line > span'), {
        y: 0,
        duration: 1.3,
        stagger: 0.11,
        ease: 'power4.out',
      })
        .fromTo(
          section.querySelector('.hero-accent-word'),
          { skewX: 8, xPercent: -2 },
          { skewX: 0, xPercent: 0, duration: 1.1, ease: 'expo.out' },
          '-=1.0',
        )
        .to(
          section.querySelectorAll('.hero-fade'),
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
          '-=0.7',
        )
        .to(
          section.querySelector('.hero-glow'),
          { opacity: 1, duration: 2.4, ease: 'power2.inOut' },
          '-=1.2',
        )
    }

    window.addEventListener(READY_EVENT, play, { once: true })
    return () => {
      window.removeEventListener(READY_EVENT, play)
      tl?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-20"
    >
      {/* atmospheric light */}
      <div
        className="hero-glow pointer-events-none absolute inset-0 opacity-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(55% 40% at 78% 18%, rgba(0,229,255,0.07), transparent 70%), radial-gradient(45% 35% at 12% 80%, rgba(109,93,252,0.06), transparent 70%)',
        }}
      />

      {/* floating editorial annotations */}
      {floatingMeta.map((meta) => (
        <span
          key={meta.text}
          className={`hero-fade tech-label absolute items-center gap-2 text-dim opacity-0 ${meta.className}`}
          style={{ transform: 'translateY(20px)' }}
          aria-hidden="true"
        >
          <span className="h-1 w-1 rounded-full bg-accent" />
          {meta.text}
        </span>
      ))}

      <div className="relative z-10">
        <p
          className="hero-fade tech-label mb-8 text-muted opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          01 / CARTERPCS — TECH CREATOR, LOS ANGELES
        </p>

        <h1 className="display-tight font-sans font-extrabold uppercase">
          <span className="reveal-line text-[clamp(3.4rem,12vw,12.5rem)]">
            <span>Making Tech</span>
          </span>
          <span className="reveal-line text-[clamp(3.4rem,12vw,12.5rem)]">
            <span>
              <em className="hero-accent-word inline-block not-italic text-accent">
                Less Boring
              </em>
              <span className="text-outline">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p
            className="hero-fade max-w-md text-base leading-relaxed text-muted opacity-0"
            style={{ transform: 'translateY(20px)' }}
          >
            Tech, hardware, gadgets, phones, EVs and everything worth talking about.
            Four drops a day — no scripts that sound like scripts, no 12-minute intros.
          </p>
          <div
            className="hero-fade flex items-center gap-6 opacity-0"
            style={{ transform: 'translateY(20px)' }}
          >
            <span className="tech-label text-dim">6.9M TIKTOK</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="tech-label text-dim">3.2M YOUTUBE</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="tech-label flex items-center gap-2 text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* bottom rule */}
      <div
        className="hero-fade mt-12 h-px w-full bg-line opacity-0"
        style={{ transform: 'translateY(20px)' }}
        aria-hidden="true"
      />
    </section>
  )
}
