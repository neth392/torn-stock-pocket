import { type QuickButtonAction } from '@/types/Settings'
import { getTornReduxStore } from '@/torn-store'

type StockTradeResponse = {
  success: boolean
  message?: string
}

const TORN_URL = 'https://www.torn.com/page.php?sid=StockMarket'

let stockMarketElement: WeakRef<Element> | null = null

export function initStockTrader(_stockMarketElement: Element): void {
  stockMarketElement = new WeakRef(_stockMarketElement)
}

export async function executeAction(action: QuickButtonAction, stockId: number, amount: number): Promise<void> {
  const rfc = getRfcToken()
  const formData = constructFormData(stockId, amount)
  const step = action === 'buy' ? 'buyShares' : 'sellShares'

  const response = await fetch(`${TORN_URL}&step=${step}&rfcv=${rfc}`, {
    method: 'POST',
    body: formData,
  })

  const result: StockTradeResponse = await response.json()

  if (!result.success) {
    throw new Error(result.message ?? 'Trade failed')
  }

  const element = getStockMarketElement()
  const store = getTornReduxStore(element)
  if (store) {
    store.dispatch({ type: 'stockMarket/FETCH_STOCK_MARKET_DATA' })
  }
}

function getStockMarketElement(): Element {
  const element = stockMarketElement?.deref()
  if (element) return element

  const newElement = document.querySelector('#stockmarketroot')
  if (!newElement) throw new Error('Could not find stock market element')
  stockMarketElement = new WeakRef(newElement)
  return newElement
}

function constructFormData(stockId: number, amount: number): FormData {
  const formData = new FormData()
  formData.append('stockId', String(stockId))
  formData.append('amount', String(amount))
  return formData
}

function getRfcToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)rfc_v=([^;]+)/)
  return match?.[1] ?? ''
}
