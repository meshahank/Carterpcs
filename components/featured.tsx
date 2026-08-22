'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, prefersReducedMotion, useMagnetic, useTextReveal } from '@/lib/animations'
import { links } from '@/lib/data'

export default function Featured() {
  const headingRef = useTextReveal<HTMLDivElement>()
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.2)

  // clip reveal + hover parallax on the featured frame
  useEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner || prefersReducedMotion()) return

    const reveal = gsap.fromTo(
      frame,
      { clipPath: 'inset(12% 6% 12% 6%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: frame, start: 'top 75%', once: true },
      },
    )

    const xTo = gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect()
      const rx = (e.clientX - rect.left) / rect.width - 0.5
      const ry = (e.clientY - rect.top) / rect.height - 0.5
      xTo(rx * -24)
      yTo(ry * -18)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    frame.addEventListener('mousemove', onMove)
    frame.addEventListener('mouseleave', onLeave)
    return () => {
      frame.removeEventListener('mousemove', onMove)
      frame.removeEventListener('mouseleave', onLeave)
      reveal.scrollTrigger?.kill()
      reveal.kill()
      gsap.killTweensOf(inner)
    }
  }, [])

  return (
    <section className="relative border-t border-line px-6 py-28 md:px-12 md:py-40">
      <div className="flex items-baseline justify-between">
        <p className="tech-label mb-10 text-dim">06 / LATEST DROP</p>
        <p className="tech-label hidden text-dim md:block">FEATURED</p>
      </div>

      <div ref={frameRef} className="relative overflow-hidden border border-line">
        <div ref={innerRef} className="relative -m-8 p-8">
          <div
            className="relative flex aspect-[16/10] flex-col justify-end p-8 md:aspect-[21/9] md:p-14"
            style={{
              background:
                'radial-gradient(70% 100% at 20% 0%, rgba(0,229,255,0.12), transparent 55%), radial-gradient(60% 80% at 90% 100%, rgba(109,93,252,0.10), transparent 60%), #07070a',
            }}
          >
            <span
              className="display-tight pointer-events-none absolute -right-4 top-6 select-none font-sans text-[clamp(5rem,16vw,15rem)] font-extrabold text-foreground/[0.04]"
              aria-hidden="true"
            >
              PLAY
            </span>

            <div ref={headingRef} className="relative">
              <span className="tech-label text-accent">LATEST DROP</span>
              <h2 className="display-tight mt-5 max-w-4xl font-sans font-extrabold uppercase">
                <span className="reveal-line text-[clamp(2.2rem,6.5vw,6rem)]">
                  <span>Tech Doesn&apos;t Have</span>
                </span>
                <span className="reveal-line text-[clamp(2.2rem,6.5vw,6rem)]">
                  <span>
                    To Be <em className="italic text-accent">Boring.</em>
                  </span>
                </span>
              </h2>

              <a
                ref={ctaRef}
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="press tech-label mt-10 inline-flex items-center gap-3 border border-accent/50 px-6 py-4 text-accent transition-colors duration-300 hover:bg-accent hover:text-background hover:gap-4"
                data-cursor="PLAY"
              >
                WATCH VIDEO
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
