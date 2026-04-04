import React, { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'

type Props = {
  text: string
  children: ReactNode
  position?: 'top' | 'bottom'
  className?: string
  enabled?: boolean
  showDelay?: number
}

export default function Tooltip({
  text,
  children,
  position = 'top',
  className = '',
  enabled = true,
  showDelay = 400,
}: Props) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouchRef = useRef(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

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

  // Ref callback: positions the tooltip the instant it mounts
  const tooltipRefCallback = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !wrapperRef.current) return
      const wrapper = wrapperRef.current.getBoundingClientRect()
      const rect = el.getBoundingClientRect()
      const padding = 4

      // Vertical
      el.style.top = position === 'top' ? `${wrapper.top - rect.height - 4}px` : `${wrapper.bottom + 4}px`

      // Horizontal: center, then clamp
      const maxWidth = window.innerWidth - padding * 2
      if (rect.width > maxWidth) el.style.maxWidth = `${maxWidth}px`

      const width = Math.min(rect.width, maxWidth)
      let left = wrapper.left + wrapper.width / 2 - width / 2
      left = Math.max(padding, Math.min(left, window.innerWidth - width - padding))
      el.style.left = `${left}px`

      el.style.visibility = 'visible'
    },
    [position]
  )

  // --- Desktop: hover ---
  const onMouseEnter = () => {
    if (!enabled || isTouchRef.current) return
    clearTimers()
    timeoutRef.current = setTimeout(() => setVisible(true), showDelay)
  }

  const onMouseLeave = () => {
    if (isTouchRef.current) return
    hide()
  }

  // --- Mobile: show on tap, auto-hide after a moment ---
  const onTouchStart = () => {
    isTouchRef.current = true
    if (!enabled) return

    clearTimers()
    setVisible(true)

    hideTimeoutRef.current = setTimeout(() => setVisible(false), 1500)
  }

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
    const dismiss = () => {
      hide()
    }
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
      ref={wrapperRef}
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
          ref={tooltipRefCallback}
          className={`pointer-events-none fixed z-50 rounded bg-neutral-800 px-2 py-1 text-xs font-bold text-white
          normal-case shadow-lg dark:bg-neutral-200 dark:text-neutral-800`}
          style={{ width: 'max-content', visibility: 'hidden' }}
        >
          {text}
        </div>
      )}
    </div>
  )
}
