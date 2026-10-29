export default function ServiceNavigation() {
  return (
    <div className="nav-element relative w-full flex items-center justify-between pb-3.5 pt-2 border-b border-white/20 text-white text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase select-none z-30 px-6 md:px-10">
      {/* LEFT */}
      <div className="flex space-x-6 md:space-x-8">
        <span className="cursor-pointer hover:text-white/60 transition-colors">Services</span>
        <span className="cursor-pointer hover:text-white/60 transition-colors">Destinations</span>
      </div>

      {/* CENTER: OPTICALLY CENTERED WORDMARK */}
      <div className="absolute left-1/2 -translate-x-1/2 font-medium tracking-[0.3em] text-xs md:text-sm text-white">
        OrnaVillas
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <span className="hidden sm:inline-block cursor-pointer hover:text-white/60 transition-colors">
          Childcare Services
        </span>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
            <svg className="w-2.5 h-2.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </div>
          <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
            <svg className="w-2.5 h-2.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
