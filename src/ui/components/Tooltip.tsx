import React, { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'

type Props = {
  text: string
  children: ReactNode
  position?: 'top' | 'bottom'
  className?: string
  enabled?: boolean
  longPressDelay?: number
}

export default function Tooltip({
  text,
  children,
  position = 'top',
  className = '',
  enabled = true,
  longPressDelay = 500,
}: Props) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouchRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const hide = useCallback(() => {
    clearTimer()
    setVisible(false)
  }, [clearTimer])

  // --- Desktop: hover ---
  const onMouseEnter = () => {
    if (!enabled || isTouchRef.current) return
    timeoutRef.current = setTimeout(() => setVisible(true), 400)
  }

  const onMouseLeave = () => {
    if (isTouchRef.current) return
    hide()
  }

  // --- Mobile: long-press to show, release/scroll to hide ---
  const onTouchStart = () => {
    isTouchRef.current = true
    if (!enabled) return
    timeoutRef.current = setTimeout(() => setVisible(true), longPressDelay)
  }

  const onTouchEnd = () => {
    // If tooltip isn't visible yet, just cancel the timer — the tap
    // proceeds normally and toggles the checkbox without interference.
    if (!visible) {
      clearTimer()
    } else {
      hide()
    }
  }

  // Hide on scroll
  useEffect(() => {
    if (!visible) return
    const dismiss = () => hide()
    document.addEventListener('scroll', dismiss, true)
    return () => document.removeEventListener('scroll', dismiss, true)
  }, [visible, hide])

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  return (
    <div
      className={`${className} relative inline-flex`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onContextMenu={(e) => {
        if (!enabled) return
        e.preventDefault()
        setVisible((v) => !v)
      }}
    >
      {children}
      {visible && enabled && (
        <div
          className={`absolute left-1/2 z-50 -translate-x-1/2 rounded bg-neutral-800 px-2 py-1 text-xs font-bold
          whitespace-nowrap text-white normal-case shadow-lg dark:bg-neutral-200 dark:text-neutral-800 ${
            position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {text}
        </div>
      )}
    </div>
  )
}
