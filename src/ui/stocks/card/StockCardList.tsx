import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { useShallow } from 'zustand/react/shallow'
import StockCard from '@/ui/stocks/card/StockCard'

export default function StockCardList() {
  const stockIds = useSettingsStore(useShallow((state) => state.stockSettingsOrder))
  return (
    <div className={'mb-2 flex flex-col gap-2'}>
      {stockIds.map((stockId) => (
        <StockCard key={stockId} stockId={stockId} />
      ))}
    </div>
  )
}
