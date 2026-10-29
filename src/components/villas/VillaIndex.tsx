interface VillaIndexProps {
  activeIndex: number
  totalVillas?: number
  onSelectVilla: (index: number) => void
}

export default function VillaIndex({ activeIndex, totalVillas, onSelectVilla }: VillaIndexProps) {
  const total = totalVillas || 6
  const formattedTotal = total.toString().padStart(2, '0')

  // Determine which 3 indices to display in the window
  let visibleIndices: number[] = []
  if (activeIndex === 0) {
    visibleIndices = [0, 1, 2]
  } else if (activeIndex === total - 1) {
    visibleIndices = [total - 3, total - 2, total - 1]
  } else {
    visibleIndices = [activeIndex - 1, activeIndex, activeIndex + 1]
  }

  return (
    <div className="flex flex-col space-y-5 select-none text-left">
      {visibleIndices.map((idx) => {
        const isActive = idx === activeIndex
        const numStr = (idx + 1).toString().padStart(2, '0')

        return (
          <div
            key={idx}
            onClick={() => onSelectVilla(idx)}
            className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 group ${
              isActive ? 'text-neutral-950 font-normal' : 'text-neutral-300 font-light hover:text-neutral-600'
            }`}
          >
            <span className="text-sm md:text-base tracking-widest transition-transform duration-300 group-hover:translate-x-0.5">
              {numStr}
            </span>
            {isActive && (
              <span className="text-xs md:text-sm tracking-widest text-neutral-950 flex items-center space-x-1 font-normal animate-fadeIn">
                <span className="text-[10px] mx-1">•</span>
                <span>{formattedTotal}</span>
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
