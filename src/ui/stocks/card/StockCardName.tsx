import React from 'react'

type Props = {
  name: string
  acronym: string
}

export default function StockCardName({ name, acronym }: Props) {
  return (
    <div className={'flex w-fit items-center justify-start gap-2'}>
      <label
        className={`flex items-center justify-center rounded-sm bg-neutral-300 p-0.5 px-1 text-neutral-700
          dark:bg-neutral-700 dark:text-neutral-400`}
      >
        <span className={'text-xs font-medium uppercase'}>{acronym}</span>
      </label>
      <label className={'text-sm font-[550] text-neutral-700 dark:text-neutral-200'}>{name}</label>
    </div>
  )
}
