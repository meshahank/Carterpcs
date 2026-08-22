'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, useFadeReveal, useTextReveal } from '@/lib/animations'

const facts = [
  { label: 'BASED IN', value: 'Los Angeles, CA' },
  { label: 'FOCUS', value: 'PCs / Phones / EVs / AI' },
  { label: 'CONTENT', value: '4 posts a day, every day' },
  { label: 'AUDIENCE', value: '10M+ across platforms' },
]

export default function About() {
  const headingRef = useTextReveal<HTMLDivElement>()
  const bodyRef = useFadeReveal<HTMLDivElement>()
  const visualRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // clip-path reveal for visual + cyan line sweep
  useEffect(() => {
    const visual = visualRef.current
    const line = lineRef.current
    if (!visual || !line || prefersReducedMotion()) return

    const visualTween = gsap.fromTo(
      visual,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: visual, start: 'top 78%', once: true },
      },
    )
    const lineTween = gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: line, start: 'top 90%', once: true },
      },
    )
    return () => {
      visualTween.scrollTrigger?.kill()
      visualTween.kill()
      lineTween.scrollTrigger?.kill()
      lineTween.kill()
    }
  }, [])

  return (
    <section id="about" className="relative px-6 pb-28 pt-28 md:px-12 md:pb-40 md:pt-40">
      <p className="tech-label mb-10 text-dim">02 / PROFILE</p>

      <div ref={headingRef}>
        <h2 className="display-tight font-sans font-black uppercase">
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>The Human</span>
          </span>
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>
              <em className="italic text-accent">Behind</em>
            </span>
          </span>
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>The Hardware.</span>
          </span>
        </h2>
      </div>

      <div ref={lineRef} className="mt-14 h-px w-full origin-left bg-accent/40" aria-hidden="true" />

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        {/* visual */}
        <div
          ref={visualRef}
          className="relative flex aspect-[4/5] flex-col justify-between border border-line bg-surface p-7"
        >
          <div className="flex justify-between">
            <span className="tech-label text-dim">EST. 2005</span>
            <span className="tech-label flex items-center gap-2 text-accent">
              <span className="h-1 w-1 animate-pulse rounded-full bg-accent" />
              ACTIVE
            </span>
          </div>
          <p
            className="display-tight text-center font-sans text-[clamp(6rem,15vw,13rem)] font-black text-accent"
            aria-hidden="true"
          >
            CR
          </p>
          <div className="flex justify-between">
            <span className="tech-label text-muted">CARTER RYAN SMITH</span>
            <span className="tech-label text-dim">MONROE, MI → LA</span>
          </div>
          {/* corner accents */}
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-accent/50" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/50" aria-hidden="true" />
        </div>

        {/* biography */}
        <div ref={bodyRef} className="flex flex-col justify-center">
          <p className="fade-item max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Carter Ryan Smith — born{' '}
            <strong className="font-medium text-foreground">August 8, 2005</strong> in Monroe,
            Michigan — is the tech creator behind CarterPCs. At 18 he packed up and moved to{' '}
            <strong className="font-medium text-foreground">Los Angeles</strong> to turn a
            phone-filmed TikTok hobby into a full-blown content machine.
          </p>
          <p className="fade-item mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            He posts <span className="text-accent">four times a day</span> about PCs, phones,
            EVs, AI, and whatever tech is currently exciting — or genuinely ridiculous. Just the
            gear, the takes, and the occasional hot take.
          </p>

          <dl className="mt-14 grid grid-cols-2 gap-x-8">
            {facts.map((fact) => (
              <div key={fact.label} className="fade-item border-t border-line py-5">
                <dt className="tech-label text-dim">{fact.label}</dt>
                <dd className="mt-2 font-sans text-base font-medium text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
