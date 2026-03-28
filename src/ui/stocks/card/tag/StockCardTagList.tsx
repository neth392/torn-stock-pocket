import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { useShallow } from 'zustand/react/shallow'
import StockCardQuickButtonTag from '@/ui/stocks/card/tag/StockCardQuickButtonTag'
import StockCardAllowTag from '@/ui/stocks/card/tag/StockCardAllowTag'

type Props = {
  stockId: number
}

export default function StockCardTagList({ stockId }: Props) {
  const quickButtonIds = useSettingsStore(useShallow((state) => state.stockSettings[stockId]!.quickButtonOrder))

  return (
    <div className={'flex flex-wrap items-center justify-start gap-2 p-1 pb-0 pl-0'}>
      <StockCardAllowTag stockId={stockId} property={'buy'} />
      <StockCardAllowTag stockId={stockId} property={'sell'} />
      {quickButtonIds.map((quickButtonId) => (
        <StockCardQuickButtonTag key={stockId} stockId={stockId} quickButtonId={quickButtonId} />
      ))}
    </div>
  )
}
