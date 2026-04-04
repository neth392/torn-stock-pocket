import { QuickButtonAction } from '@/types/Settings'
import { useStockPriceStore } from '@/ui/stores/useStockPriceStore'

export function useStockPrice(stockId: number, action: QuickButtonAction) {
  return useStockPriceStore((state) => (action === 'buy' ? state.buyPrices[stockId] : state.sellPrices[stockId]))
}
