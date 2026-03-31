import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { temporal, TemporalState } from 'zundo'
import {
  DefaultQuickButton,
  DefaultQuickButtonModes,
  DefaultSettings,
  DefaultStockSetting,
  type EditedQuickButton,
  type QuickButtonAction,
  type QuickButtonColor,
  type QuickButtonMode,
  QuickButtonModes,
  type QuickButtonValueType,
  type Settings,
  type StockSetting,
} from '@/types/Settings'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { generateAutoLabel } from '@/ui/hooks/useAutoLabel'
import { KeyOfType } from '@/types/GeneralTypes'

export type SettingsStore = Settings & {
  load: () => Promise<void>
  save: () => Promise<void>
  setUiExpanded: (expanded: boolean) => void
  setBlockBuy: (blocked: boolean) => void
  setBlockSell: (blocked: boolean) => void
  setAllowStockTrade(stock: number, key: keyof StockSetting['allowTrade'], allow: boolean): void
  removeStockSetting(stockId: number): void
  setSelectedStockId: (stockId: number | null) => void
  setEditedQuickButton: (quickButton: EditedQuickButton | null) => void
  setEditedQuickButtonAction: (action: QuickButtonAction) => void
  setEditedQuickButtonMode: (mode: QuickButtonMode) => void
  setEditedQuickButtonValue: (type: QuickButtonValueType, value: number | null) => void
  setEditedQuickButtonLabel: (label: string) => void
  setEditedQuickButtonColor: (color: QuickButtonColor) => void
  setEditedQuickButtonToggle: (enabled: boolean, key: KeyOfType<EditedQuickButton, boolean>) => void
  saveEditedQuickButton: () => void
  deleteQuickButton: (stockId: number, quickButtonId: string) => void
  moveQuickButton: (stockId: number, quickButtonId: string, direction: 'left' | 'right') => void
  moveStockSetting: (stockId: number, direction: 'up' | 'down') => void
}

let loaded = false

export const useSettingsStore = create<SettingsStore>()(
  temporal(
    immer((set, get) => ({
      ...DefaultSettings,
      load: async () => {
        if (loaded) throw new Error('settings already loaded')
        const saved = await GM.getValue('settings', DefaultSettings)

        if (saved !== DefaultSettings && updateSettings(saved)) {
          await GM.setValue('settings', saved)
        }

        set(saved)
        loaded = true
      },
      save: async () => {
        return await GM.setValue('settings', get())
      },
      setUiExpanded: (expanded) => set({ uiExpanded: expanded }),
      setBlockBuy: (blocked) =>
        set((state) => {
          state.blockTrade.buy = blocked
        }),
      setBlockSell: (blocked) =>
        set((state) => {
          state.blockTrade.sell = blocked
        }),
      setAllowStockTrade: (stock, key, allow) =>
        set((state) => {
          getOrCreateStockSetting(state, stock).allowTrade[key] = allow
          cleanupStockSetting(state, stock)
        }),
      removeStockSetting: (stockId) => {
        set((state) => {
          delete state.stockSettings[stockId]
          state.stockSettingsOrder = state.stockSettingsOrder.filter((id) => id !== stockId)
        })
      },
      setSelectedStockId: (stockId) => {
        if (get().selectedStockId === stockId) return
        set({
          selectedStockId: stockId,
          editedQuickButton: null,
        })
      },
      setEditedQuickButton: (editedQuickButton) => {
        const current = get().editedQuickButton
        if (current?.id !== editedQuickButton?.id) {
          set({ editedQuickButton })
        }
      },
      setEditedQuickButtonAction: (action: QuickButtonAction) => {
        set((state) => {
          if (!state.editedQuickButton) return
          state.editedQuickButton.action = action
          // Reset the mode if it's not valid for the action
          if (!(QuickButtonModes[action] as readonly QuickButtonMode[]).includes(state.editedQuickButton.mode)) {
            state.editedQuickButton.mode = DefaultQuickButtonModes[action]
          }
        })
      },
      setEditedQuickButtonMode: (mode: QuickButtonMode) => {
        set((state) => {
          if (state.editedQuickButton) state.editedQuickButton.mode = mode
        })
      },
      setEditedQuickButtonValue: (type: QuickButtonValueType, value: number | null) => {
        set((state) => {
          if (state.editedQuickButton) {
            state.editedQuickButton.value = value
            state.editedQuickButton.valueType = type
          }
        })
      },
      setEditedQuickButtonLabel: (label) => {
        set((state) => {
          if (state.editedQuickButton) state.editedQuickButton.label = label
        })
      },
      setEditedQuickButtonColor: (color) => {
        set((state) => {
          if (!state.editedQuickButton) return
          state.editedQuickButton.color = state.editedQuickButton.color === color ? null : color
        })
      },
      setEditedQuickButtonToggle: (enabled, key) => {
        set((state) => {
          if (!state.editedQuickButton) return
          state.editedQuickButton[key] = enabled
        })
      },
      saveEditedQuickButton: () => {
        set((state) => {
          if (state.editedQuickButton) {
            const stockSetting = getOrCreateStockSetting(state, state.editedQuickButton.stockId)

            state.editedQuickButton.label = state.editedQuickButton.label.trim()
            state.editedQuickButton.autoLabel = generateAutoLabel(state.editedQuickButton)

            stockSetting.quickButtons[state.editedQuickButton.id] = state.editedQuickButton
            if (!stockSetting.quickButtonOrder.includes(state.editedQuickButton.id)) {
              stockSetting.quickButtonOrder.push(state.editedQuickButton.id)
            }
          }
        })
      },
      deleteQuickButton: (stockId, quickButtonId) => {
        set((state) => {
          const stockSetting = getOrCreateStockSetting(state, stockId)
          delete stockSetting.quickButtons[quickButtonId]
          stockSetting.quickButtonOrder = stockSetting.quickButtonOrder.filter((id) => id !== quickButtonId)
          state.editedQuickButton = null
          cleanupStockSetting(state, stockId)
        })
      },
      moveQuickButton: (stockId, quickButtonId, direction) => {
        set((state) => {
          const stockSetting = state.stockSettings[stockId]
          if (!stockSetting) return

          const order = stockSetting.quickButtonOrder
          const index = order.indexOf(quickButtonId)
          if (index === -1) return

          const targetIndex = direction === 'left' ? index - 1 : index + 1
          if (targetIndex < 0 || targetIndex >= order.length) {
            return
          }

          ;[order[index], order[targetIndex]] = [order[targetIndex], order[index]]
        })
      },
      moveStockSetting: (stockId, direction) => {
        set((state) => {
          const order = state.stockSettingsOrder
          const index = order.indexOf(stockId)
          if (index === -1) return

          const targetIndex = direction === 'up' ? index - 1 : index + 1
          if (targetIndex < 0 || targetIndex >= order.length) return
          ;[order[index], order[targetIndex]] = [order[targetIndex], order[index]]
        })
      },
    }))
  )
)

export function useTemporalStore(): TemporalState<SettingsStore>
export function useTemporalStore<T>(selector: (state: TemporalState<SettingsStore>) => T): T
export function useTemporalStore<T>(
  selector: (state: TemporalState<SettingsStore>) => T,
  equality: (a: T, b: T) => boolean
): T
export function useTemporalStore<T>(
  selector?: (state: TemporalState<SettingsStore>) => T,
  equality?: (a: T, b: T) => boolean
) {
  return useStoreWithEqualityFn(useSettingsStore.temporal, selector!, equality)
}

useSettingsStore.subscribe(async (state) => {
  if (loaded) void state.save()
})

function getOrCreateStockSetting(state: Settings, stockId: number): StockSetting {
  if (!state.stockSettings[stockId]) {
    state.stockSettings[stockId] = structuredClone(DefaultStockSetting)
    state.stockSettingsOrder.push(stockId)
  }
  return state.stockSettings[stockId]
}

function cleanupStockSetting(state: Settings, stockId: number) {
  const setting = state.stockSettings[stockId]
  if (!setting) return false
  if (!setting.allowTrade.buy && !setting.allowTrade.sell && Object.keys(setting.quickButtons).length === 0) {
    delete state.stockSettings[stockId]
    state.stockSettingsOrder = state.stockSettingsOrder.filter((id) => id !== stockId)
    return true
  }
}

function updateSettings(settings: Settings) {
  let updated = false

  // Update settings
  updated = updateObject(settings, DefaultSettings, updated)

  for (const stockKey of Object.keys(settings.stockSettings)) {
    // Update each stock setting
    const stockSetting = settings.stockSettings[Number(stockKey)]
    updated = updateObject(stockSetting, DefaultStockSetting, updated)

    for (const quickButtonKey of Object.keys(stockSetting.quickButtons)) {
      // Update each quick button setting
      const quickButton = stockSetting.quickButtons[quickButtonKey]
      updated = updateObject(quickButton, DefaultQuickButton, updated)
    }
  }

  // Ensure stocks are in stock settings order
  // TODO investigate what caused this
  for (const stockKeyString of Object.keys(settings.stockSettings)) {
    const stockKey = Number(stockKeyString)
    if (!settings.stockSettingsOrder.includes(stockKey)) {
      updated = true
      settings.stockSettingsOrder.push(stockKey)
    }
  }

  return updated
}

function updateObject<T extends object>(object: T, defaultObject: T, _updated: boolean) {
  let updated = _updated

  // Add missing keys
  for (const key of Object.keys(defaultObject) as (keyof T)[]) {
    if (key in object) continue
    ;(object[key] as any) = structuredClone(defaultObject[key])
    updated = true
  }

  // Remove unused keys
  for (const key of Object.keys(object) as (keyof T)[]) {
    if (key in defaultObject) continue
    delete (object as any)[key]
    updated = true
  }

  return updated
}
