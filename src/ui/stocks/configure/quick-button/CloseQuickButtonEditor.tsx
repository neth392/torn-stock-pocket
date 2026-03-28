import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import Tooltip from '@/ui/components/Tooltip'

export default function CloseQuickButtonEditor() {
  const setEditedQuickButton = useSettingsStore((state) => state.setEditedQuickButton)
  return (
    <Tooltip text={'Clear & Close'}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        onClick={() => setEditedQuickButton(null)}
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          className="fill-neutral-100 stroke-neutral-400 dark:fill-neutral-700 dark:stroke-neutral-500"
          strokeWidth="1"
        />
        <path
          d="M6.5 6.5L10 10L13.5 6.5M6.5 13.5L10 10L13.5 13.5"
          className="stroke-neutral-700 dark:stroke-neutral-400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Tooltip>
  )
}
