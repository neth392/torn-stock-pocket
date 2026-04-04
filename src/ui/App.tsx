import React from 'react'
import SettingsContainer from '@/ui/settings/SettingsContainer'
import QuickButtonPanel from '@/ui/stocks/quick-button/QuickButtonPanel'
import DollarTradePanel from '@/ui/stocks/dollar-trade/DollarTradePanel'

export default function App() {
  return (
    <div className={'my-2 flex h-auto w-full flex-col gap-3'}>
      <SettingsContainer />
      <QuickButtonPanel />
      <DollarTradePanel />
    </div>
  )
}
