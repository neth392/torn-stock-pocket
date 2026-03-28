import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type { QuickButton, QuickButtonModeRecord } from '@/types/Settings'
import { useShallow } from 'zustand/react/shallow'

type AutoLabelQuickButton = Pick<QuickButton, 'action' | 'mode' | 'valueType' | 'value' | 'abbreviateValue'>

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const autoLabels: QuickButtonModeRecord<(amount: number | 'all', abbreviate: boolean) => string> = {
  buy: {
    amount: (amount, abbreviate) => `Buy ${formatAmount(amount, abbreviate)}`,
    keepCash: (amount, abbreviate) => (amount === 'all' ? 'Buy None' : `Buy, Keep ${formatAmount(amount, abbreviate)}`),
    percentage: (amount) => (amount === 'all' ? 'Buy All' : `Buy ${amount}%`),
  },
  sell: {
    amount: (amount, abbreviate) => `Sell ${formatAmount(amount, abbreviate)}`,
    toCash: (amount, abbreviate) => (amount === 'all' ? 'Sell None' : `Sell to ${formatAmount(amount, abbreviate)}`),
  },
}

function formatAmount(amount: number | 'all', abbreviate: boolean) {
  return amount === 'all' ? 'All' : abbreviate ? abbreviateMoney(amount) : currencyFormat.format(amount)
}

function abbreviateMoney(amount: number): string {
  const abs = Math.abs(amount)
  const sign = amount < 0 ? '-' : ''

  if (abs >= 1_000_000_000) return `$${sign}${+(abs / 1_000_000_000).toFixed(1)}b`
  if (abs >= 1_000_000) return `$${sign}${+(abs / 1_000_000).toFixed(1)}m`
  if (abs >= 1_000) return `$${sign}${+(abs / 1_000).toFixed(1)}k`
  return `${sign}${abs}`
}

export function generateAutoLabel(quickButton: AutoLabelQuickButton) {
  return (autoLabels[quickButton.action] as Record<string, (amount: number | 'all', abbreviate: boolean) => string>)[
    quickButton.mode
  ](quickButton.valueType === 'all' ? 'all' : quickButton.value!, quickButton.abbreviateValue)
}

export function useAutoLabel() {
  const { action, mode, valueType, value, abbreviateValue } = useSettingsStore(
    useShallow((state) => ({
      action: state.editedQuickButton!.action,
      mode: state.editedQuickButton!.mode,
      valueType: state.editedQuickButton!.valueType,
      value: state.editedQuickButton!.value,
      abbreviateValue: state.editedQuickButton!.abbreviateValue,
    }))
  )

  return generateAutoLabel({ action, mode, valueType, value, abbreviateValue })
}
