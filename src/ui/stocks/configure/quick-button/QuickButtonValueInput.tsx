import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

export default function QuickButtonValueInput() {
  const isPercentage = useSettingsStore((state) => state.editedQuickButton!.mode === 'percentage')
  const value = useSettingsStore((state) => state.editedQuickButton!.value)
  const valueType = useSettingsStore((state) => state.editedQuickButton!.valueType)
  const setValue = useSettingsStore((state) => state.setEditedQuickButtonValue)

  const isAll = valueType === 'all'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^0-9.]/g, '')
    if (cleaned === '') return setValue('number', 0)
    const num = Number(cleaned)
    if (!isNaN(num)) setValue('number', num)
  }

  return (
    <div className="flex w-full items-center gap-2">
      <button
        onClick={() => setValue('all', null)}
        className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm ${
          isAll
            ? `border-neutral-500 bg-neutral-300 font-bold text-neutral-800 dark:border-neutral-400 dark:bg-neutral-700
              dark:text-neutral-200`
            : `border-neutral-300 bg-neutral-200 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800
              dark:text-neutral-500`
          }`}
      >
        All
      </button>
      <input
        type="text"
        value={isAll ? '' : value === 0 ? '' : value!}
        onChange={handleInputChange}
        placeholder={isAll ? '$ Amount (Currently All)' : '$ Amount'}
        className="w-full rounded-md border border-neutral-300 bg-neutral-200 p-1.5 text-sm text-neutral-700
          outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
      />
      {isPercentage && !isAll && <span className="pointer-events-none text-sm text-neutral-400">%</span>}
    </div>
  )
}
