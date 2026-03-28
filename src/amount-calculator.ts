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
      // Buy exactly $value worth — need enough cash
      number: ({ userMoney, stockPrice, value }) => {
        if (value > userMoney) return 'Not enough cash'
        const shares = Math.floor(value / stockPrice)
        if (shares === 0) return 'Amount is less than one share'
        return shares
      },
      // Buy with all cash
      all: ({ userMoney, stockPrice }) => {
        if (userMoney < stockPrice) return 'Not enough cash for even one share'
        return Math.floor(userMoney / stockPrice)
      },
    },
    keepCash: {
      // Buy shares while keeping $value in reserve
      number: ({ userMoney, stockPrice, value }) => {
        if (userMoney <= value) return 'Cash is already at or below reserve amount'
        const shares = Math.floor((userMoney - value) / stockPrice)
        if (shares === 0) return 'Not enough spare cash for even one share'
        return shares
      },
      // Keep all cash — nothing to do
      all: () => 'Nothing to buy when keeping all cash',
    },
    percentage: {
      // Spend value% of cash
      number: ({ userMoney, stockPrice, value }) => {
        const cashToSpend = (userMoney * value) / 100
        const shares = Math.floor(cashToSpend / stockPrice)
        if (shares === 0) return 'Not enough cash for even one share at this percentage'
        return shares
      },
      // Spend 100% of cash
      all: ({ userMoney, stockPrice }) => {
        if (userMoney < stockPrice) return 'Not enough cash for even one share'
        return Math.floor(userMoney / stockPrice)
      },
    },
  },
  sell: {
    amount: {
      // Sell $value worth of shares
      number: ({ stockPrice, amountOwned, value }) => {
        const shares = Math.ceil(value / stockPrice)
        if (shares > amountOwned) return 'Not enough shares owned'
        if (amountOwned === 0) return 'No shares to sell'
        return shares
      },
      // Sell all shares
      all: ({ amountOwned }) => {
        if (amountOwned === 0) return 'No shares to sell'
        return amountOwned
      },
    },
    toCash: {
      // Sell enough shares to reach $value cash
      number: ({ userMoney, stockPrice, amountOwned, value }) => {
        if (userMoney >= value) return 'Cash is already at or above target'
        const shares = Math.ceil((value - userMoney) / stockPrice)
        if (shares > amountOwned) return 'Not enough shares to reach target'
        return shares
      },
      // Not possible
      all: () => {
        return 'Nothing to sell when target is all cash on hand'
      },
    },
  },
} as const

export function getAmountCalculator(action: QuickButtonAction, mode: QuickButtonMode, valueType: QuickButtonValueType) {
  return (calculators[action] as Record<string, ValueToAmount>)[mode][valueType]
}
