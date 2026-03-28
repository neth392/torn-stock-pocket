// TODO move this to neth-tornlib
import { QueryObserver } from '@cneth97/neth-tornlib'

const USER_MONEY_SELECTOR = '#user-money' as const

function extractDataMoney(element: HTMLElement): number {
  const money = element.dataset.money
  if (!money) throw new Error(`could not find data-money attribute in element ${element}`)
  return Number(money)
}

export default class UserMoneyObserver {
  private observer?: MutationObserver
  private balance: number = 0

  constructor(private handler: (prevBal: number, newBal: number) => void) {}

  getBalance() {
    return this.balance
  }

  async observe() {
    if (this.observer) throw new Error('already observing')

    const result = await new QueryObserver(USER_MONEY_SELECTOR, () => {}).observeOnce(document, {
      childList: true,
      subtree: true,
    })

    const userMoneyElement = result.added
    if (!userMoneyElement) throw new Error('user-money element not found')
    if (!(userMoneyElement instanceof HTMLElement))
      throw new Error(`user-money element is not an HTMLElement: ${userMoneyElement}`)

    const newBalance = extractDataMoney(userMoneyElement)
    this.setCurrentCash(newBalance)

    this.observer = new MutationObserver(this.onUserMoneyMutation.bind(this))
    this.observer.observe(userMoneyElement, {
      characterData: true,
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-money'],
    })
  }

  disconnect() {
    this.observer?.disconnect()
    this.observer = undefined
  }

  private onUserMoneyMutation(mutations: MutationRecord[]) {
    const target = mutations[0]?.target
    if (!target) return
    const element = target.nodeType === Node.TEXT_NODE ? target.parentElement : target
    if (element instanceof HTMLElement) {
      const newBalance = extractDataMoney(element)
      this.setCurrentCash(newBalance)
    }
  }

  private setCurrentCash(newBalance: number) {
    const oldBalance = this.balance
    this.balance = newBalance
    this.handler(oldBalance, newBalance)
  }
}
