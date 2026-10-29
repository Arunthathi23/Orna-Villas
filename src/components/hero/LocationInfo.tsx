export default function LocationInfo() {
  return (
    <div className="location-info flex items-center space-x-2 select-none">
      {/* OUTLINED LOCATION BOX */}
      <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded border border-white/30 bg-black/30 backdrop-blur-sm text-[11px] font-light text-white">
        <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-white/90 text-[11px] font-light leading-none">California</span>
          <span className="text-[9px] text-white/50 leading-none mt-0.5">USA</span>
        </div>
        <span className="text-[9px] text-white/40 underline cursor-pointer ml-1">Edit</span>
      </div>

      {/* TWO CIRCULAR ICON CONTROLS */}
      <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white transition-colors cursor-pointer">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
        </svg>
      </div>
      <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white transition-colors cursor-pointer">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      </div>
    </div>
  )
}
