export default function VillaBooking() {
  return (
    <div className="w-full flex justify-between items-center px-2 md:px-4 select-none z-20">
      {/* BOTTOM LEFT: BEST OF THE MONTH */}
      <span className="text-[10px] md:text-[11px] font-light text-neutral-400 tracking-widest uppercase">
        Best of the Month
      </span>

      {/* BOTTOM RIGHT: BOOK THIS VILLA BUTTON */}
      <button className="bg-black text-white px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase rounded-none hover:bg-neutral-850 transition-colors duration-200 cursor-pointer shadow-sm active:scale-[0.98]">
        Book this Villa
      </button>
    </div>
  )
}
