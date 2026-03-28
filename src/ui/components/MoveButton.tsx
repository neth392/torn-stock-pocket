import React from 'react'

type Props = {
  direction: 'left' | 'right' | 'up' | 'down'
  onClick: () => void
}

const paths: Record<Props['direction'], string> = {
  left: 'M8 2L4 6L8 10',
  right: 'M4 2L8 6L4 10',
  up: 'M2 8L6 4L10 8',
  down: 'M2 4L6 8L10 4',
} as const

const roundingClasses: Record<Props['direction'], string> = {
  left: 'rounded-l-md border-r-0',
  right: 'rounded-r-md border-l-0',
  up: 'rounded-t-md border-b-0',
  down: 'rounded-b-md border-t-0',
} as const

export default function MoveButton({ direction, onClick }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`flex cursor-pointer items-center border border-neutral-300 bg-neutral-200 px-0.5 text-neutral-400
        transition-colors hover:bg-neutral-300 hover:text-neutral-600 active:scale-95 dark:border-neutral-500/50
        dark:bg-neutral-700/50 dark:text-neutral-500 dark:hover:bg-neutral-600/50 dark:hover:text-neutral-200
        ${roundingClasses[direction]}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={paths[direction]}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
