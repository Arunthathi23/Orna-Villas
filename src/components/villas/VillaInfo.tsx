import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { Villa } from '../../types'

interface VillaInfoProps {
  activeVilla: Villa 
}

export default function VillaInfo({ activeVilla }: VillaInfoProps) {
  const [displayedVilla, setDisplayedVilla] = useState<Villa>(activeVilla)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useRef<boolean>(true)

  useEffect(() => {
    if (!containerRef.current) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      gsap.set(containerRef.current.children, { opacity: 0, y: 10 })
      return
    }

    const tl = gsap.timeline()
    tl.to(containerRef.current.children, {
      y: -10,
      opacity: 0,
      duration: 0.20,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        setDisplayedVilla(activeVilla)
      },
    }).fromTo(
      containerRef.current.children,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
    )

    return () => {
      tl.kill()
    }
  }, [activeVilla.id, activeVilla])

  return (
    <div ref={containerRef} className="flex flex-col text-left select-none max-w-[260px] md:max-w-[320px]">
      {/* PROPERTY NAME */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight leading-tight">
        {displayedVilla.name}
      </h2>

      {/* LOCATION */}
      <p className="text-xs md:text-sm text-neutral-500 font-light tracking-wider mt-1.5 md:mt-2">
        {displayedVilla.location}
      </p>
    </div>
  )
}
