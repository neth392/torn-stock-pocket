import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { QuickButtonAction } from '@/types/Settings'

type StockPriceState = {
  rawStockPrices: Record<number, number>
  setRawPrice: (stockId: number, price: number) => void
}

export const useStockPriceStore = create<StockPriceState>()(
  immer((set, get) => ({
    rawStockPrices: {},
    setRawPrice: (stockId, price) =>
      set((state) => {
        state.rawStockPrices[stockId] = price
      }),
  }))
)
