import { generateAutoLabel } from '@/ui/hooks/useAutoLabel'

export const QuickButtonActionList = ['buy', 'sell'] as const
export type QuickButtonAction = (typeof QuickButtonActionList)[number]

export const QuickButtonModes = {
  buy: ['amount', 'keepCash', 'percentage'],
  sell: ['amount', 'toCash'],
} as const

export type QuickButtonMode = (typeof QuickButtonModes)[QuickButtonAction][number]

export type QuickButtonModeRecord<T> = {
  [A in QuickButtonAction]: {
    [M in (typeof QuickButtonModes)[A][number]]: T
  }
}

export const DefaultQuickButtonModes: {
  [A in QuickButtonAction]: (typeof QuickButtonModes)[A][number]
} = {
  buy: 'amount',
  sell: 'amount',
}

export const QuickButtonValueTypeList = ['number', 'all'] as const
export type QuickButtonValueType = (typeof QuickButtonValueTypeList)[number]
export type QuickButtonValue = number | null

export const QuickButtonColorList = [
  'red',
  'rose',
  'pink',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
] as const
export type QuickButtonColor = (typeof QuickButtonColorList)[number]

export const DefaultQuickButtonColor: Record<QuickButtonAction, QuickButtonColor> = {
  buy: 'blue',
  sell: 'red',
}

export type QuickButton = {
  valueType: QuickButtonValueType
  value: QuickButtonValue
  label: string
  autoLabel: string
  color: QuickButtonColor | null
  showAcronym: boolean
  showShares: boolean
  showIcon: boolean
} & (
  | {
      action: 'buy'
      mode: (typeof QuickButtonModes)['buy'][number]
    }
  | {
      action: 'sell'
      mode: (typeof QuickButtonModes)['sell'][number]
    }
)

export const DefaultQuickButton = {
  action: 'buy',
  mode: 'amount',
  valueType: 'number',
  value: 0,
  label: '',
  autoLabel: generateAutoLabel({ action: 'buy', mode: 'amount', valueType: 'number', value: 0 }),
  color: null,
  showAcronym: true,
  showShares: false,
  showIcon: false,
} as const satisfies QuickButton

export type EditedQuickButton = QuickButton & { id: string; stockId: number }

export type StockSetting = {
  quickButtons: Record<string, QuickButton>
  quickButtonOrder: string[]
  allowTrade: {
    buy: boolean
    sell: boolean
  }
}

export const DefaultStockSetting = {
  quickButtons: {},
  quickButtonOrder: [],
  allowTrade: {
    buy: false,
    sell: false,
  },
} as const satisfies StockSetting

export type StockSettings = Record<number, StockSetting>

export type Settings = {
  uiExpanded: boolean
  blockTrade: {
    buy: boolean
    sell: boolean
  }
  stockSettings: StockSettings
  stockSettingsOrder: number[]
  selectedStockId: number | null
  editedQuickButton: EditedQuickButton | null
}

export const DefaultSettings = {
  uiExpanded: true,
  blockTrade: {
    buy: false,
    sell: false,
  },
  stockSettings: {},
  stockSettingsOrder: [],
  selectedStockId: null,
  editedQuickButton: null,
} as const satisfies Settings
