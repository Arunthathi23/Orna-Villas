export default function HeroTitle() {
  return (
    <div className="absolute top-[20vh] left-0 w-full px-8 md:px-14 z-20 pointer-events-none select-none">
      <div className="w-full flex flex-col md:flex-row items-start justify-between">
        {/* LEFT / CENTER STACKED TYPOGRAPHY */}
        <div className="flex flex-col">
          <div className="overflow-hidden py-0.5">
            <span className="title-word-ornavillas block text-[clamp(4.2rem,9.2vw,9.8rem)] font-light leading-[0.84] tracking-[-0.04em] text-white">
              PSGVillas
            </span>
          </div>
          <div className="overflow-hidden py-0.5">
            <span className="title-word-living block text-[clamp(4.2rem,9.2vw,9.8rem)] font-light leading-[0.84] tracking-[-0.04em] text-white">
              Living
            </span>
          </div>
        </div>

        {/* RIGHT INDEPENDENT TYPOGRAPHY (Moved downward ~40px) */}
        <div className="mt-24 md:mt-[21vh] md:mr-[2vw]">
          <div className="overflow-hidden py-0.5">
            <span className="title-word-experiences block text-[clamp(4.2rem,9.2vw,9.8rem)] font-light leading-[0.84] tracking-[-0.04em] text-white">
              Experiences
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
