import React from 'react'

interface ServiceRegionProps {
  id?: string
  title: string
  label: string
  style?: React.CSSProperties
  isActive: boolean
  onMouseEnter: () => void
}

export default function ServiceRegion({ title, label, style, isActive, onMouseEnter }: ServiceRegionProps) {
  // SVG Circle Circumference for r=36: 2 * PI * 36 ≈ 226.2
  const CIRCUMFERENCE = 226.2
  const PARTIAL_OFFSET = 113.1 // Starts at ~50% drawn (half circle)

  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      className="absolute cursor-pointer select-none overflow-hidden z-20"
    >
      {/* INACTIVE STATE: NORMAL LABEL TEXT OVER PHOTO */}
      <div
        className={`w-full h-full p-6 md:p-8 flex items-start justify-start transition-opacity duration-500 ease-out ${
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="grid-label text-xs md:text-sm font-light tracking-wide text-white/85 hover:text-white text-left inline-block">
          {label}
        </span>
      </div>

      {/* ACTIVE STATE: WHITE SELECTION BOX (SMOOTH OPACITY FADE 0 -> 1 OVER 500ms) */}
      <div
        className={`absolute inset-0 bg-white text-neutral-900 flex flex-col justify-between p-6 md:p-8 border-none outline-none select-none z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-[0.99]'
        }`}
      >
        {/* SERVICE TITLE IN UPPER-LEFT */}
        <h3
          className={`text-sm md:text-base font-normal text-neutral-900 tracking-wide text-left transition-all duration-500 delay-75 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          {title}
        </h3>

        {/* CENTER CIRCULAR DETAILS CONTROL WITH PARTIAL-TO-FULL STROKE DRAW & FAINT-TO-FULL TEXT EMERGENCE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center pointer-events-auto cursor-pointer group bg-white rounded-full">
            {/* SVG Animated Circle: Begins partial, draws around circumference to complete circle */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 80 80"
            >
              {/* Faint base track (optional subtle guide line) */}
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="rgba(229, 229, 229, 0.6)"
                strokeWidth="1"
              />
              {/* Dynamic completing black stroke */}
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#171717"
                strokeWidth="1.2"
                strokeDasharray={CIRCUMFERENCE}
                style={{
                  strokeDashoffset: isActive ? 0 : PARTIAL_OFFSET,
                  transition: isActive
                    ? 'stroke-dashoffset 750ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
                    : 'stroke-dashoffset 400ms ease-out',
                }}
              />
            </svg>

            {/* DETAILS TEXT: Starts faint white/grey, smoothly emerges to full opacity as circle completes */}
            <span
              className={`text-[9px] md:text-[10px] font-light tracking-[0.2em] uppercase text-neutral-800 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-1'
              }`}
            >
              details
            </span>

            {/* ARROW ICON: Synchronized fade & subtle hover offset */}
            <svg
              className={`w-3.5 h-3.5 mt-0.5 text-neutral-800 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-1'
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="7" y1="7" x2="17" y2="17" />
              <polyline points="17 7 17 17 7 17" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}


