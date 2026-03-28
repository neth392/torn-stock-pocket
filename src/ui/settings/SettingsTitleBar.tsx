import React from 'react'
import ChevronDown from '@/ui/icons/ChevronDown'
import ChevronRight from '@/ui/icons/ChevronRight'

type Props = {
  handleClick: () => void
  expanded: boolean
}

export default function SettingsTitleBar({ handleClick, expanded }: Props) {
  return (
    <div
      onClick={handleClick}
      className={`flex h-min cursor-pointer flex-nowrap items-center justify-between rounded-t-sm bg-neutral-200 p-1
        pl-2 text-neutral-800 select-none dark:bg-neutral-800 dark:text-neutral-100
        ${expanded ? 'border-b border-neutral-300 dark:border-neutral-700' : 'rounded-b-sm'}`}
    >
      <label className={'text-base font-bold'}>Stock Pocket</label>
      {expanded ? <ChevronDown /> : <ChevronRight />}
    </div>
  )
}
