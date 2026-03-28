import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type { QuickButtonAction } from '@/types/Settings'

type Props = {
  targetAction: QuickButtonAction
  className: string
}

export default function QuickButtonActionSelect({ targetAction, className }: Props) {
  const action = useSettingsStore((state) => state.editedQuickButton?.action)
  const setAction = useSettingsStore((state) => state.setEditedQuickButtonAction)

  return (
    <button
      onClick={() => setAction(targetAction)}
      className={`flex-1 cursor-pointer rounded-md border p-2 text-sm capitalize ${
        action === targetAction
          ? `${className} font-bold`
          : `border-neutral-300 bg-neutral-200 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800
            dark:text-neutral-500`
        }`}
    >
      {targetAction}
    </button>
  )
}
