import React from 'react'
import { useSettingsStore } from '@/ui/stores/useSettingsStore'
import { QuickButtonColorList, type QuickButtonColor } from '@/types/Settings'
import { colorSelectSwatches } from '@/ui/colors'

export default function QuickButtonColorSelect() {
  const color = useSettingsStore((state) => state.editedQuickButton!.color)
  const setColor = useSettingsStore((state) => state.setEditedQuickButtonColor)

  return (
    <div className="grid grid-cols-6 place-items-center gap-1.5">
      {QuickButtonColorList.map((c) => (
        <button
          key={c}
          onClick={() => setColor(c)}
          className={`h-5 w-5 cursor-pointer rounded-full border-2 transition-transform ${colorSelectSwatches[c]} ${
            color === c
              ? 'scale-110 border-white ring-2 ring-neutral-400 dark:ring-neutral-500'
              : 'border-transparent opacity-60 hover:opacity-100'
          }`}
        />
      ))}
    </div>
  )
}
