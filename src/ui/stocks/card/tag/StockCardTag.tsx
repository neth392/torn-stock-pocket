import React, { useMemo } from 'react'
import type { QuickButtonColor } from '@/types/Settings'
import { type TagTheme, tagThemeBorderMap, tagThemeColorMap, tagThemeGlowMap } from '@/ui/colors'

type Props = {
  text: string
  tagTheme: TagTheme
  handleClick?: () => void
  glow?: boolean
}

export default function StockCardTag({ text, tagTheme, handleClick, glow = false }: Props) {
  return (
    <div
      className={`${glow ? `${tagThemeGlowMap[tagTheme]} ${tagThemeBorderMap[tagTheme]}` : ''} group relative
        inline-flex rounded-md ${handleClick ? 'transition-transform hover:scale-105' : ''}`}
      onClick={() => handleClick && handleClick()}
    >
      <label
        className={`flex w-fit ${handleClick ? 'cursor-pointer' : ''} items-center gap-2 rounded-md border p-1 px-2
          select-none ${tagThemeColorMap[tagTheme]}`}
      >
        <span className="text-s whitespace-nowrap">{text}</span>
      </label>
    </div>
  )
}
