'use client'

import { useEffect, useRef } from 'react'
import { Play } from 'lucide-react'
import { attachTilt, gsap, ScrollTrigger, prefersReducedMotion, useTextReveal } from '@/lib/animations'
import { videos } from '@/lib/data'

export default function ContentArchive() {
  const headingRef = useTextReveal<HTMLDivElement>()
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Cursor tilt on cards (independent of scroll behavior, works at any width)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const detach = attachTilt(track, '[data-tilt]', 6)
    return detach
  }, [])

  // Horizontal scroll driven by vertical scroll (desktop only)
  useEffect(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const pin = pinRef.current
      const track = trackRef.current
      if (!pin || !track) return

      const getDistance = () => track.scrollWidth - pin.offsetWidth

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="content" className="relative border-t border-line bg-surface">
      <div className="px-6 pt-28 md:px-12 md:pt-40">
        <p className="tech-label mb-10 text-dim">05 / ARCHIVE</p>
        <div ref={headingRef} className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="display-tight font-sans font-extrabold uppercase">
            <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
              <span>Recently</span>
            </span>
            <span className="reveal-line text-[clamp(2.6rem,8.5vw,8.5rem)]">
              <span>
                <em className="italic text-accent">Dropped.</em>
              </span>
            </span>
          </h2>
          <p className="max-w-xs pb-2 text-sm leading-relaxed text-muted">
            Four posts a day, every day. Here&apos;s what hit the feed this week — scroll to
            explore the archive.
          </p>
        </div>
      </div>

      <div ref={pinRef} className="relative overflow-hidden py-16 md:py-24 lg:flex lg:min-h-svh lg:items-center">
        <div
          ref={trackRef}
          className="tilt-perspective flex gap-5 overflow-x-auto px-6 pb-4 md:px-12 lg:w-max lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {videos.map((video) => (
            <a
              key={video.index}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              data-tilt
              className="press group relative flex w-[80vw] shrink-0 flex-col border border-line bg-background transition-colors duration-500 hover:border-line-strong sm:w-[420px] lg:w-[480px]"
              data-cursor="PLAY"
            >
              {/* thumbnail area */}
              <div className="relative aspect-video overflow-hidden border-b border-line">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background:
                      'radial-gradient(80% 90% at 30% 20%, rgba(0,229,255,0.10), transparent 60%), radial-gradient(70% 80% at 80% 90%, rgba(109,93,252,0.08), transparent 60%), #0a0a0d',
                  }}
                  aria-hidden="true"
                />
                <span className="display-tight absolute bottom-4 left-5 font-sans text-7xl font-extrabold text-foreground/10 transition-colors duration-500 group-hover:text-accent/25">
                  {video.index}
                </span>
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-background/60 backdrop-blur-sm transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/5" aria-hidden="true" />
              </div>

              {/* meta */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="tech-label text-accent">{video.platform}</span>
                  <span className="tech-label text-dim">{video.date}</span>
                </div>
                <h3 className="display-tight mt-4 font-sans text-2xl font-bold uppercase text-foreground transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                  {video.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="tech-label text-dim">{video.views} VIEWS</span>
                  <span className="tech-label text-muted">{video.duration}</span>
                </div>
              </div>
            </a>
          ))}

          {/* end card */}
          <a
            href="https://youtube.com/@actuallycarterpcs"
            target="_blank"
            rel="noopener noreferrer"
            className="press group flex w-[70vw] shrink-0 flex-col items-start justify-end border border-accent/30 bg-background p-6 transition-colors duration-500 hover:bg-accent hover:text-background sm:w-[340px]"
            data-cursor="VIEW"
          >
            <span className="tech-label text-accent group-hover:text-background">FULL ARCHIVE</span>
            <span className="display-tight mt-4 font-sans text-4xl font-extrabold uppercase md:text-5xl">
              See every drop →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
