import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type { QuickButtonValue, QuickButtonValueType } from '@/types/Settings'

const getErrorMessage = (valueType: QuickButtonValueType, value: QuickButtonValue): string | null => {
  if (valueType === 'number' && (isNaN(value as number) || !value || value < 0))
    return 'Value must be a positive number'
  return null
}

export function useQuickButtonError() {
  const valueType = useSettingsStore((state) => state.editedQuickButton!.valueType)
  const value = useSettingsStore((state) => state.editedQuickButton!.value)
  return getErrorMessage(valueType, value)
}
