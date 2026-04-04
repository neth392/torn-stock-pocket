import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { QuickButtonAction } from '@/types/Settings'

type StockPriceState = {
  buyPrices: Record<number, number>
  sellPrices: Record<number, number>
  setPrice: (stockId: number, price: number) => void
}

export const useStockPriceStore = create<StockPriceState>()(
  immer((set, get) => ({
    buyPrices: {},
    sellPrices: {},
    setPrice: (stockId, price) =>
      set((state) => {
        state.buyPrices[stockId] = Math.ceil(price)
        state.sellPrices[stockId] = Math.floor(price)
      }),
  }))
)
