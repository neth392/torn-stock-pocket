import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { getAmountCalculator } from '@/amount-calculator'
import { useUserMoneyStore } from '@/ui/stores/useUserMoneyStore'
import { useStockAmountOwnedStore } from '@/ui/stores/useStockAmountOwnedStore'
import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useStockPrice } from '@/ui/hooks/useStockPrice'

export function useAmountCalculator(stockId: number, quickButtonId: string) {
  const { action, mode, valueType, value } = useSettingsStore(
    useShallow((state) => {
      const quickButton = state.stockSettings[stockId].quickButtons[quickButtonId]
      return {
        action: quickButton.action,
        mode: quickButton.mode,
        valueType: quickButton.valueType,
        value: quickButton.value,
      }
    })
  )
  const userMoney = useUserMoneyStore((state) => state.userMoney)
  const amountOwned = useStockAmountOwnedStore((state) => state.amountOwned[stockId] ?? 0)
  const stockPrice = useStockPrice(stockId, action)

  const amountCalculator = useMemo(() => getAmountCalculator(action, mode, valueType), [action, mode, valueType])

  return amountCalculator({
    amountOwned,
    stockPrice,
    userMoney,
    value: value ?? 0,
  })
}
