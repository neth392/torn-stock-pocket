import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

type Props = {
  stockId: number
}

export default function StockCardEditButton({ stockId }: Props) {
  const setSelectedStockId = useSettingsStore((state) => state.setSelectedStockId)
  return (
    <button
      className="p-.5 cursor-pointer rounded-md border border-neutral-400 bg-neutral-100 px-1.5 text-xs text-neutral-700
        transition-transform hover:scale-105 active:scale-95 dark:border-neutral-500 dark:bg-neutral-700
        dark:text-neutral-400"
      onClick={() => setSelectedStockId(stockId)}
    >
      Edit
    </button>
  )
}
