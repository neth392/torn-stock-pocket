import { create } from 'zustand'
import type { StockData } from '@/types/StockData'
import { getAllStockData } from '@/torn-util'

type StockListStore = {
  stockRecord: Record<number, StockData>
  stockData: StockData[]
  update: () => void
}

export const useStockDataStore = create<StockListStore>((set) => ({
  stockRecord: {},
  stockData: [],
  update: () => {
    const stockData = getAllStockData()
    const stockRecord: Record<number, StockData> = {}
    for (const stock of stockData) {
      stockRecord[stock.id] = stock
    }
    set({ stockData: stockData, stockRecord })
  },
}))
