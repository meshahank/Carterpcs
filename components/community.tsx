'use client'

import { ArrowRight } from 'lucide-react'
import { useFadeReveal, useMagnetic, useTextReveal } from '@/lib/animations'

const features = [
  'Build help & part picks',
  'Early access to drops & news',
  'Weekly watch parties & events',
  'Buy, sell & trade gear safely',
  '27,000+ members who actually know tech',
]

export default function Community() {
  const headingRef = useTextReveal<HTMLDivElement>()
  const bodyRef = useFadeReveal<HTMLDivElement>()
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.2)

  return (
    <section
      id="community"
      className="relative overflow-hidden border-t border-line px-6 py-28 md:px-12 md:py-40"
    >
      {/* cyan-to-violet atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(50% 60% at 15% 30%, rgba(0,229,255,0.06), transparent 65%), radial-gradient(50% 60% at 85% 75%, rgba(109,93,252,0.07), transparent 65%)',
        }}
      />

      <p className="tech-label relative mb-10 text-dim">07 / COMMUNITY</p>

      <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* type-driven visual */}
        <div className="flex flex-col justify-between border border-line bg-surface/60 p-8 md:p-10">
          <div className="flex justify-between">
            <span className="tech-label text-dim">CARTER&apos;S CACTI</span>
            <span className="tech-label text-accent">DISCORD</span>
          </div>
          <p
            className="display-tight my-10 font-sans text-[clamp(4rem,10vw,9rem)] font-black uppercase leading-[0.85]"
            aria-hidden="true"
          >
            <span className="block text-foreground/15">Talk</span>
            <span className="block text-accent">Tech</span>
            <span className="text-outline block">24/7</span>
          </p>
          <div className="space-y-3">
            <div className="border border-line bg-background px-4 py-3">
              <p className="tech-label text-accent">CACTI_MEMBER</p>
              <p className="mt-1 text-sm text-muted">
                just built my first PC thanks to Carter
              </p>
            </div>
            <div className="ml-8 border border-line bg-background px-4 py-3">
              <p className="tech-label text-violet">MOD_TEAM</p>
              <p className="mt-1 text-sm text-muted">welcome to the gang</p>
            </div>
          </div>
        </div>

        {/* copy */}
        <div className="flex flex-col justify-center">
          <div ref={headingRef}>
            <h2 className="display-tight font-sans font-black uppercase">
              <span className="reveal-line text-[clamp(2.6rem,7vw,7rem)]">
                <span>Join The</span>
              </span>
              <span className="reveal-line text-[clamp(2.6rem,7vw,7rem)]">
                <span>
                  <em className="italic text-accent">Cacti.</em>
                </span>
              </span>
            </h2>
          </div>

          <div ref={bodyRef}>
            <p className="fade-item mt-8 max-w-lg text-lg leading-relaxed text-muted">
              A Discord server for everything technology and CarterPCs. Builds, drops, drama,
              deals — debated in real time by a community that actually knows what it&apos;s
              talking about. Most of the time.
            </p>

            <ul className="mt-10">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="fade-item flex items-center gap-4 border-t border-line py-4 text-sm text-foreground last:border-b"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              ref={ctaRef}
              href="https://linktree.com/carterpcs"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-label fade-item mt-10 inline-flex items-center gap-3 bg-accent px-7 py-4 font-medium text-background transition-colors duration-300 hover:bg-foreground"
              data-cursor="OPEN"
            >
              JOIN THE DISCORD
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
