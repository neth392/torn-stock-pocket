import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { DefaultQuickButton } from '@/types/Settings'

const handleClick = () =>
  useSettingsStore.setState((state) => {
    if (!state.selectedStockId) return
    state.editedQuickButton = {
      stockId: state.selectedStockId,
      id: crypto.randomUUID(),
      ...DefaultQuickButton,
    }
  })

export default function NewQuickButton() {
  return (
    <button
      onClick={handleClick}
      className="flex w-fit cursor-pointer items-center gap-1 rounded-md border border-neutral-400 bg-neutral-200 px-2
        py-0.5 text-sm font-medium whitespace-nowrap text-neutral-600 select-none dark:border-neutral-600
        dark:bg-neutral-800 dark:text-neutral-300"
    >
      + Button
    </button>
  )
}
