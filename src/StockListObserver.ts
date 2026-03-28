type StockField = { stockId: number; type: 'price' | 'amount'; element: Element }

export default class StockListObserver {
  private observer?: MutationObserver
  private frameId: number | null = null
  private readonly tabMap = new WeakMap<Node, StockField>()
  private readonly dirty = new Map<Element, StockField>()
  private readonly lastPrice = new Map<number, number>()
  private readonly lastAmount = new Map<number, number>()

  constructor(
    private onPriceChange: (stockId: number, price: number) => void,
    private onAmountChange: (stockId: number, amount: number) => void
  ) {}

  observe(containerElement: Element) {
    if (this.observer) throw new Error('already observing')

    this.buildCache(containerElement)

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        let node: Node | null = mutation.target
        while (node && node !== containerElement) {
          const field = this.tabMap.get(node)
          if (field) {
            this.dirty.set(field.element, field)
            break
          }
          node = node.parentNode
        }
      }

      if (this.dirty.size > 0 && this.frameId === null) {
        this.frameId = requestAnimationFrame(() => {
          this.frameId = null
          for (const field of this.dirty.values()) {
            this.emitIfChanged(field)
          }
          this.dirty.clear()
        })
      }
    })

    this.observer.observe(containerElement, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label'],
    })
  }

  private buildCache(containerElement: Element) {
    for (const ul of containerElement.querySelectorAll('ul')) {
      if (!ul.id) continue
      const stockId = Number(ul.id)

      const priceTab = ul.querySelector('#priceTab')
      if (priceTab) {
        const field: StockField = { stockId, type: 'price', element: priceTab }
        this.cacheDescendants(priceTab, field)
        this.emitIfChanged(field)
      }

      const ownedTab = ul.querySelector('#ownedTab')
      if (ownedTab) {
        const field: StockField = { stockId, type: 'amount', element: ownedTab }
        this.cacheDescendants(ownedTab, field)
        this.emitIfChanged(field)
      }
    }
  }

  private cacheDescendants(root: Node, field: StockField) {
    this.tabMap.set(root, field)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL)
    while (walker.nextNode()) {
      this.tabMap.set(walker.currentNode, field)
    }
  }

  private emitIfChanged(field: StockField) {
    if (field.type === 'price') {
      const price = this.extractPrice(field.element)
      if (price != null && price !== this.lastPrice.get(field.stockId)) {
        this.lastPrice.set(field.stockId, price)
        this.onPriceChange(field.stockId, price)
      }
    } else {
      const amount = this.extractAmount(field.element)
      if (amount != null && amount !== this.lastAmount.get(field.stockId)) {
        this.lastAmount.set(field.stockId, amount)
        this.onAmountChange(field.stockId, amount)
      }
    }
  }

  private extractPrice(element: Element): number | null {
    const match = element.getAttribute('aria-label')?.match(/\$(\d+\.?\d*)/)
    if (match) return parseFloat(match[1])

    const spans = element.querySelectorAll("span[class^='number_']")
    if (spans.length === 0) return null
    const text = Array.from(spans)
      .map((s) => s.textContent)
      .join('')
    return parseFloat(text)
  }

  private extractAmount(element: Element): number | null {
    const match = element.getAttribute('aria-label')?.match(/(\d+)\s*shares/)
    if (match) return Number(match[1])

    const countElement = element.querySelector("p[class^='count_']")
    const text = countElement?.textContent?.replace(/[^0-9]/g, '')
    return text ? Number(text) : null
  }

  disconnect() {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId)
    this.observer?.disconnect()
    this.observer = undefined
    this.dirty.clear()
  }
}
