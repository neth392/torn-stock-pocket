import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

export default function DeleteQuickButton() {
  const stockId = useSettingsStore((state) => state.editedQuickButton!.stockId)
  const editedQuickButtonId = useSettingsStore((state) => state.editedQuickButton!.id)
  const deleteQuickButton = useSettingsStore((state) => state.deleteQuickButton)

  return (
    <button
      onClick={() => deleteQuickButton(stockId, editedQuickButtonId)}
      className="cursor-pointer rounded-md border border-red-400 bg-red-100 px-8 py-1.5 text-sm font-medium text-red-700
        transition-transform hover:scale-105 active:scale-95 dark:border-red-900/40 dark:bg-red-950/50
        dark:text-red-400"
    >
      Delete
    </button>
  )
}
