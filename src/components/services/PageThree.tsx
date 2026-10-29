import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ServiceNavigation from './ServiceNavigation'
import ServiceGrid from './ServiceGrid'
import { GridOverlayRefs } from '../../types'

gsap.registerPlugin(ScrollTrigger)

export default function PageThree() {
  // Entrance completes with NO active region (activeRegionId = null)
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null)
  const [isInteractive, setIsInteractive] = useState<boolean>(true)

  const containerRef = useRef<HTMLElement | null>(null)
  const bgImgRef = useRef<HTMLImageElement | null>(null)
  const vertLine1Ref = useRef<SVGPathElement | null>(null)
  const vertLine2Ref = useRef<SVGPathElement | null>(null)
  const horizLine1Ref = useRef<SVGPathElement | null>(null)
  const horizLine2Ref = useRef<SVGPathElement | null>(null)

  const lineRefs: GridOverlayRefs = {
    vertLine1Ref,
    vertLine2Ref,
    horizLine1Ref,
    horizLine2Ref,
  }

  const handleHoverRegion = (regionId: string) => {
    setActiveRegionId(regionId)
  }

  const handleLeaveGrid = () => {
    setActiveRegionId(null)
  }

  // PAUSED TIMELINE TRIGGERED EXCLUSIVELY VIA SCROLLTRIGGER ONENTER
  useGSAP(
    () => {
      // 1. Set initial hidden state for all Page 3 entrance elements
      gsap.set(bgImgRef.current, { opacity: 0 })
      gsap.set('.intro-paragraph', { opacity: 0, y: 6 })
      gsap.set('.btn-book-box', { opacity: 0, y: 4 })
      gsap.set('.btn-book-text', { opacity: 0 })
      gsap.set('.btn-contact-box', { opacity: 0, y: 4 })
      gsap.set('.btn-contact-text', { opacity: 0 })
      gsap.set('.grid-label', { opacity: 0, y: 5 })
      gsap.set('.nav-element', { opacity: 0, y: 4 })

      // 2. Create timeline in explicit PAUSED state so it NEVER plays on initial page load / Page 1
      const tl = gsap.timeline({ paused: true })

      // STEP 1 (0.00s - 0.85s): VILLA BACKGROUND IMAGE APPEARS FIRST AT FINAL POSITION
      tl.to(
        bgImgRef.current,
        {
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
        },
        0.00
      )

      // STEP 2 (0.40s - 1.60s): VERTICAL GRID LINES DRAW UPWARD FROM BOTTOM ENDPOINTS
      tl.to(
        [vertLine1Ref.current, vertLine2Ref.current],
        {
          strokeDashoffset: 0,
          duration: 1.20,
          stagger: 0.15,
          ease: 'power3.out',
        },
        0.40
      )

      // STEP 3 (0.90s - 2.00s): HORIZONTAL GRID LINES DRAW LEFT -> RIGHT
      tl.to(
        [horizLine1Ref.current, horizLine2Ref.current],
        {
          strokeDashoffset: 0,
          duration: 1.10,
          stagger: 0.12,
          ease: 'power3.out',
        },
        0.90
      )

      // STEP 4 (1.50s - 2.25s): INTRODUCTORY PARAGRAPH REVEALS IN PLACE
      tl.to(
        '.intro-paragraph',
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        },
        1.50
      )

      // STEP 5 (1.80s - 2.50s): SERVICE TEXT LABELS REVEAL AT CELL POSITIONS
      tl.to(
        '.grid-label',
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
        },
        1.80
      )

      // STEP 6 (2.00s - 2.55s): BUTTON RECTANGLES APPEAR FIRST
      tl.to(
        ['.btn-book-box', '.btn-contact-box'],
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.10,
          ease: 'power2.out',
        },
        2.00
      )

      // STEP 7 (2.25s - 2.65s): BUTTON TEXT APPEARS SECOND
      tl.to(
        ['.btn-book-text', '.btn-contact-text'],
        {
          opacity: 1,
          duration: 0.35,
          stagger: 0.10,
          ease: 'power2.out',
        },
        2.25
      )

      // STEP 8 (2.15s - 2.70s): TOP NAVIGATION ELEMENTS SETTLE
      tl.to(
        '.nav-element',
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        2.15
      )

      // UNLOCK INTERACTIVE HOVER SYSTEM AT END OF ENTRANCE (2.80s)
      tl.add(() => {
        setIsInteractive(true)
      }, 2.80)

      // 3. ATTACH SCROLLTRIGGER STRICTLY TO PAGE 3 SECTION (Triggers play(0) ONLY onScroll to Page 3)
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          tl.play(0)
        },
      })

      return () => {
        st.kill()
        tl.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="page-three-section relative w-full h-screen min-h-[680px] overflow-hidden bg-neutral-950 flex flex-col justify-between"
    >
      {/* 1. BACKGROUND ARCHITECTURAL PHOTOGRAPH */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          ref={bgImgRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="OrnaVillas Luxury Services Architecture"
          className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.08] saturate-[0.9]"
        />
        {/* SUBTLE DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
      </div>



      {/* 3. INTERACTIVE STAGGERED SERVICE GRID (GridOverlay inside ServiceGrid for 1:1 Coordinate Alignment) */}
      <div className="relative flex-1 flex flex-col z-20">
        <ServiceGrid
          activeRegionId={activeRegionId}
          onHoverRegion={handleHoverRegion}
          onLeaveGrid={handleLeaveGrid}
          isInteractive={isInteractive}
          lineRefs={lineRefs}
        />
      </div>
    </section>
  )
}
