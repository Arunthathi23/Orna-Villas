export default function ServiceIntro() {
  return (
    <div className="flex flex-col justify-between h-full p-6 md:p-8 text-left select-none">
      {/* DESCRIPTIVE INTRO PARAGRAPH (Shifted 50px downward per request) */}
      <p className="intro-paragraph text-white/85 text-xs md:text-sm font-light leading-relaxed tracking-wide max-w-[300px] opacity-0 translate-y-2 mt-[50px]">
        Our services approach is designed to create a seamless and unforgettable experience for our esteemed guests from the moment they step into our world of exclusivity.
      </p>

      {/* TWO EDITORIAL BUTTONS (Box appears first, text appears second) */}
      <div className="flex items-center space-x-3 mt-6">
        {/* BOOK YOUR STAY BUTTON */}
        <div className="btn-book-box bg-white px-4 py-2 rounded-none shadow-sm cursor-pointer opacity-0 translate-y-1 hover:bg-neutral-200 transition-colors">
          <span className="btn-book-text inline-block text-black text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase opacity-0">
            Book your Stay
          </span>
        </div>

        {/* CONTACT US BUTTON */}
        <div className="btn-contact-box border border-white/40 px-4 py-2 rounded-none cursor-pointer opacity-0 translate-y-1 hover:bg-white/10 hover:border-white transition-colors">
          <span className="btn-contact-text inline-block text-white text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase opacity-0">
            Contact Us
          </span>
        </div>
      </div>
    </div>
  )
}
