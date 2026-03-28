import React from 'react'
import StockCardTag from '@/ui/stocks/card/tag/StockCardTag'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { DefaultQuickButtonColor } from '@/types/Settings'
import MoveButton from '@/ui/components/MoveButton'

type Props = {
  stockId: number
  quickButtonId: string
}

const handleClick = (stockId: number, quickButtonId: string) => {
  const currentEditedId = useSettingsStore.getState().editedQuickButton?.id
  if (currentEditedId === quickButtonId) {
    useSettingsStore.setState({ editedQuickButton: null })
  } else {
    useSettingsStore.setState((state) => {
      state.selectedStockId = stockId
      state.editedQuickButton = {
        ...state.stockSettings[stockId]?.quickButtons[quickButtonId],
        id: quickButtonId,
        stockId: stockId,
      }
    })
  }
}

export default function StockCardQuickButtonTag({ stockId, quickButtonId }: Props) {
  const label = useSettingsStore((state) => state.stockSettings[stockId]?.quickButtons[quickButtonId].label)
  const autoLabel = useSettingsStore((state) => state.stockSettings[stockId]?.quickButtons[quickButtonId].autoLabel)
  const action = useSettingsStore((state) => state.stockSettings[stockId]?.quickButtons[quickButtonId].action)
  const color = useSettingsStore((state) => state.stockSettings[stockId]?.quickButtons[quickButtonId].color)
  const selected = useSettingsStore((state) => state.editedQuickButton?.id === quickButtonId)
  const moveQuickButton = useSettingsStore((state) => state.moveQuickButton)

  const isFirst = useSettingsStore(
    (state) => (state.stockSettings[stockId]?.quickButtonOrder ?? []).indexOf(quickButtonId) === 0
  )
  const isLast = useSettingsStore((state) => {
    const order = state.stockSettings[stockId]?.quickButtonOrder ?? []
    return order.indexOf(quickButtonId) === order.length - 1
  })

  const showLeft = selected && !isFirst
  const showRight = selected && !isLast

  return (
    <div className="inline-flex items-stretch">
      {showLeft && <MoveButton direction="left" onClick={() => moveQuickButton(stockId, quickButtonId, 'left')} />}
      <StockCardTag
        text={label.length > 0 ? label : autoLabel}
        tagTheme={color ?? DefaultQuickButtonColor[action]}
        handleClick={() => handleClick(stockId, quickButtonId)}
        glow={selected}
      />
      {showRight && <MoveButton direction="right" onClick={() => moveQuickButton(stockId, quickButtonId, 'right')} />}
    </div>
  )
}
