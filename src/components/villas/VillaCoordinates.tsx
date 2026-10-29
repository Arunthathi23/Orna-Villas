import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

interface VillaCoordinatesProps {
  coordinates: string
  villaId: string
}

// Helper to parse coordinate string "23°05′12″" into numerical { deg, min, sec }
function parseCoordinate(coordStr: string) {
  const match = coordStr.match(/(\d+)°(\d+)′(\d+)″/)
  if (match) {
    return {
      deg: parseInt(match[1], 10),
      min: parseInt(match[2], 10),
      sec: parseInt(match[3], 10),
    }
  }
  return { deg: 23, min: 5, sec: 12 }
}

// Helper to format numerical { deg, min, sec } into string "23°05′12″"
function formatCoordinate(deg: number, min: number, sec: number) {
  const d = Math.round(Math.abs(deg)).toString().padStart(2, '0')
  const m = Math.round(Math.abs(min)).toString().padStart(2, '0')
  const s = Math.round(Math.abs(sec)).toString().padStart(2, '0')
  return `${d}°${m}′${s}″`
}

export default function VillaCoordinates({ coordinates, villaId }: VillaCoordinatesProps) {
  const [displayedCoords, setDisplayedCoords] = useState<string>(coordinates)
  const currentNumericRef = useRef(parseCoordinate(coordinates))
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const isFirstRender = useRef<boolean>(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      setDisplayedCoords(coordinates)
      currentNumericRef.current = parseCoordinate(coordinates)
      return
    }

    const targetNumeric = parseCoordinate(coordinates)
    const startObj = { ...currentNumericRef.current }

    if (tweenRef.current) tweenRef.current.kill()

    // Smoothly animate coordinate numbers through intermediate geographical values during villa transitions
    tweenRef.current = gsap.to(startObj, {
      deg: targetNumeric.deg,
      min: targetNumeric.min,
      sec: targetNumeric.sec,
      duration: 0.65,
      ease: 'power2.inOut',
      onUpdate: () => {
        const formatted = formatCoordinate(startObj.deg, startObj.min, startObj.sec)
        setDisplayedCoords(formatted)
        currentNumericRef.current = { deg: startObj.deg, min: startObj.min, sec: startObj.sec }
      },
      onComplete: () => {
        setDisplayedCoords(coordinates)
        currentNumericRef.current = targetNumeric
      },
    })

    return () => {
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [coordinates, villaId])

  return (
    <div className="flex justify-center items-center select-none py-1 overflow-hidden">
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-neutral-800 tracking-[0.25em] font-mono text-center inline-block">
        {displayedCoords}
      </span>
    </div>
  )
}
