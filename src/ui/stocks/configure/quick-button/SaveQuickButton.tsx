import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { useQuickButtonError } from '@/ui/hooks/useQuickButtonError'

export default function SaveQuickButton() {
  const save = useSettingsStore((state) => state.saveEditedQuickButton)
  const error = useQuickButtonError()

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        disabled={!!error}
        onClick={save}
        className={`rounded-md border px-8 py-1.5 text-sm font-medium transition-transform ${
          error
            ? `cursor-not-allowed border-neutral-300 bg-neutral-200 text-neutral-400 dark:border-neutral-700
              dark:bg-neutral-800 dark:text-neutral-600`
            : `cursor-pointer border-green-400 bg-green-100 text-green-700 hover:scale-105 active:scale-95
              dark:border-green-900/40 dark:bg-green-950/50 dark:text-green-400`
          }`}
      >
        Save
      </button>
    </div>
  )
}
