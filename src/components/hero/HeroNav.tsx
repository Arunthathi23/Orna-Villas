import { useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroNav() {
  const [page, setPage] = useState<1 | 2 | 3>(1)

  useGSAP(() => {
    // Page 2 trigger (.page-two-section)
    const stPage2 = ScrollTrigger.create({
      trigger: '.page-two-section',
      start: 'top 20%',
      end: 'bottom 20%',
      onEnter: () => setPage(2),
      onLeaveBack: () => setPage(1),
      onEnterBack: () => setPage(2),
    })

    // Page 3 trigger (.page-three-section)
    const stPage3 = ScrollTrigger.create({
      trigger: '.page-three-section',
      start: 'top 20%',
      end: 'bottom 20%',
      onEnter: () => setPage(3),
      onLeaveBack: () => setPage(2),
      onEnterBack: () => setPage(3),
    })

    return () => {
      stPage2.kill()
      stPage3.kill()
    }
  }, [])

  const isBlack = page === 2
  const showLine = page !== 3

  return (
    <header
      className={`hero-nav fixed top-0 left-0 w-full z-50 pointer-events-auto bg-transparent select-none transition-colors duration-500 ${
        isBlack ? 'text-black' : 'text-white'
      }`}
    >
      <div className="w-full px-8 md:px-14 pt-4 pb-2 flex items-center justify-between">
        {/* LEFT NAV ITEMS */}
        <nav
          className={`flex items-center space-x-10 text-[11px] font-light tracking-[0.22em] uppercase transition-colors duration-500 ${
            isBlack ? 'text-black/85' : 'text-white/85'
          }`}
        >
          <a
            href="#services"
            className={`transition-colors duration-300 ${isBlack ? 'hover:text-black' : 'hover:text-white'}`}
          >
            Services
          </a>
          <a
            href="#destinations"
            className={`transition-colors duration-300 ${isBlack ? 'hover:text-black' : 'hover:text-white'}`}
          >
            Destinations
          </a>
        </nav>

        {/* CENTER WORDMARK (Visually centered) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 text-xs md:text-sm font-light tracking-[0.38em] uppercase transition-colors duration-500 ${
            isBlack ? 'text-black' : 'text-white'
          }`}
        >
          OrnaVillas
        </div>

        {/* RIGHT NAV ITEMS (Collection Series removed) */}
        <div className="flex items-center">
          <button
            aria-label="Navigation Control"
            className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-500 cursor-pointer ${
              isBlack ? 'border-black/40 hover:border-black' : 'border-white/30 hover:border-white'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                isBlack ? 'bg-black/90' : 'bg-white/90'
              }`}
            />
          </button>
        </div>
      </div>

      {/* HORIZONTAL DIVIDER LINE (Immediately below OrnaVillas, disappears on Page 3) */}
      <div
        className={`hero-nav-line w-full h-[1px] pointer-events-none transition-all duration-500 ${
          showLine ? (isBlack ? 'opacity-100 bg-black/25' : 'opacity-100 bg-white/25') : 'opacity-0'
        }`}
      />
    </header>
  )
}
