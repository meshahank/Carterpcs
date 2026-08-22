'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Reveals every `.reveal-line > span` inside the ref'd element,
 * rising line-by-line when it enters the viewport.
 */
export function useTextReveal<T extends HTMLElement>(options?: {
  delay?: number
  stagger?: number
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const spans = el.querySelectorAll('.reveal-line > span')
    if (!spans.length) return

    const tween = gsap.to(spans, {
      y: 0,
      duration: 1.15,
      ease: 'power4.out',
      stagger: options?.stagger ?? 0.09,
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [options?.delay, options?.stagger])

  return ref
}

/**
 * Fades up every `.fade-item` inside the ref'd element on scroll entry.
 */
export function useFadeReveal<T extends HTMLElement>(options?: {
  stagger?: number
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const items = el.querySelectorAll('.fade-item')
    if (!items.length) return

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: options?.stagger ?? 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [options?.stagger])

  return ref
}

/**
 * Subtle vertical parallax on the ref'd element.
 */
export function useParallax<T extends HTMLElement>(amount = 60) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const tween = gsap.fromTo(
      el,
      { y: amount },
      {
        y: -amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [amount])

  return ref
}

/**
 * Subtle magnetic pull toward the cursor for CTAs.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return ref
}

export { gsap, ScrollTrigger }
