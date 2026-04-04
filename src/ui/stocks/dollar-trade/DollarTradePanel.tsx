import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { useShallow } from 'zustand/react/shallow'
import DollarTradeField from '@/ui/stocks/dollar-trade/DollarTradeField'

export default function DollarTradePanel() {
  const dollarTradeKeys = useSettingsStore(
    useShallow((state) => {
      const keys: string[] = []
      for (const stockId of state.stockSettingsOrder) {
        const setting = state.stockSettings[stockId]
        if (setting.dollarTrade.buy) keys.push(`${stockId}:buy`)
        if (setting.dollarTrade.sell) keys.push(`${stockId}:sell`)
      }
      return keys
    })
  )

  if (dollarTradeKeys.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-2 pb-1">
      {dollarTradeKeys.map((key) => {
        const [stockId, action] = key.split(':')
        return <DollarTradeField key={key} stockId={Number(stockId)} action={action as 'buy' | 'sell'} />
      })}
    </div>
  )
}
