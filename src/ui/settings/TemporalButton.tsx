import React from 'react'
import { TemporalState } from 'zundo'
import { SettingsStore, useTemporalStore } from '@/ui/stores/useSettingsStore'
import Tooltip from '@/ui/components/Tooltip'

type Props = {
  children: React.ReactNode
  action: (state: TemporalState<SettingsStore>) => void
  title: string
  canApply: (state: TemporalState<SettingsStore>) => boolean
}

export default function TemporalButton({ children, action, title, canApply }: Props) {
  const temporalState = useTemporalStore()
  const enabled = canApply(temporalState)

  return (
    <Tooltip text={title}>
      <button
        disabled={!enabled}
        onClick={() => enabled && action(temporalState)}
        className={`flex items-center justify-center rounded border p-1 ${
          enabled
            ? `cursor-pointer border-neutral-300 bg-neutral-200 text-neutral-700 hover:bg-neutral-300
              active:bg-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300
              dark:hover:bg-neutral-700 dark:active:bg-neutral-600`
            : `cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400 dark:border-neutral-800
              dark:bg-neutral-900 dark:text-neutral-600`
          }`}
      >
        {children}
      </button>
    </Tooltip>
  )
}
