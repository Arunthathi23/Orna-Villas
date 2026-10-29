import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { villas } from '../../data/villasData'
import { VillaCircleRef } from '../../types'
import VillaIndex from './VillaIndex'
import VillaCircle from './VillaCircle'
import VillaInfo from './VillaInfo'
import VillaCoordinates from './VillaCoordinates'
import VillaConnector from './VillaConnector'
import VillaBooking from './VillaBooking'

gsap.registerPlugin(ScrollTrigger)

export default function VillaSelector() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeVilla = villas[activeIndex] || villas[0]

  const containerRef = useRef<HTMLDivElement | null>(null)
  const linePathRef = useRef<SVGPathElement | null>(null)
  const circleRef = useRef<VillaCircleRef | null>(null)

  const handleSelectVilla = (index: number) => {
    if (index >= 0 && index < villas.length) {
      setActiveIndex(index)
      if (circleRef.current && circleRef.current.revealVilla) {
        circleRef.current.revealVilla(villas[index].image, 0.65)
      }
    }
  }

  // AUTOMATIC SCROLL-TRIGGERED VILLA SEQUENCE (100vh threshold)
  useGSAP(
    () => {
      const lineEl = linePathRef.current
      if (!lineEl) return

      let lineLength = 650
      try {
        lineLength = lineEl.getTotalLength() || 650
      } catch {
        lineLength = 650
      }

      // Initial state: diagonal line hidden
      gsap.set(lineEl, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      })

      // Master automatic timeline triggered when user crosses 100vh into Page 2
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.page-two-section',
          start: 'top top', // Triggers when top of Page 2 section reaches top of viewport
          once: true, // Plays once through the sequence
        },
      })

      // STAGE 1 (0.00s - 0.60s): DIAGONAL LINE DRAWS FROM BOTTOM EDGE UP TO BLACK DOT
      tl.to(lineEl, {
        strokeDashoffset: 0,
        duration: 0.60,
        ease: 'power2.inOut',
      })

      // STAGE 2: AUTOMATIC REVEAL SEQUENCE FOR ALL VILLAS (01 -> 02 -> 03 -> 04 -> 05 -> 06)
      villas.forEach((v, idx) => {
        const revealStartTime = 0.60 + idx * 1.45 // 0.65s radial sweep + 0.80s viewing pause per villa

        tl.add(() => {
          setActiveIndex(idx)
          if (circleRef.current && circleRef.current.revealVilla) {
            circleRef.current.revealVilla(v.image, 0.65)
          }
        }, revealStartTime)
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="page-two-shell relative w-full min-h-screen bg-white flex flex-col justify-between p-6 md:p-12 overflow-hidden"
    >
      {/* LAYER 20: DIAGONAL CONNECTOR SVG LINE (Draws from bottom edge to black dot) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <VillaConnector ref={linePathRef} />
      </div>



      {/* MAIN CONTENT AREA */}
      <div className="relative w-full flex-1 flex flex-col justify-center items-center py-4 z-20">
        {/* CENTER COMPOSITION GRID: LEFT INDEX, CENTER CIRCLE, RIGHT INFO */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 space-y-6 md:space-y-0">
          {/* 1. LEFT VILLA INDEX */}
          <div className="villa-index-wrapper w-full md:w-1/4 flex justify-start pl-2 md:pl-4 z-30">
            <VillaIndex
              activeIndex={activeIndex}
              totalVillas={villas.length}
              onSelectVilla={handleSelectVilla}
            />
          </div>

          {/* 2. CENTRAL CIRCULAR IMAGE + COORDINATES DIRECTLY UNDERNEATH */}
          <div className="relative flex flex-col items-center justify-center my-2 md:my-0 z-30">
            <VillaCircle ref={circleRef} activeVilla={activeVilla} />
            <div className="villa-coords-wrapper mt-4 md:mt-5">
              <VillaCoordinates
                coordinates={activeVilla.coordinates}
                villaId={activeVilla.id}
              />
            </div>
          </div>

          {/* 3. RIGHT PROPERTY INFORMATION */}
          <div className="villa-info-wrapper w-full md:w-1/4 flex justify-start md:justify-end pr-2 md:pr-4 z-30">
            <VillaInfo activeVilla={activeVilla} />
          </div>
        </div>
      </div>

      {/* BOTTOM METADATA & BOOKING CTA (z-30) */}
      <div className="relative z-30">
        <VillaBooking />
      </div>
    </div>
  )
}
