import ServiceIntro from './ServiceIntro'
import ServiceRegion from './ServiceRegion'
import GridOverlay from './GridOverlay'
import { serviceRegionsData } from '../../data/servicesData'
import { GridOverlayRefs } from '../../types'

interface ServiceGridProps {
  activeRegionId: string | null
  onHoverRegion: (regionId: string) => void
  onLeaveGrid: () => void
  isInteractive: boolean
  lineRefs: GridOverlayRefs
}

export default function ServiceGrid({ activeRegionId, onHoverRegion, onLeaveGrid, isInteractive, lineRefs }: ServiceGridProps) {
  return (
    <div
      onMouseLeave={() => isInteractive && onLeaveGrid()}
      className="relative w-full flex-1 z-20 overflow-hidden text-left"
    >
      {/* SVG GRID OVERLAY: Rendered in the exact same container to guarantee 1:1 grid coordinate matching */}
      {lineRefs && <GridOverlay ref={lineRefs as any} />}

      {/* 1. TOP-LEFT INTRO AREA (Col 0, Y: 0% to 66%) */}
      <div className="absolute top-0 left-0 w-[33.333%] h-[66%] p-6 md:p-8 z-10 pointer-events-auto">
        <ServiceIntro />
      </div>

      {/* 2. THE 6 DISTINCT SELF-CONTAINED SERVICE REGIONS */}
      {serviceRegionsData.map((region) => (
        <ServiceRegion
          key={region.id}
          id={region.id}
          title={region.title}
          label={region.label}
          style={region.style}
          isActive={activeRegionId === region.id}
          onMouseEnter={() => isInteractive && onHoverRegion(region.id)}
        />
      ))}
    </div>
  )
}
