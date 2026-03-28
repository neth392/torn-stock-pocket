import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { EditedQuickButton } from '@/types/Settings'
import { KeyOfType } from '@/types/GeneralTypes'
import Tooltip from '@/ui/components/Tooltip'

type Props = {
  fieldKey: KeyOfType<EditedQuickButton, boolean>
  label: string
  description: string
}

export default function QuickButtonToggle({ fieldKey, label, description }: Props) {
  const enabled = useSettingsStore((state) => state.editedQuickButton![fieldKey])
  const setEnabled = useSettingsStore((state) => state.setEditedQuickButtonToggle)
  const action = useSettingsStore((state) => state.editedQuickButton!.action)

  return (
    <Tooltip text={description}>
      <label
        className="flex cursor-pointer items-center gap-2 rounded-md border border-neutral-300 bg-neutral-200 px-2
          py-1.5 select-none dark:border-neutral-700 dark:bg-neutral-800"
      >
        <span className="text-sm whitespace-nowrap text-neutral-600 dark:text-neutral-400">{label}</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked, fieldKey)}
          className="sr-only"
        />
        <div
          className={`relative h-5 w-9 rounded-full transition-colors ${
            enabled
              ? action === 'buy'
                ? 'bg-green-700 dark:bg-green-500'
                : 'bg-red-500 dark:bg-red-600'
              : 'bg-neutral-400 dark:bg-neutral-600'
            }`}
        >
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all
              ${enabled ? 'left-4.5' : 'left-0.5'}`}
          />
        </div>
      </label>
    </Tooltip>
  )
}
