import React, { useState } from 'react'
import { SettingsStore, useSettingsStore } from '@/ui/stores/useSettingsStore'

type Props = {
  enabledSelector: (state: SettingsStore) => boolean
  setEnabledSelector: (state: SettingsStore) => (enabled: boolean) => void
  label: string
  colors: {
    bgColor: string
    textColor: string
    toggleColor: string
  }
}

export default function BlockTradeButton({ enabledSelector, setEnabledSelector, label, colors }: Props) {
  const enabled = useSettingsStore(enabledSelector)
  const setEnabled = useSettingsStore(setEnabledSelector)

  return (
    <label
      className={`w-fit min-w-0 ${colors.bgColor} my-2 flex cursor-pointer items-center gap-2 rounded-md border p-1 px-2
        select-none`}
    >
      <span className={`text-s ${colors.textColor} whitespace-nowrap`}>{label}</span>
      <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="sr-only" />
      <div
        className={`relative h-5 w-9 rounded-full transition-colors
          ${enabled ? colors.toggleColor : 'bg-neutral-400 dark:bg-neutral-700'}`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all
            ${enabled ? 'left-4.5' : 'left-0.5'}`}
        />
      </div>
    </label>
  )
}
