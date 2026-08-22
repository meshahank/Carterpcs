'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, prefersReducedMotion, useFadeReveal, useMagnetic } from '@/lib/animations'
import { links } from '@/lib/data'
import { scrollToTarget } from '@/components/smooth-scroll'

const socials = [
  { label: 'YouTube', href: links.youtube },
  { label: 'TikTok', href: links.tiktok },
  { label: 'Instagram', href: links.instagram },
  { label: 'Linktree', href: links.linktree },
]

export default function SiteFooter() {
  const gridRef = useFadeReveal<HTMLDivElement>()
  const wordmarkRef = useRef<HTMLParagraphElement>(null)
  const emailRef = useMagnetic<HTMLAnchorElement>(0.15)
  const topRef = useMagnetic<HTMLButtonElement>(0.3)

  useEffect(() => {
    const wordmark = wordmarkRef.current
    if (!wordmark || prefersReducedMotion()) return

    const tween = gsap.fromTo(
      wordmark,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: wordmark, start: 'top 95%', once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <footer className="relative overflow-hidden border-t border-line px-6 pt-24 md:px-12 md:pt-32">
      <p className="tech-label text-muted">MAKING TECH LESS OF A SNOOZE FEST.</p>

      <p
        ref={wordmarkRef}
        className="display-tight mt-8 select-none whitespace-nowrap font-sans text-[clamp(4rem,15.5vw,19rem)] font-extrabold tracking-tighter text-foreground"
        aria-hidden="true"
      >
        Carter<span className="text-accent">PCs</span>
      </p>

      <div ref={gridRef} className="mt-16 grid gap-10 border-t border-line py-14 md:grid-cols-4 md:gap-8">
        <div className="fade-item">
          <h3 className="tech-label text-dim">CONTACT</h3>
          <a
            ref={emailRef}
            href={links.email}
            className="link-sweep press mt-4 inline-block text-sm text-foreground"
            data-cursor="OPEN"
          >
            carterpcs@rakugomedia.com
          </a>
          <p className="mt-3 max-w-[220px] text-xs leading-relaxed text-muted">
            Sponsorships, collabs, press. Serious inquiries only.
          </p>
        </div>

        <div className="fade-item">
          <h3 className="tech-label text-dim">SOCIAL</h3>
          <ul className="mt-4 space-y-2.5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                  data-cursor="VIEW"
                >
                  {social.label}
                  <ArrowUpRight className="h-3 w-3 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-item">
          <h3 className="tech-label text-dim">NAVIGATION</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: 'About', href: '#about' },
              { label: 'Content', href: '#content' },
              { label: 'Platforms', href: '#platforms' },
              { label: 'Community', href: '#community' },
            ].map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToTarget(item.href)}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-item">
          <h3 className="tech-label text-dim">LOCATION</h3>
          <p className="mt-4 text-sm text-muted">
            Managed by Rakugo Media
            <br />
            Los Angeles, CA
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line py-6">
        <p className="tech-label text-dim">© 2026 CARTERPCS</p>
        <button
          ref={topRef}
          onClick={() => scrollToTarget(0)}
          className="press tech-label text-muted transition-colors hover:text-accent"
          data-cursor=""
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  )
}
