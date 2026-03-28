import React from 'react'
import type { StockSetting } from '@/types/Settings'
import StockCardTag from '@/ui/stocks/card/tag/StockCardTag'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

type Props = {
  stockId: number
  property: keyof StockSetting['allowTrade']
}

export default function StockCardAllowTag({ stockId, property }: Props) {
  const allow = useSettingsStore((state) => state.stockSettings[stockId]?.allowTrade[property] ?? false)

  return allow ? <StockCardTag text={`Allow ${property}`} tagTheme={'gray'} /> : <></>
}
