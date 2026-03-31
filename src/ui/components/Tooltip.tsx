import React, { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'

type Props = {
  text: string
  children: ReactNode
  position?: 'top' | 'bottom'
  className?: string
  enabled?: boolean
}

export default function Tooltip({ text, children, position = 'top', className = '', enabled = true }: Props) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouchRef = useRef(false)

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const hide = useCallback(() => {
    clearTimers()
    setVisible(false)
  }, [clearTimers])

  // --- Desktop: hover ---
  const onMouseEnter = () => {
    if (!enabled || isTouchRef.current) return
    clearTimers()
    timeoutRef.current = setTimeout(() => setVisible(true), 400)
  }

  const onMouseLeave = () => {
    if (isTouchRef.current) return
    hide()
  }

  // --- Mobile: show on tap, auto-hide after a moment ---
  // We don't block or delay anything — just flash the tooltip.
  const onTouchStart = () => {
    isTouchRef.current = true
    if (!enabled) return

    // Show immediately, no delay — the tap still propagates
    // to children (checkbox, button, etc.) naturally.
    clearTimers()
    setVisible(true)

    // Auto-hide after 1.5s so the user sees it briefly
    hideTimeoutRef.current = setTimeout(() => setVisible(false), 1500)
  }

  // No onTouchEnd needed — we're not blocking anything

  // Hide on scroll
  useEffect(() => {
    if (!visible) return
    const dismiss = () => hide()
    document.addEventListener('scroll', dismiss, true)
    return () => document.removeEventListener('scroll', dismiss, true)
  }, [visible, hide])

  // Dismiss on tap outside
  useEffect(() => {
    if (!visible || !isTouchRef.current) return
    const dismiss = (e: TouchEvent) => {
      // If the tap is outside this tooltip wrapper, hide
      hide()
    }
    // Use a slight delay so the current tap doesn't immediately dismiss
    const id = setTimeout(() => {
      document.addEventListener('touchstart', dismiss, { once: true })
    }, 50)
    return () => {
      clearTimeout(id)
      document.removeEventListener('touchstart', dismiss)
    }
  }, [visible, hide])

  useEffect(() => {
    return clearTimers
  }, [clearTimers])

  return (
    <div
      className={`${className} relative inline-flex`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onContextMenu={(e) => {
        if (!enabled) return
        e.preventDefault()
        setVisible((v) => !v)
      }}
    >
      {children}
      {visible && enabled && (
        <div
          className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded bg-neutral-800 px-2 py-1
          text-xs font-bold whitespace-nowrap text-white normal-case shadow-lg dark:bg-neutral-200 dark:text-neutral-800
          ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
        >
          {text}
        </div>
      )}
    </div>
  )
}
