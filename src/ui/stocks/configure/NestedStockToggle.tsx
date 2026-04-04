import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type { StockSetting } from '@/types/Settings'
import Tooltip from '@/ui/components/Tooltip'

type BooleanGroup = {
  [K in keyof StockSetting]: StockSetting[K] extends { buy: boolean; sell: boolean } ? K : never
}[keyof StockSetting]

type Props = {
  stockId: number
  label: string
  rootKey: BooleanGroup
  settingKey: 'buy' | 'sell'
  tooltip: string
}

export default function NestedStockToggle({ stockId, label, rootKey, settingKey, tooltip }: Props) {
  const enabled = useSettingsStore((state) => state.stockSettings[stockId]?.[rootKey][settingKey] ?? false)
  const setToggle = useSettingsStore((state) => state.setStockToggle)

  return (
    <Tooltip text={tooltip}>
      <label
        className={`flex w-fit cursor-pointer items-center gap-2 rounded-md border border-green-400 bg-green-100 p-0.5
          px-2 select-none dark:border-green-900/40 dark:bg-green-950/50`}
      >
        <span className={'text-s font-medium whitespace-nowrap text-green-700 dark:text-green-400'}>{label}</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setToggle(stockId, rootKey, settingKey, e.target.checked)}
          className="sr-only"
        />
        <div
          className={`relative h-5 w-9 rounded-full transition-colors
            ${enabled ? 'bg-green-700 dark:bg-green-500' : 'bg-neutral-400 dark:bg-neutral-700'}`}
        >
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all
              ${enabled ? 'left-4.5' : 'left-0.5'}`}
          />
        </div>
      </label>
    </Tooltip>
  )
}
