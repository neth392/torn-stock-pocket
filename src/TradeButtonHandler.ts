import type { AttributeObserverEvent, IteratorObserverEvent } from '@cneth97/neth-tornlib'
import { AttributeObserver, IteratorObserver, ObserverDisconnect } from '@cneth97/neth-tornlib'
import { BUY_BUTTON_SELECTOR, SELL_BUTTON_SELECTOR, STOCK_DROPDOWN_ID } from '@/constants'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import type { Settings } from '@/types/Settings'

export default class TradeButtonHandler {
  private iteratorObserver: IteratorObserver
  private attributeObserver: AttributeObserver

  constructor() {
    this.iteratorObserver = new IteratorObserver(
      {
        predicate: (element) => element.id === STOCK_DROPDOWN_ID,
      },
      this.onObserverEvent.bind(this)
    )
    this.attributeObserver = new AttributeObserver(
      {
        attributeName: 'id',
        targetValue: STOCK_DROPDOWN_ID,
      },
      this.onObserverEvent.bind(this)
    )
  }

  getCurrentStockId(): number | null {
    const stockMarketElement = document.getElementById(STOCK_DROPDOWN_ID)
    if (!stockMarketElement) return null
    const id = stockMarketElement.previousElementSibling?.id
    return id ? Number(stockMarketElement.previousElementSibling.id) : null
  }

  updateTradeButtons(settings: Settings) {
    const currentStockId = this.getCurrentStockId()
    if (!currentStockId) return

    const blockBuy = this.isStockBuyBlocked(currentStockId, settings)
    this.setBuyButtonDisabled(blockBuy)

    const blockSell = this.isStockSellBlocked(currentStockId, settings)
    this.setSellButtonDisabled(blockSell)
  }

  start(stockMarketElement: Element) {
    this.iteratorObserver.observe(stockMarketElement)
    this.attributeObserver.observe(stockMarketElement, {
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['id'],
    })

    // TODO: Possibly convert to subscribe with selector
    useSettingsStore.subscribe((settings) => this.updateTradeButtons(settings))
  }

  private setBuyButtonDisabled(disabled: boolean) {
    this.setButton(BUY_BUTTON_SELECTOR, disabled)
  }

  private setSellButtonDisabled(disabled: boolean) {
    this.setButton(SELL_BUTTON_SELECTOR, disabled)
  }

  private setButton(querySelector: string, disabled: boolean) {
    const button = document.querySelector(querySelector)
    if (button && button instanceof HTMLButtonElement) {
      button.disabled = disabled
    }
  }

  private onObserverEvent(event: IteratorObserverEvent | AttributeObserverEvent, disconnect: ObserverDisconnect) {
    if (event.added) {
      const settings = useSettingsStore.getState()
      this.updateTradeButtons(settings)
    }
  }

  private isStockBuyBlocked(stockId: number, settings: Settings): boolean {
    if (!settings.blockTrade.buy) return false
    const stockSetting = settings.stockSettings[stockId]
    return stockSetting ? !stockSetting.allowTrade.buy : true
  }

  private isStockSellBlocked(stockId: number, settings: Settings): boolean {
    if (!settings.blockTrade.sell) return false
    const stockSetting = settings.stockSettings[stockId]
    return stockSetting ? !stockSetting.allowTrade.sell : true
  }
}
