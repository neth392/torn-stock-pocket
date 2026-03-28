import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import QuickButtonButton from '@/ui/stocks/quick-button/QuickButtonButton'
import { useShallow } from 'zustand/react/shallow'

export default function QuickButtonPanel() {
  const quickButtonKeys = useSettingsStore(
    useShallow((state) => {
      const keys: string[] = []
      for (const stockId of state.stockSettingsOrder) {
        for (const quickButtonId of state.stockSettings[stockId].quickButtonOrder) {
          keys.push(`${stockId}:${quickButtonId}`)
        }
      }
      return keys
    })
  )

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {quickButtonKeys.map((key) => {
        const [stockId, quickButtonId] = key.split(':')
        return <QuickButtonButton key={key} quickButtonId={quickButtonId} stockId={Number(stockId)} />
      })}
    </div>
  )
}
