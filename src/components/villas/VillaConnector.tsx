import React, { forwardRef, useEffect, useRef } from 'react'
import gsap from 'gsap'

const VillaConnector = forwardRef<SVGPathElement, React.SVGProps<SVGSVGElement>>((_props, ref) => {
  const localRef = useRef<SVGPathElement | null>(null)
  const linePathRef = (ref as React.RefObject<SVGPathElement | null>) || localRef

  useEffect(() => {
    if (linePathRef.current) {
      try {
        const length = linePathRef.current.getTotalLength() || 650
        gsap.set(linePathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
      } catch {
        gsap.set(linePathRef.current, { strokeDasharray: 650, strokeDashoffset: 650 })
      }
    }
  }, [linePathRef])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      {/* THIN HORIZONTAL GUIDE LINE NEAR LOWER PORTION */}
      <line
        x1="100"
        y1="850"
        x2="900"
        y2="850"
        stroke="#e5e5e5"
        strokeWidth="1"
      />

      {/* DIAGONAL CONNECTOR LINE (DRAWS FROM VERY BOTTOM EDGE AT 270,1000 TO BLACK DOT AT 500,470) */}
      <path
        ref={linePathRef}
        d="M 270 1000 L 500 470"
        stroke="#111111"
        strokeWidth="1.2"
        strokeOpacity="0.45"
        fill="none"
      />
    </svg>
  )
})

VillaConnector.displayName = 'VillaConnector'
export default VillaConnector
