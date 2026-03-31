import React, { useMemo, useState } from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { useStockDataStore } from '@/ui/stores/useStockDataStore'
import { DefaultQuickButtonColor } from '@/types/Settings'
import { quickButtonColorStyles } from '@/ui/colors'
import { useAmountCalculator } from '@/ui/hooks/useAmountCalculator'
import Tooltip from '@/ui/components/Tooltip'
import { useShallow } from 'zustand/react/shallow'
import { STOCK_ICON_SVG_URL } from '@/constants'
import { executeAction } from '@/stock-trader'

type Props = {
  stockId: number
  quickButtonId: string
}

function getIconUrl(acronym: string) {
  return `${STOCK_ICON_SVG_URL}${acronym}.svg`
}

export default function QuickButtonButton({ stockId, quickButtonId }: Props) {
  const { label, autoLabel, action, color, showShares, showAcronym, showIcon } = useSettingsStore(
    useShallow((state) => {
      const quickButton = state.stockSettings[stockId].quickButtons[quickButtonId]
      return {
        label: quickButton.label,
        autoLabel: quickButton.autoLabel,
        action: quickButton.action,
        color: quickButton.color,
        showShares: quickButton.showShares,
        showAcronym: quickButton.showAcronym,
        showIcon: quickButton.showIcon,
      }
    })
  )

  const acronym = useStockDataStore((state) => state.stockRecord[stockId].acronym)

  const styles = useMemo(() => quickButtonColorStyles[color ?? DefaultQuickButtonColor[action]], [color, action])
  const displayLabel = label.length > 0 ? label : autoLabel

  const purchaseAmount = useAmountCalculator(stockId, quickButtonId)

  const [loading, setLoading] = useState(false)

  const isDisabled = typeof purchaseAmount !== 'number' || loading

  return (
    <Tooltip
      text={typeof purchaseAmount === 'string' ? purchaseAmount : ''}
      enabled={typeof purchaseAmount !== 'number'}
    >
      <button
        className={`flex w-fit items-center gap-2 rounded-md border px-1 py-1.5 text-sm font-medium transition-colors
          select-none ${
            typeof purchaseAmount === 'number'
              ? `cursor-pointer ${styles.button}`
              : `cursor-not-allowed border-neutral-300 bg-neutral-200 text-neutral-400 opacity-50
                dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500`
          }`}
        disabled={isDisabled}
        onClick={async () => {
          if (typeof purchaseAmount !== 'number') throw new Error(`can not purchase due to: ${purchaseAmount}`)
          setLoading(true)
          try {
            const response = await executeAction(action, stockId, purchaseAmount)
            // TODO error handling w/ response
          } catch (error) {
            console.error(`${action} failed:`, error) //TODO error handling
          } finally {
            setLoading(false)
          }
        }}
      >
        {showIcon && <img src={getIconUrl(acronym)} alt={acronym} className={'-my-2 -mr-2 -ml-1 h-8 w-8'} />}
        {showAcronym && (
          <span className={`rounded px-1.5 py-0.5 text-xs font-bold uppercase ${styles.badge}`}>{acronym}</span>
        )}
        <span>{displayLabel}</span>
        {showShares && typeof purchaseAmount === 'number' && (
          <span className="text-xs opacity-70">x{purchaseAmount.toLocaleString()}</span>
        )}
      </button>
    </Tooltip>
  )
}
