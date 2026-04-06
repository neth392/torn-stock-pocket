import React, { useMemo, useState } from 'react'
import { useStockDataStore } from '@/ui/stores/useStockDataStore'
import { useUserMoneyStore } from '@/ui/stores/useUserMoneyStore'
import { useStockPriceStore } from '@/ui/stores/useStockPriceStore'
import { useStockAmountOwnedStore } from '@/ui/stores/useStockAmountOwnedStore'
import { executeAction } from '@/stock-trader'
import type { QuickButtonAction } from '@/types/Settings'
import Tooltip from '@/ui/components/Tooltip'
import { getAmountCalculator } from '@/amount-calculator'

type Props = {
  stockId: number
  action: QuickButtonAction
}

export default function DollarTradeField({ stockId, action }: Props) {
  const acronym = useStockDataStore((state) => state.stockRecord[stockId]?.acronym)
  const userMoney = useUserMoneyStore((state) => state.userMoney)
  const rawStockPrice = useStockPriceStore((state) => state.rawStockPrices[stockId])
  const amountOwned = useStockAmountOwnedStore((state) => state.amountOwned[stockId] ?? 0)

  const amountCalculator = useMemo(() => getAmountCalculator(action, 'amount', 'number'), [action])

  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const dollarAmount = Number(inputValue)
  const isBuy = action === 'buy'

  const sharesOrError = useMemo(
    () =>
      amountCalculator({
        amountOwned,
        stockPrice: rawStockPrice,
        userMoney,
        value: dollarAmount,
      }),
    [amountCalculator, amountOwned, rawStockPrice, userMoney, dollarAmount]
  )

  const error = inputValue !== '' && typeof sharesOrError === 'string' ? sharesOrError : null
  const shares = typeof sharesOrError === 'number' ? sharesOrError : 0
  const toolTipError = error ?? (dollarAmount === 0 ? 'Enter a valid amount' : null)

  const canTrade = shares > 0 && !loading
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^0-9.]/g, '')
    setInputValue(cleaned)
  }

  const handleTrade = async () => {
    if (!canTrade) return
    setLoading(true)
    try {
      await executeAction(action, stockId, shares)
      setInputValue('')
    } catch (err) {
      console.error(`${action} failed:`, err)
    } finally {
      setLoading(false)
    }
  }

  const styles = isBuy
    ? {
        border: 'border-blue-400 dark:border-blue-800',
        bg: 'bg-blue-50 dark:bg-blue-950/50',
        button: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
        badge: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      }
    : {
        border: 'border-red-400 dark:border-red-800',
        bg: 'bg-red-50 dark:bg-red-950/50',
        button: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
        badge: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300',
      }

  return (
    <div className={`w-fit rounded-md border ${styles.border} ${styles.bg} select-none`}>
      <div className="flex items-center gap-2 p-1">
        <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-bold uppercase ${styles.badge}`}>{acronym}</span>
        <div className="relative shrink-0">
          <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-sm text-neutral-400">
            $
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder="0"
            className="w-24 rounded border border-neutral-300 bg-neutral-200 py-1 pr-2 pl-6 text-sm text-neutral-700
              outline-none select-text dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          />
        </div>
        <Tooltip text={String(toolTipError)} enabled={!!toolTipError} showDelay={100}>
          {' '}
          <button
            disabled={!canTrade}
            onClick={handleTrade}
            className={`shrink-0 rounded px-3 py-1 text-sm font-bold text-white transition-colors ${
              canTrade
                ? `cursor-pointer ${styles.button}`
                : 'cursor-not-allowed bg-neutral-500/30 text-neutral-500 dark:bg-neutral-700/50 dark:text-neutral-600'
              }`}
          >
            {loading ? '...' : isBuy ? 'Buy' : 'Sell'}
          </button>
        </Tooltip>
      </div>
      {error && (
        <div className="border-t border-neutral-300 px-2 py-1 text-xs text-red-500 dark:border-neutral-700">
          {error}
        </div>
      )}
    </div>
  )
}
