import React from 'react'
import QuickButtonActionSelect from '@/ui/stocks/configure/quick-button/QuickButtonActionSelect'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import CloseQuickButtonEditor from '@/ui/stocks/configure/quick-button/CloseQuickButtonEditor'
import { type QuickButtonAction, QuickButtonActionList } from '@/types/Settings'
import QuickButtonValueInput from '@/ui/stocks/configure/quick-button/QuickButtonValueInput'
import SaveQuickButton from '@/ui/stocks/configure/quick-button/SaveQuickButton'
import QuickButtonLabelEditor from '@/ui/stocks/configure/quick-button/QuickButtonLabelEditor'
import DeleteQuickButton from '@/ui/stocks/configure/quick-button/DeleteQuickButton'
import SaveQuickButtonError from '@/ui/stocks/configure/quick-button/SaveQuickButtonError'
import QuickButtonModeRow from '@/ui/stocks/configure/quick-button/QuickButtonModeRow'
import QuickButtonColorSelect from '@/ui/stocks/configure/quick-button/QuickButtonColorSelect'
import QuickButtonToggle from '@/ui/stocks/configure/quick-button/QuickButtonToggle'

const quickButtonActionClasses: Record<QuickButtonAction, string> = {
  buy: `border-green-400 bg-green-100 text-green-700 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-400`,
  sell: `border-red-300 bg-red-100 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400`,
}

function HorizontalDiv({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex justify-center gap-2 select-none ${className}`}>{children}</div>
}

export default function QuickButtonEditor() {
  const editQuickButtonId = useSettingsStore((state) => state.editedQuickButton?.id)
  const exists = useSettingsStore((state) => {
    const eb = state.editedQuickButton
    if (!eb) return false
    return !!state.stockSettings[eb.stockId]?.quickButtons[eb.id]
  })

  return editQuickButtonId ? (
    <div className={'mt-4'}>
      <div className="mb-3 flex items-center gap-1 text-xs font-bold tracking-wider text-neutral-500 uppercase">
        {`${exists ? 'Edit' : 'Create'} Quick Button`} <CloseQuickButtonEditor />
      </div>
      <div className={'flex flex-col gap-2'}>
        <HorizontalDiv>
          {QuickButtonActionList.map((action) => (
            <QuickButtonActionSelect key={action} targetAction={action} className={quickButtonActionClasses[action]} />
          ))}
          <QuickButtonColorSelect />
        </HorizontalDiv>
        <HorizontalDiv>
          <QuickButtonModeRow />
        </HorizontalDiv>
        <HorizontalDiv>
          <QuickButtonValueInput />
          <QuickButtonLabelEditor />
        </HorizontalDiv>
        <HorizontalDiv className={'flex-wrap'}>
          <QuickButtonToggle fieldKey={'showAcronym'} label={'Acronym'} description={'Shows the stock acronym'} />
          <QuickButtonToggle fieldKey={'showIcon'} label={'Icon'} description={'Shows the stock icon image'} />
          <QuickButtonToggle
            fieldKey={'showShares'}
            label={'Share #'}
            description={'Shows the number of shares to be sold/bought'}
          />
        </HorizontalDiv>
        <HorizontalDiv>
          <SaveQuickButton />
          <DeleteQuickButton />
        </HorizontalDiv>
        <HorizontalDiv>
          <SaveQuickButtonError />
        </HorizontalDiv>
      </div>
    </div>
  ) : null
}
