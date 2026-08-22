'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/animations'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.body.dataset.customCursor = 'true'

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const setState = (text: string | null) => {
      if (text) {
        label.textContent = text
        ring.dataset.active = 'true'
        gsap.to(ring, { scale: 2.4, duration: 0.35, ease: 'power3.out' })
        gsap.to(label, { opacity: 1, duration: 0.25 })
        gsap.to(dot, { scale: 0, duration: 0.25 })
      } else {
        delete ring.dataset.active
        gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' })
        gsap.to(label, { opacity: 0, duration: 0.2 })
        gsap.to(dot, { scale: 1, duration: 0.25 })
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button')
      if (!target) {
        setState(null)
        return
      }
      const cursorText = target.dataset.cursor
      setState(cursorText || '')
      if (!cursorText) {
        // plain hover: grow ring without label
        gsap.to(ring, { scale: 1.7, duration: 0.35, ease: 'power3.out' })
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      delete document.body.dataset.customCursor
      gsap.killTweensOf([dot, ring, label])
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[130] hidden md:block">
      <div
        ref={dotRef}
        className="fixed -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="fixed -ml-[20px] -mt-[20px] flex h-10 w-10 items-center justify-center rounded-full border border-line-strong data-[active=true]:border-accent/60 data-[active=true]:bg-background/60"
      >
        <span
          ref={labelRef}
          className="tech-label text-accent opacity-0"
          style={{ fontSize: '4px', letterSpacing: '0.15em' }}
        />
      </div>
    </div>
  )
}
