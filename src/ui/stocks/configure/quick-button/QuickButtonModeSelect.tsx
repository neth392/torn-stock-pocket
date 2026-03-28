import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import {
  type QuickButtonAction,
  type QuickButtonMode,
  type QuickButtonModeRecord,
  QuickButtonModes,
} from '@/types/Settings'
import Tooltip from '@/ui/components/Tooltip'

const modeLabels: QuickButtonModeRecord<string> = {
  buy: {
    amount: 'Amount',
    keepCash: 'Keep Cash',
    percentage: '% of Cash',
  },
  sell: {
    amount: 'Amount',
    toCash: 'To Cash on Hand',
  },
}

const modeToolTips: QuickButtonModeRecord<string> = {
  buy: {
    amount: 'Spend this amount of cash on shares.',
    keepCash: 'Buy shares, keeping this amount of cash in reserve.',
    percentage: 'Spend this % of your cash on shares.',
  },
  sell: {
    amount: 'Sell this amount worth of shares.',
    toCash: 'Sell shares until your cash reaches this amount.',
  },
}

type Props<A extends QuickButtonAction> = {
  action: A
  targetMode: (typeof QuickButtonModes)[A][number]
}

export default function QuickButtonModeSelect<A extends QuickButtonAction>({ action, targetMode }: Props<A>) {
  const mode = useSettingsStore((state) => state.editedQuickButton!.mode)
  const setMode = useSettingsStore((state) => state.setEditedQuickButtonMode)

  return (
    <Tooltip text={modeToolTips[action][targetMode]} className="flex-1">
      <button
        onClick={() => setMode(targetMode)}
        className={`flex-1 cursor-pointer rounded-md border p-2 text-sm ${
          mode === targetMode
            ? `border-neutral-500 bg-neutral-300 font-bold text-neutral-800 dark:border-neutral-400 dark:bg-neutral-700
              dark:text-neutral-200`
            : `border-neutral-300 bg-neutral-200 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800
              dark:text-neutral-500`
          }`}
      >
        {modeLabels[action][targetMode]}
      </button>
    </Tooltip>
  )
}
