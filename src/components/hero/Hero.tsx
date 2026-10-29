import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import HeroBackground from './HeroBackground'
import HeroNav from './HeroNav'
import HeroTitle from './HeroTitle'
import HeroStats from './HeroStats'
import TeamPreview from './TeamPreview'
import BookStayButton from './BookStayButton'
import LocationInfo from './LocationInfo'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      // Check for user's reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        gsap.set('.hero-bg-container', { clipPath: 'inset(0% 0% round 0px)', opacity: 1 })
        gsap.set('.hero-nav-line', { scaleX: 1, opacity: 1 })
        gsap.set(
          [
            '.title-word-ornavillas',
            '.title-word-living',
            '.title-word-experiences',
            '.hero-grid-lines',
            '.hero-nav',
            '.hero-left-icons',
            '.hero-stat-item',
            '.team-container',
            '.hero-description',
            '.book-button',
            '.location-info',
          ],
          { opacity: 1, x: 0, y: 0, yPercent: 0 }
        )
        return
      }

      // INITIAL GSAP CONFIGURATION
      // 1. Black Canvas initial state for typography
      gsap.set(['.title-word-ornavillas', '.title-word-living', '.title-word-experiences'], {
        yPercent: 110,
        opacity: 0,
      })

      // 2. Villa Image Container initial state: TINY CENTERED RECTANGLE (~10vw x ~12vh)
      gsap.set('.hero-bg-container', {
        clipPath: 'inset(44% 45% 44% 45% round 4px)',
        opacity: 0,
      })

      // 3. Scroll-driven navbar line initial state (hidden at 0% scroll)
      gsap.set('.hero-nav-line', {
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'left center',
      })

      // 4. UI Elements initial state (Hidden)
      gsap.set(
        [
          '.hero-nav',
          '.hero-left-icons',
          '.hero-stat-item',
          '.team-container',
          '.hero-description',
          '.book-button',
          '.location-info',
          '.hero-grid-lines',
        ],
        { opacity: 0, y: 15 }
      )

      // SCROLL-DRIVEN LINE REVEAL: Line expands across sticky navbar bottom as user scrolls from Hero to Next Section
      gsap.to('.hero-nav-line', {
        scaleX: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // MASTER INTRO TIMELINE WITH SLOW EDITORIAL TYPOGRAPHY & TWO-STAGE EXPANSION
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // ==================================================
      // PHASE 1 — BLACK CANVAS + SLOW TYPOGRAPHY REVEALS (0.00s – 1.40s)
      // ==================================================
      tl.to(
        '.title-word-ornavillas',
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.95,
          ease: 'power3.out',
        },
        0.00
      )
        .to(
          '.title-word-living',
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.95,
            ease: 'power3.out',
          },
          0.30
        )
        .to(
          '.title-word-experiences',
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.95,
            ease: 'power3.out',
          },
          0.60
        )

        // ==================================================
        // PHASE 2 — STAGE 1: IMAGE SLOWLY GROWS FROM TINY TO LARGE CENTERED SQUARE (1.00s – 2.10s ~1.1s SLOW GROWTH)
        // ==================================================
        .to(
          '.hero-bg-container',
          {
            opacity: 1,
            duration: 0.30,
            ease: 'power2.in',
          },
          1.00
        )
        .to(
          '.hero-bg-container',
          {
            clipPath: 'inset(22% 25% 22% 25% round 0px)',
            duration: 1.10,
            ease: 'power3.out',
          },
          1.00
        )

        // ==================================================
        // PHASE 3 — STAGE 2: RAPID FULL-SCREEN EXPANSION (2.10s – 2.65s ~0.55s FAST TAKEOVER!)
        // ==================================================
        .to(
          '.hero-bg-container',
          {
            clipPath: 'inset(0% 0% round 0px)',
            duration: 0.55,
            ease: 'power3.inOut',
          },
          2.10
        )

        // ==================================================
        // PHASE 4 — FULL HERO & UI SETTLES (2.60s – 3.20s)
        // ==================================================
        .to(
          '.hero-nav',
          {
            opacity: 1,
            y: 0,
            duration: 0.70,
            ease: 'power2.out',
          },
          2.60
        )
        .to(
          ['.hero-stat-item', '.hero-left-icons'],
          {
            opacity: 1,
            y: 0,
            duration: 0.60,
            stagger: 0.10,
            ease: 'power2.out',
          },
          2.70
        )
        .to(
          '.team-container',
          {
            opacity: 1,
            y: 0,
            duration: 0.60,
            ease: 'power2.out',
          },
          2.80
        )
        .to(
          '.hero-description',
          {
            opacity: 1,
            y: 0,
            duration: 0.60,
            ease: 'power2.out',
          },
          2.90
        )
        .to(
          '.book-button',
          {
            opacity: 1,
            y: 0,
            duration: 0.60,
            ease: 'power2.out',
          },
          3.00
        )
        .to(
          '.location-info',
          {
            opacity: 1,
            y: 0,
            duration: 0.60,
            ease: 'power2.out',
          },
          3.05
        )
        .to(
          '.hero-grid-lines',
          {
            opacity: 1,
            duration: 0.50,
            ease: 'power2.out',
          },
          3.15
        )
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black font-sans">
      {/* 1. ARCHITECTURAL VILLA BACKGROUND (Tiny -> Grows Slow -> Rapid Fullscreen Expansion) */}
      <HeroBackground />

      {/* 2. FINE ARCHITECTURAL DRAFTING / GRID LINES */}
      <div className="hero-grid-lines absolute inset-0 pointer-events-none z-10 opacity-0">
        <div className="absolute top-[22vh] left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute bottom-[18vh] left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute top-0 left-[6vw] w-[1px] h-full bg-white/[0.04] hidden md:block" />
        <div className="absolute top-0 right-[6vw] w-[1px] h-full bg-white/[0.04] hidden md:block" />
      </div>

      {/* 3. EDITORIAL TOP NAVIGATION */}
      <HeroNav />

      {/* 3.5 UPPER-LEFT ICON GROUP */}
      <div className="hero-left-icons absolute top-[13vh] left-8 md:left-14 z-30 flex items-center space-x-2.5 select-none">
        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:border-white transition-colors cursor-pointer">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
          </svg>
        </div>
        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:border-white transition-colors cursor-pointer">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:border-white transition-colors cursor-pointer">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
      </div>

      {/* 4. UPPER-RIGHT STATISTICS */}
      <HeroStats />

      {/* 5. DOMINANT EDITORIAL TYPOGRAPHY */}
      <HeroTitle />

      {/* 6. LOWER-LEFT AREA (TEAM PREVIEW & DESCRIPTION) */}
      <div className="absolute bottom-[5.5vh] left-8 md:left-14 z-20 flex flex-col space-y-4 max-w-[480px]">
        <TeamPreview />
        <p className="hero-description text-[15px] md:text-[16px] font-light leading-relaxed tracking-wide text-white/90">
          From the moment you arrive, you'll be captivated by the awe-inspiring architecture, breathtaking views, and the tranquil ambiance that envelops each villa.
        </p>
      </div>

      {/* 7. LOWER-RIGHT AREA (LOCATION & BOOKING CTA) */}
      <div className="absolute bottom-[6vh] right-8 md:right-14 z-20 flex flex-col items-end space-y-4">
        <BookStayButton />
        <LocationInfo />
      </div>
    </section>
  )
}
