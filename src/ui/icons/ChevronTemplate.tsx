import React from 'react'

export type ChevronProps = {
  className?: string
  size?: number
}

type Props = ChevronProps & { d: string; viewBox: string }

export default function ChevronTemplate({ className = '', size = 16, d, viewBox }: Props) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
      <path fillRule="nonzero" fill="currentColor" d={d} />
    </svg>
  )
}
