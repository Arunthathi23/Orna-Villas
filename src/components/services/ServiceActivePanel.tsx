import { ServiceRegionData } from '../../types'

interface ServiceActivePanelProps {
  activeService?: ServiceRegionData | null
}

export default function ServiceActivePanel({ activeService }: ServiceActivePanelProps) {
  if (!activeService) return null

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between p-6 md:p-8 select-none m-0 border-0 outline-none">
      {/* UPPER-LEFT SERVICE TITLE */}
      <h3 className="text-sm md:text-base font-normal text-neutral-900 tracking-wide text-left">
        {activeService.title}
      </h3>

      {/* CENTER CIRCULAR DETAIL CONTROL */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-neutral-300/80 flex flex-col items-center justify-center text-neutral-600 pointer-events-auto cursor-pointer hover:border-black hover:text-black transition-colors duration-200 group bg-white shadow-none">
          <span className="text-[9px] md:text-[10px] font-light tracking-widest lowercase text-neutral-500 group-hover:text-black transition-colors">
            detail
          </span>
          <svg className="w-3.5 h-3.5 mt-0.5 text-neutral-700 group-hover:text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="7" y1="7" x2="17" y2="17" />
            <polyline points="17 7 17 17 7 17" />
          </svg>
        </div>
      </div>
    </div>
  )
}
