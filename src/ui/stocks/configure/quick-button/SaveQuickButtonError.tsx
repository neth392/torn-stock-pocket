import React from 'react'
import { useQuickButtonError } from '@/ui/hooks/useQuickButtonError'

export default function SaveQuickButtonError() {
  const error = useQuickButtonError()
  return error ? <span className="text-xs text-red-500 dark:text-red-400">{error}</span> : null
}
