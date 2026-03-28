import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type StockPriceState = {
  stockPrices: Record<number, number>
  setPrice: (stockId: number, price: number) => void
}

export const useStockPriceStore = create<StockPriceState>()(
  immer((set) => ({
    stockPrices: {},
    setPrice: (stockId, price) =>
      set((state) => {
        state.stockPrices[stockId] = price
      }),
  }))
)
