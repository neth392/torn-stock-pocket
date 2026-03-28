import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { QuickButtonModes } from '@/types/Settings'
import QuickButtonModeSelect from '@/ui/stocks/configure/quick-button/QuickButtonModeSelect'

export default function QuickButtonModeRow() {
  const action = useSettingsStore((state) => state.editedQuickButton!.action)
  return (
    <>
      {QuickButtonModes[action].map((mode) => (
        <QuickButtonModeSelect key={mode} action={action} targetMode={mode} />
      ))}
    </>
  )
}
