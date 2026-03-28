import React, { useState, useEffect } from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { useAutoLabel } from '@/ui/hooks/useAutoLabel'

export default function QuickButtonLabelEditor() {
  const label = useSettingsStore((state) => state.editedQuickButton!.label)
  const setLabel = useSettingsStore((state) => state.setEditedQuickButtonLabel)
  const defaultLabel = useAutoLabel()

  const [localLabel, setLocalLabel] = useState(label)

  // Sync from store → local when the store value changes externally
  useEffect(() => {
    setLocalLabel(label)
  }, [label])

  const flush = () => {
    if (localLabel !== label) {
      setLabel(localLabel)
    }
  }

  return (
    <input
      type="text"
      value={localLabel}
      onChange={(e) => setLocalLabel(e.target.value)}
      onBlur={flush}
      onKeyDown={(e) => {
        if (e.key === 'Enter') flush()
      }}
      placeholder={defaultLabel}
      className="w-full rounded-md border border-neutral-300 bg-neutral-200 p-1.5 text-sm text-neutral-700 outline-none
        dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    />
  )
}
