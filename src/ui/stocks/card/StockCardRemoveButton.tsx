import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

type Props = {
  stockId: number
}

export default function StockCardRemoveButton({ stockId }: Props) {
  const removeStockSetting = useSettingsStore((state) => state.removeStockSetting)
  return (
    <button
      className="p-.5 cursor-pointer rounded-md border border-red-400 bg-red-100 px-1 text-xs text-red-700
        transition-transform hover:scale-105 active:scale-95 dark:border-red-900/75 dark:bg-red-950/75
        dark:text-red-300"
      onClick={() => removeStockSetting(stockId)}
    >
      Remove
    </button>
  )
}
