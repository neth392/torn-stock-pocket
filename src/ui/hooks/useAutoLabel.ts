import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type {
  QuickButton,
  QuickButtonAction,
  QuickButtonMode,
  QuickButtonModeRecord,
  QuickButtonValueType,
} from '@/types/Settings'

const autoLabels: QuickButtonModeRecord<(amount: number | 'all') => string> = {
  buy: {
    amount: (amount) => `Buy ${formatAmount(amount)}`,
    keepCash: (amount) => (amount === 'all' ? 'Buy None' : `Buy, Keep ${currencyFormat.format(amount)}`),
    percentage: (amount) => (amount === 'all' ? 'Buy All' : `Buy ${amount}%`),
  },
  sell: {
    amount: (amount) => `Sell ${formatAmount(amount)}`,
    toCash: (amount) => (amount === 'all' ? 'Sell None' : `Sell to ${currencyFormat.format(amount)}`),
  },
}

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function formatAmount(amount: number | 'all') {
  return amount === 'all' ? 'All' : currencyFormat.format(amount)
}

type AutoLabelQuickButton = Pick<QuickButton, 'action' | 'mode' | 'valueType' | 'value'>

export function generateAutoLabel(quickButton: AutoLabelQuickButton) {
  return (autoLabels[quickButton.action] as Record<string, (amount: number | 'all') => string>)[quickButton.mode](
    quickButton.valueType === 'all' ? 'all' : quickButton.value!
  )
}

export function useAutoLabel() {
  const action = useSettingsStore((state) => state.editedQuickButton!.action)
  const mode = useSettingsStore((state) => state.editedQuickButton!.mode)
  const valueType = useSettingsStore((state) => state.editedQuickButton!.valueType)
  const value = useSettingsStore((state) => state.editedQuickButton!.value)
  return generateAutoLabel({ action, mode, valueType, value })
}
