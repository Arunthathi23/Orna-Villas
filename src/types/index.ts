import React from 'react'

export interface Villa {
  id: string
  index: string
  name: string
  location: string
  coordinates: string
  image: string
}

export interface ServiceRegionData {
  id: string
  title: string
  label: string
  style: React.CSSProperties
}

export interface VillaCircleRef {
  revealVilla: (newImage: string, duration?: number, onCompleteCallback?: () => void) => void
  startRadialSweep: (newImage: string, duration?: number, onCompleteCallback?: () => void) => void
}

export interface GridOverlayRefs {
  vertLine1Ref: React.RefObject<SVGPathElement | null>
  vertLine2Ref: React.RefObject<SVGPathElement | null>
  horizLine1Ref: React.RefObject<SVGPathElement | null>
  horizLine2Ref: React.RefObject<SVGPathElement | null>
}
