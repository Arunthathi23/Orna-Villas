import heroBg from '../../assets/hero_villa_bg.jpg'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none select-none bg-black">
      {/* VILLA IMAGE WINDOW CONTAINER (Animates from small window to full viewport) */}
      <div className="hero-bg-container absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center opacity-0">
        <img
          src={heroBg}
          alt="OrnaVillas Architectural Villa"
          className="hero-bg-img w-full h-full object-cover object-[center_35%] scale-110"
        />
      </div>
    </div>
  )
}
