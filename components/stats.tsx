'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, useTextReveal } from '@/lib/animations'
import { stats } from '@/lib/data'

export default function Stats() {
  const headingRef = useTextReveal<HTMLDivElement>()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const numbers = list.querySelectorAll<HTMLElement>('[data-count]')

    if (prefersReducedMotion()) {
      numbers.forEach((el) => {
        const target = parseFloat(el.dataset.count || '0')
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        el.textContent = target.toFixed(decimals)
      })
      return
    }

    const tweens: gsap.core.Tween[] = []

    numbers.forEach((el) => {
      const target = parseFloat(el.dataset.count || '0')
      const decimals = parseInt(el.dataset.decimals || '0', 10)
      const state = { v: 0 }
      tweens.push(
        gsap.to(state, {
          v: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = state.v.toFixed(decimals)
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
      )
    })

    // stagger rows in
    const rows = list.querySelectorAll('.stat-row')
    tweens.push(
      gsap.fromTo(
        rows,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: list, start: 'top 82%', once: true },
        },
      ),
    )

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <section id="stats" className="relative border-y border-line bg-surface px-6 py-28 md:px-12 md:py-36">
      <p className="tech-label mb-10 text-dim">03 / REACH</p>

      <div ref={headingRef}>
        <h2 className="display-tight font-sans font-black uppercase">
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>Numbers That</span>
          </span>
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>
              <em className="italic text-accent">Don&apos;t Snooze.</em>
            </span>
          </span>
        </h2>
      </div>

      <div ref={listRef} className="mt-16 md:mt-24">
        <div className="grid md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-row border-t border-line py-10 md:border-t-0 md:px-8 md:py-4 ${
                i > 0 ? 'md:border-l' : 'md:pl-0'
              }`}
            >
              <p className="display-tight font-sans text-[clamp(4rem,7vw,7rem)] font-black tabular-nums text-foreground">
                <span data-count={stat.value} data-decimals={stat.decimals}>
                  0
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="tech-label mt-4 text-muted">{stat.label}</p>
              <p className="tech-label mt-1 text-dim">{stat.platform}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 h-px w-full bg-line md:mt-16" aria-hidden="true" />
      </div>
    </section>
  )
}
