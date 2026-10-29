import avatar1 from '../../assets/avatar1.jpg'
import avatar2 from '../../assets/avatar2.jpg'
import avatar3 from '../../assets/avatar3.jpg'

export default function TeamPreview() {
  const avatars: string[] = [avatar1, avatar2, avatar3]

  return (
    <div className="team-container flex items-center space-x-4 select-none">
      {/* OVERLAPPING AVATAR CIRCLES */}
      <div className="flex items-center -space-x-2.5">
        {avatars.map((imgSrc, idx) => (
          <div
            key={idx}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/40 overflow-hidden bg-neutral-900 shadow-sm"
          >
            <img
              src={imgSrc}
              alt={`Architect ${idx + 1}`}
              className="w-full h-full object-cover filter saturate-[0.8]"
            />
          </div>
        ))}
      </div>

      {/* MEET OUR TEAM LABEL */}
      <span className="text-xs md:text-sm font-light tracking-[0.22em] uppercase text-white/90">
        Meet our Team
      </span>
    </div>
  )
}
