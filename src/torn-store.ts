type TornReduxStore = {
  dispatch: (action: { type: string; payload?: unknown }) => void
  getState: () => unknown
}

let cachedStore: TornReduxStore | null = null

export function getTornReduxStore(stockMarketElement: Element): TornReduxStore | null {
  if (cachedStore) return cachedStore

  const fiber = getReactFiber(stockMarketElement)
  if (!fiber) return null

  cachedStore = findStore(fiber)
  return cachedStore
}

function getReactFiber(element: Element): any {
  // Try the element itself, then its first child
  for (const el of [element, element.firstElementChild]) {
    if (!el) continue
    const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'))
    if (key) return (el as any)[key]
  }
  return null
}

function findStore(fiber: any): TornReduxStore | null {
  let current = fiber
  while (current) {
    const store = current.memoizedProps?.store
    if (store && typeof store.dispatch === 'function' && typeof store.getState === 'function') {
      return store as TornReduxStore
    }
    current = current.return
  }
  return null
}

export function refreshTornStockMarket(stockMarketElement: Element): void {
  const store = getTornReduxStore(stockMarketElement)
  if (store) {
    store.dispatch({ type: 'stockMarket/FETCH_STOCK_MARKET_DATA' })
  }
}
