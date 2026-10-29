import React, { forwardRef, useEffect } from 'react'
import gsap from 'gsap'
import { GridOverlayRefs } from '../../types'

const GridOverlay = forwardRef<GridOverlayRefs, React.SVGProps<SVGSVGElement>>((_props, ref) => {
  const lineRefs = ref as unknown as GridOverlayRefs
  const { vertLine1Ref, vertLine2Ref, horizLine1Ref, horizLine2Ref } = lineRefs || {}

  useEffect(() => {
    const setupLine = (lineRef: React.RefObject<SVGPathElement | null> | undefined, defaultLen: number) => {
      if (!lineRef || !lineRef.current) return
      try {
        const len = lineRef.current.getTotalLength() || defaultLen
        gsap.set(lineRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        })
      } catch {
        gsap.set(lineRef.current, {
          strokeDasharray: defaultLen,
          strokeDashoffset: defaultLen,
        })
      }
    }

    setupLine(vertLine1Ref, 620)
    setupLine(vertLine2Ref, 1000)
    setupLine(horizLine1Ref, 666)
    setupLine(horizLine2Ref, 1000)
  }, [vertLine1Ref, vertLine2Ref, horizLine1Ref, horizLine2Ref])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      {/* VERTICAL LINE 1: Starts at y=380 (Horizontal Line 1) and draws UPWARD from bottom 1000 to 380 */}
      <path
        ref={vertLine1Ref}
        d="M 333.33 1000 L 333.33 380"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        fill="none"
      />

      {/* VERTICAL LINE 2: Full height from bottom 1000 UPWARD to top 0 at X=666.66 */}
      <path
        ref={vertLine2Ref}
        d="M 666.66 1000 L 666.66 0"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        fill="none"
      />

      {/* HORIZONTAL LINE 1: Starts at X=333.33 (Vertical Line 1) and draws LEFT -> RIGHT to X=1000 at Y=380 */}
      <path
        ref={horizLine1Ref}
        d="M 333.33 380 L 1000 380"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        fill="none"
      />

      {/* HORIZONTAL LINE 2: Full width from X=0 LEFT -> RIGHT to X=1000 at Y=660 */}
      <path
        ref={horizLine2Ref}
        d="M 0 660 L 1000 660"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
})

GridOverlay.displayName = 'GridOverlay'
export default GridOverlay
