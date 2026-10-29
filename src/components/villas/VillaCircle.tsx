import { useRef, useState, useEffect, useImperativeHandle, useCallback, forwardRef } from 'react'
import gsap from 'gsap'
import { Villa, VillaCircleRef } from '../../types'

interface VillaCircleProps {
  activeVilla: Villa
}

const VillaCircle = forwardRef<VillaCircleRef, VillaCircleProps>(({ activeVilla }, ref) => {
  const [baseImage, setBaseImage] = useState<string | null>(null)
  const [overlayImage, setOverlayImage] = useState<string>(activeVilla.image)

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const angleRef = useRef<{ angle: number }>({ angle: 0 })
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Helper to update CSS conic-gradient mask
  const applyConicMask = (deg: number) => {
    if (!overlayRef.current) return
    const maskString = `conic-gradient(from 0deg at 50% 50%, #000 0deg, #000 ${deg}deg, transparent ${Math.min(deg + 0.1, 360)}deg, transparent 360deg)`
    overlayRef.current.style.maskImage = maskString
    overlayRef.current.style.webkitMaskImage = maskString
  }

  // Radial sector reveal method
  const revealVilla = useCallback((newImage: string, duration = 0.65, onCompleteCallback?: () => void) => {
    if (tweenRef.current) tweenRef.current.kill()

    setOverlayImage(newImage)
    angleRef.current.angle = 0
    applyConicMask(0)

    tweenRef.current = gsap.to(angleRef.current, {
      angle: 360,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        applyConicMask(angleRef.current.angle)
      },
      onComplete: () => {
        setBaseImage(newImage)
        if (onCompleteCallback) onCompleteCallback()
      },
    })
  }, [])

  useImperativeHandle(ref, () => ({
    revealVilla,
    startRadialSweep: revealVilla,
  }), [revealVilla])

  useEffect(() => {
    // Initial hidden mask setup
    applyConicMask(0)
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      {/* STATIONARY PERFECT CIRCLE CONTAINER */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden bg-neutral-100/60 shadow-inner flex items-center justify-center z-10 border border-black/5">
        {/* BASE LAYER (PREVIOUS VILLA PHOTO) */}
        {baseImage && (
          <img
            src={baseImage}
            alt="Current Villa Base"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />
        )}

        {/* OVERLAY LAYER (NEW VILLA PHOTO WITH CONIC MASK) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{
            WebkitMaskImage: `conic-gradient(from 0deg at 50% 50%, #000 0deg, transparent 0deg)`,
            maskImage: `conic-gradient(from 0deg at 50% 50%, #000 0deg, transparent 0deg)`,
          }}
        >
          <img
            src={overlayImage}
            alt={activeVilla.name}
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
        </div>
      </div>

      {/* CENTER BLACK DOT (Anchored at center of circle at z-30) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-2.5 md:h-2.5 bg-black rounded-full z-30 pointer-events-none shadow-sm" />
    </div>
  )
})

VillaCircle.displayName = 'VillaCircle'
export default VillaCircle
