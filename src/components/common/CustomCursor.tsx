import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const targetPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
  const currentPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
  const isFirstMove = useRef<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      if (isFirstMove.current) {
        currentPos.current = { x: e.clientX, y: e.clientY }
        isFirstMove.current = false
      }
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.16)
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.16)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        willChange: 'transform',
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path
          d="M0 0L7 18L10.5 10.5L18 7L0 0Z"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
