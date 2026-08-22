'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/animations'

export const READY_EVENT = 'carterpcs:ready'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true)
      window.dispatchEvent(new Event(READY_EVENT))
      return
    }

    const root = rootRef.current
    const counter = counterRef.current
    const line = lineRef.current
    if (!root || !counter || !line) return

    const state = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new Event(READY_EVENT))
        setDone(true)
      },
    })

    tl.to(state, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = String(Math.round(state.v)).padStart(3, '0')
      },
    })
      .fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.8, ease: 'power2.inOut' },
        0,
      )
      .to(root, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '+=0.15')

    return () => {
      tl.kill()
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[140] flex flex-col justify-end bg-background px-6 pb-10 md:px-12"
      aria-hidden="true"
    >
      <div className="flex items-end justify-between pb-4">
        <span className="tech-label text-muted">CARTERPCS / LOADING</span>
        <span className="font-mono text-5xl font-medium tabular-nums text-foreground md:text-7xl">
          <span ref={counterRef}>000</span>
          <span className="text-accent">%</span>
        </span>
      </div>
      <div className="h-px w-full bg-line">
        <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  )
}
