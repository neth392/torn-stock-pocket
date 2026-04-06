import { QuickButtonAction, QuickButtonMode, QuickButtonModeRecord, QuickButtonValueType } from '@/types/Settings'

type Params = {
  userMoney: number
  stockPrice: number
  amountOwned: number
  value: number
}

type ValueToAmount = {
  number: (params: Params) => number | string
  all: (params: Params) => number | string
}

const calculators: QuickButtonModeRecord<ValueToAmount> = {
  buy: {
    amount: {
      number: ({ userMoney, stockPrice, value }) => {
        const shares = maxBuyShares(value, stockPrice)
        if (shares <= 0) return 'Amount is less than one share'
        if (tornBuyCost(shares, stockPrice) > userMoney) return 'Not enough cash'
        return shares
      },
      all: ({ userMoney, stockPrice }) => {
        const shares = maxBuyShares(userMoney, stockPrice)
        if (shares <= 0) return 'Not enough cash for even one share'
        return shares
      },
    },
    keepCash: {
      number: ({ userMoney, stockPrice, value }) => {
        if (userMoney <= value) return 'Cash is already at or below reserve amount'
        const shares = maxBuyShares(userMoney - value, stockPrice)
        if (shares <= 0) return 'Not enough spare cash for even one share'
        return shares
      },
      all: () => 'Nothing to buy when keeping all cash',
    },
    percentage: {
      number: ({ userMoney, stockPrice, value }) => {
        const cashToSpend = (userMoney * value) / 100
        const shares = maxBuyShares(cashToSpend, stockPrice)
        if (shares <= 0) return 'Not enough cash for even one share at this percentage'
        if (tornBuyCost(shares, stockPrice) > userMoney) return 'Not enough cash'
        return shares
      },
      all: ({ userMoney, stockPrice }) => {
        const shares = maxBuyShares(userMoney, stockPrice)
        if (shares <= 0) return 'Not enough cash for even one share'
        return shares
      },
    },
  },
  sell: {
    amount: {
      number: ({ stockPrice, amountOwned, value }) => {
        if (amountOwned === 0) return 'No shares to sell'
        const shares = minSellShares(value, stockPrice)
        if (shares <= 0) return 'Amount is less than one share'
        if (shares > amountOwned) return 'Not enough shares owned'
        return shares
      },
      all: ({ amountOwned }) => {
        if (amountOwned === 0) return 'No shares to sell'
        return amountOwned
      },
    },
    toCash: {
      number: ({ userMoney, stockPrice, amountOwned, value }) => {
        if (userMoney >= value) return 'Cash is already at or above target'
        if (amountOwned === 0) return 'No shares to sell'
        const needed = value - userMoney
        const shares = minSellShares(needed, stockPrice)
        if (shares <= 0) return 'Amount is less than one share'
        if (shares > amountOwned) return 'Not enough shares to reach target'
        return shares
      },
      all: () => 'Nothing to sell when target is all cash on hand',
    },
  },
} as const

function maxBuyShares(budget: number, rawPrice: number): number {
  const shares = Math.floor(budget / rawPrice)
  return tornBuyCost(shares, rawPrice) > budget ? shares - 1 : shares
}

function minSellShares(target: number, rawPrice: number): number {
  const grossNeeded = Math.ceil(target / 0.999)
  const shares = Math.ceil(grossNeeded / rawPrice)
  return tornSellRevenue(shares, rawPrice) < target ? shares + 1 : shares
}

function tornBuyCost(shares: number, rawPrice: number): number {
  return Math.ceil(shares * rawPrice)
}

function tornSellRevenue(shares: number, rawPrice: number): number {
  const gross = Math.floor(shares * rawPrice)
  const fee = Math.ceil(gross * 0.001)
  return gross - fee
}

export function getAmountCalculator(action: QuickButtonAction, mode: QuickButtonMode, valueType: QuickButtonValueType) {
  return (calculators[action] as Record<string, ValueToAmount>)[mode][valueType]
}
