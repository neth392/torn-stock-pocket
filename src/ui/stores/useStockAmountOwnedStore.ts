import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type StockAmountOwnedState = {
  amountOwned: Record<number, number>
  setAmountOwned: (stockId: number, amount: number) => void
}

export const useStockAmountOwnedStore = create<StockAmountOwnedState>()(
  immer((set) => ({
    amountOwned: {},
    setAmountOwned: (stockId, amount) =>
      set((state) => {
        state.amountOwned[stockId] = amount
      }),
  }))
)
