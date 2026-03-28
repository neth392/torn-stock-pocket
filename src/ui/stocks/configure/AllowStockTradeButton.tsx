import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type { StockSetting } from '@/types/Settings'

type Props = {
  stockId: number
  label: string
  settingKey: keyof StockSetting['allowTrade']
}

export default function AllowStockTradeButton({ stockId, label, settingKey }: Props) {
  const allowed = useSettingsStore((state) => state.stockSettings[stockId]?.allowTrade[settingKey] ?? false)
  const setAllowTrade = useSettingsStore((state) => state.setAllowStockTrade)

  const handleChange = (checked: boolean) => {
    setAllowTrade(stockId, settingKey, checked)
  }

  return (
    <label
      className={`flex w-fit cursor-pointer items-center gap-2 rounded-md border border-green-400 bg-green-100 p-0.5
        px-2 select-none dark:border-green-900/40 dark:bg-green-950/50`}
    >
      <span className={'text-s font-medium whitespace-nowrap text-green-700 dark:text-green-400'}>{label}</span>
      <input type="checkbox" checked={allowed} onChange={(e) => handleChange(e.target.checked)} className="sr-only" />
      <div
        className={`relative h-5 w-9 rounded-full
          ${allowed ? 'bg-green-700 dark:bg-green-500' : 'bg-neutral-400 dark:bg-neutral-700'} transition-colors`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all
            ${allowed ? 'left-4.5' : 'left-0.5'}`}
        />
      </div>
    </label>
  )
}
