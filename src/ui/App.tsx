import React from 'react'
import SettingsContainer from '@/ui/settings/SettingsContainer'
import QuickButtonPanel from '@/ui/stocks/quick-button/QuickButtonPanel'

export default function App() {
  return (
    <div className={'my-2 h-auto w-full'}>
      <SettingsContainer />
      <QuickButtonPanel />
    </div>
  )
}
