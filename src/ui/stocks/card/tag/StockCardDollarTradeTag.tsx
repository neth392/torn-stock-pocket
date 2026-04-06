import React from 'react'
import type { StockSetting } from '@/types/Settings'
import StockCardTag from '@/ui/stocks/card/tag/StockCardTag'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

type Props = {
  stockId: number
  property: keyof StockSetting['dollarTrade']
}

export default function StockCardDollarTradeTag({ stockId, property }: Props) {
  const enabled = useSettingsStore((state) => state.stockSettings[stockId]?.dollarTrade[property] ?? false)

  return enabled ? <StockCardTag text={`$ ${property}`} tagTheme={'gray'} className={'capitalize'} /> : null
}
