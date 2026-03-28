import React from 'react'
import { useStockDataStore } from '@/ui/stores/useStockDataStore'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import StockCardName from '@/ui/stocks/card/StockCardName'
import StockCardTagList from '@/ui/stocks/card/tag/StockCardTagList'
import StockCardRemoveButton from '@/ui/stocks/card/StockCardRemoveButton'
import StockCardEditButton from '@/ui/stocks/card/StockCardEditButton'

type Props = {
  stockId: number
}

function StockCardMoveButton({ direction, onClick }: { direction: 'up' | 'down'; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="flex flex-1 cursor-pointer items-center rounded px-0.5 text-neutral-400 transition-colors
        hover:bg-neutral-300 hover:text-neutral-600 active:scale-90 dark:text-neutral-500 dark:hover:bg-neutral-700
        dark:hover:text-neutral-200"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={direction === 'up' ? 'M2 8L6 4L10 8' : 'M2 4L6 8L10 4'}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function StockCard({ stockId }: Props) {
  const stock = useStockDataStore((state) => state.stockRecord[stockId])
  const moveStockSetting = useSettingsStore((state) => state.moveStockSetting)

  const isFirst = useSettingsStore((state) => (state.stockSettingsOrder ?? []).indexOf(stockId) === 0)
  const isLast = useSettingsStore((state) => {
    const order = state.stockSettingsOrder ?? []
    return order.indexOf(stockId) === order.length - 1
  })

  return (
    <div
      className={`box-border flex min-h-8 w-full min-w-0 flex-col gap-1 rounded-md border border-neutral-300
        bg-neutral-200 p-2 shadow-md dark:border-neutral-700 dark:bg-neutral-800`}
    >
      <div className={'flex w-full items-center justify-between'}>
        <StockCardName name={stock.name} acronym={stock.acronym} />
        <div className={'flex items-center justify-end gap-1'}>
          <StockCardEditButton stockId={stockId} />
          <StockCardRemoveButton stockId={stockId} />
          <div className="flex h-6 flex-col">
            {!isFirst && <StockCardMoveButton direction="up" onClick={() => moveStockSetting(stockId, 'up')} />}
            {!isLast && <StockCardMoveButton direction="down" onClick={() => moveStockSetting(stockId, 'down')} />}
          </div>
        </div>
      </div>
      <StockCardTagList stockId={stock.id} />
    </div>
  )
}
