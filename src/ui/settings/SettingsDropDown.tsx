import React from 'react'
import BlockTradeButton from '@/ui/settings/BlockTradeButton'
import { useTemporalStore } from '@/ui/stores/useSettingsStore'
import ConfigureStockPanel from '@/ui/stocks/configure/ConfigureStockPanel'
import StockCardList from '@/ui/stocks/card/StockCardList'
import UndoIcon from '@/ui/icons/UndoIcon'
import RedoIcon from '@/ui/icons/RedoIcon'
import TemporalButton from '@/ui/settings/TemporalButton'

const BLOCK_BUY_COLORS = {
  bgColor: 'bg-blue-100 border-blue-400 dark:bg-blue-950/75 dark:border-blue-800',
  textColor: 'text-blue-700 dark:text-blue-400',
  toggleColor: 'bg-blue-600',
}

const BLOCK_SELL_COLORS = {
  bgColor: 'bg-red-100 border-red-400 dark:bg-red-950/75 dark:border-red-900/75',
  textColor: 'text-red-700 dark:text-red-300',
  toggleColor: 'bg-red-600',
}

export default function SettingsDropDown() {
  return (
    <div className={'rounded-b-sm bg-neutral-100 p-2 dark:bg-neutral-900'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex justify-center gap-x-2'}>
          <BlockTradeButton
            enabledSelector={(state) => state.blockTrade.buy}
            setEnabledSelector={(state) => state.setBlockBuy}
            label={'Block all buy'}
            colors={BLOCK_BUY_COLORS}
            tooltip={'Blocks buying for all stocks. Enable "Allow buy" on a stock to override.'}
          />
          <BlockTradeButton
            enabledSelector={(state) => state.blockTrade.sell}
            setEnabledSelector={(state) => state.setBlockSell}
            label={'Block all sell'}
            colors={BLOCK_SELL_COLORS}
            tooltip={'Blocks selling for all stocks. Enable "Allow sell" on a stock to override.'}
          />
        </div>
        <div className={'flex items-center gap-x-2'}>
          <TemporalButton
            title={'Undo'}
            action={(state) => state.undo()}
            canApply={(state) => state.pastStates.length > 0}
          >
            <UndoIcon size={18} />
          </TemporalButton>
          <TemporalButton
            title={'Redo'}
            action={(state) => state.redo()}
            canApply={(state) => state.futureStates.length > 0}
          >
            <RedoIcon size={18} />
          </TemporalButton>
        </div>
      </div>
      <StockCardList />
      <ConfigureStockPanel />
    </div>
  )
}
