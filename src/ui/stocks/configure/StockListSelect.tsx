import React, { useCallback, useEffect } from 'react'
import { useStockDataStore } from '@/ui/stores/useStockDataStore'
import type { StockData } from '@/types/StockData'
import ChevronRight from '@/ui/icons/ChevronRight'

type Props = {
  onSelect: (stockId: number | null) => void
  selectedStockId: number | null
  className?: string
}

export default function StockListSelect({ className = '', onSelect, selectedStockId }: Props) {
  const stockList = useStockDataStore((state) => state.stockData)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (!value || value === '') {
      onSelect(null)
      return
    }
    const stockId = Number(value)
    onSelect(stockId)
  }

  return (
    <div className={`${className} relative min-w-48 flex-1`}>
      <select
        onChange={handleChange}
        value={selectedStockId ?? ''}
        className="w-full cursor-pointer appearance-none rounded-md border border-neutral-300 bg-neutral-200 p-1.5 pr-8
          text-sm text-neutral-600 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
      >
        <option value="">Select stock...</option>
        {stockList.map((stock) => (
          <option key={stock.id} value={stock.id}>
            ({stock.acronym}) {stock.name}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
