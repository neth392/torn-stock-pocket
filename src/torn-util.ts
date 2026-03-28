import { StockData } from '@/types/StockData'
import { STOCK_LIST_SELECTOR, STOCK_NAME_SELECTOR } from '@/constants'
import { getAcronym } from '@/acronyms'

export function getAllStockData(): StockData[] {
  const stockElements = document.querySelectorAll(STOCK_LIST_SELECTOR)
  if (stockElements.length === 0) throw new Error('could not find any stocks in the DOM')
  const stocks: StockData[] = []
  for (const stockElement of stockElements) {
    const id = Number(stockElement.id)

    const stockNameElement = stockElement.querySelector(STOCK_NAME_SELECTOR)
    if (!stockNameElement) throw new Error(`could not find stock name element for stock with id ${stockElement.id}`)

    const name = stockNameElement.ariaLabel?.replace('Stock: ', '')
    if (!name) throw new Error(`could not extract stock name for stock with id ${stockElement.id}`)

    const acronym = getAcronym(id)

    const stockData: StockData = { id, name, acronym }
    stocks.push(stockData)
  }

  stocks.sort((a, b) => a.name.localeCompare(b.name))

  return stocks
}
