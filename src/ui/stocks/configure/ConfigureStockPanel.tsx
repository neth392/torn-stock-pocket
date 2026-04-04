import React from 'react'
import StockListSelect from '@/ui/stocks/configure/StockListSelect'
import QuickButtonEditor from '@/ui/stocks/configure/quick-button/QuickButtonEditor'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import NewQuickButton from '@/ui/stocks/configure/NewQuickButton'
import NestedStockToggle from '@/ui/stocks/configure/NestedStockToggle'

export default function ConfigureStockPanel() {
  const selectedStockId = useSettingsStore((state) => state.selectedStockId)
  const setSelectedStockId = useSettingsStore((state) => state.setSelectedStockId)

  return (
    <div className="rounded-lg border border-dashed border-neutral-300 p-3 dark:border-neutral-700">
      <div className="mb-3 text-xs font-bold tracking-wider text-neutral-500 uppercase">Configure Stock</div>

      <div className="mb-2 flex flex-wrap gap-2">
        <StockListSelect className={'flex-3'} onSelect={setSelectedStockId} selectedStockId={selectedStockId} />
        {selectedStockId && (
          <div className="fit flex min-h-8 min-w-fit flex-1 flex-wrap items-stretch justify-center gap-2">
            <NestedStockToggle
              stockId={selectedStockId}
              label={'Allow buy'}
              rootKey={'allowTrade'}
              settingKey={'buy'}
              tooltip={'Allows buying this stock, overriding "Block all buy" if enabled'}
            />
            <NestedStockToggle
              stockId={selectedStockId}
              label={'Allow sell'}
              rootKey={'allowTrade'}
              settingKey={'sell'}
              tooltip={'Allows selling this stock, overriding "Block all sell" if enabled'}
            />
            <NestedStockToggle
              stockId={selectedStockId}
              label={'$ Buy'}
              rootKey={'dollarTrade'}
              settingKey={'buy'}
              tooltip={'Displays a field to buy shares of this stock by a dollar amount.'}
            />
            <NestedStockToggle
              stockId={selectedStockId}
              label={'$ Sell'}
              rootKey={'dollarTrade'}
              settingKey={'sell'}
              tooltip={'Displays a field to sell shares of this stock by a dollar amount.'}
            />
            <NewQuickButton />
          </div>
        )}
      </div>
      <QuickButtonEditor />
    </div>
  )
}
