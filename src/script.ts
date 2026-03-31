import '@/styles.css'
import { QueryObserver } from '@cneth97/neth-tornlib'
import { STOCK_MARKET_SELECTOR } from '@/constants'
import { setupUI } from '@/ui/setup'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import TradeButtonHandler from '@/TradeButtonHandler'
import { useStockDataStore } from '@/ui/stores/useStockDataStore'
import UserMoneyObserver from '@/UserMoneyObserver'
import { useUserMoneyStore } from '@/ui/stores/useUserMoneyStore'
import StockListObserver from '@/StockListObserver'
import { useStockPriceStore } from '@/ui/stores/useStockPriceStore'
import { useStockAmountOwnedStore } from '@/ui/stores/useStockAmountOwnedStore'
import { initStockTrader } from '@/stock-trader'

async function main() {
  await useSettingsStore.getState().load()
  // Clear past temporal states to prevent undo of all settings
  useSettingsStore.temporal.getState().pastStates = []

  const stockMarketElement = await getStockMarketElement()

  initStockTrader(stockMarketElement)

  useStockDataStore.getState().update()

  const userMoneyObserver = new UserMoneyObserver((prevBal, newBal) => {
    useUserMoneyStore.setState({ userMoney: newBal })
  })
  await userMoneyObserver.observe()

  const stockListObserver = new StockListObserver(
    (stockId, price) => {
      useStockPriceStore.getState().setPrice(stockId, price)
    },
    (stockId, amount) => {
      useStockAmountOwnedStore.getState().setAmountOwned(stockId, amount)
    }
  )
  stockListObserver.observe(stockMarketElement)

  const tradeButtonHandler = new TradeButtonHandler()
  tradeButtonHandler.start(stockMarketElement)

  setupUI(stockMarketElement)
  console.log('test')
}

async function getStockMarketElement() {
  const stockMarketObserver = new QueryObserver(STOCK_MARKET_SELECTOR)
  const result = await stockMarketObserver.observeOnce(document.body, {
    subtree: true,
    childList: true,
  })
  if (!result.added) throw new Error('Could not find stock market element')
  return result.added
}

void main()
