import React, { useState } from 'react'
import SettingsTitleBar from '@/ui/settings/SettingsTitleBar'
import SettingsDropDown from '@/ui/settings/SettingsDropDown'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'

export default function SettingsContainer() {
  const uiExpanded = useSettingsStore((state) => state.uiExpanded)
  const setUiExpanded = useSettingsStore((state) => state.setUiExpanded)
  return (
    <div className="rounded-md border border-neutral-300 shadow-md dark:border-neutral-800">
      <SettingsTitleBar handleClick={() => setUiExpanded(!uiExpanded)} expanded={uiExpanded} />
      {uiExpanded && <SettingsDropDown />}
    </div>
  )
}
