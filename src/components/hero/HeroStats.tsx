interface StatItem {
  value: string
  label: string
}

export default function HeroStats() {
  const stats: StatItem[] = [
    { value: '32', label: 'countries' },
    { value: '650', label: 'villas' },
    { value: '21', label: 'architects' },
  ]

  return (
    <div className="hero-stats absolute top-[13vh] right-8 md:right-14 z-30 flex items-center space-x-8 md:space-x-12 select-none">
      {stats.map((item, index) => (
        <div key={index} className="hero-stat-item flex items-baseline space-x-2">
          <span className="text-sm md:text-base font-light tracking-wide text-white">
            {item.value}
          </span>
          <span className="text-[11px] font-light tracking-wider text-white/80">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
