'use client'

import { ArrowUpRight } from 'lucide-react'
import { useFadeReveal, useTextReveal } from '@/lib/animations'
import { platforms } from '@/lib/data'
import { scrollToTarget } from '@/components/smooth-scroll'

export default function Platforms() {
  const headingRef = useTextReveal<HTMLDivElement>()
  const listRef = useFadeReveal<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section id="platforms" className="relative px-6 py-28 md:px-12 md:py-40">
      <p className="tech-label mb-10 text-dim">04 / INDEX</p>

      <div ref={headingRef}>
        <h2 className="display-tight font-sans font-black uppercase">
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>Find Me</span>
          </span>
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>
              <em className="italic text-accent">Wherever</em>
            </span>
          </span>
          <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
            <span>You Scroll.</span>
          </span>
        </h2>
      </div>

      <div ref={listRef} className="mt-16 md:mt-24">
        {platforms.map((platform) => {
          const inner = (
            <>
              <span className="tech-label w-10 shrink-0 text-dim transition-colors group-hover:text-accent">
                {platform.index}
              </span>
              <span className="display-tight flex-1 font-sans text-3xl font-bold uppercase text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                {platform.name}
              </span>
              <span className="hidden max-w-[200px] text-sm leading-relaxed text-muted lg:block">
                {platform.description}
              </span>
              <span className="tech-label hidden w-56 text-right text-dim md:block">
                {platform.handle}
                <span className="mt-1 block text-muted">{platform.meta}</span>
              </span>
              <ArrowUpRight
                className="h-6 w-6 shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:h-8 md:w-8"
                aria-hidden="true"
              />
            </>
          )

          const className =
            'row-sweep group flex w-full items-center gap-5 border-b border-line py-7 text-left transition-colors duration-500 hover:bg-surface md:gap-10 md:py-9'

          if (platform.href.startsWith('#')) {
            return (
              <button
                key={platform.index}
                onClick={() => scrollToTarget(platform.href)}
                className={className}
                data-cursor="OPEN"
              >
                {inner}
              </button>
            )
          }

          return (
            <a
              key={platform.index}
              href={platform.href}
              target={platform.external ? '_blank' : undefined}
              rel={platform.external ? 'noopener noreferrer' : undefined}
              className={className}
              data-cursor="VIEW"
            >
              {inner}
            </a>
          )
        })}
      </div>
    </section>
  )
}
