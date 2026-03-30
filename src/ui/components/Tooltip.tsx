import React, { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'

type Props = {
  text: string
  children: ReactNode
  position?: 'top' | 'bottom'
  className?: string
  enabled?: boolean
}

// Testing workflows
export default function Tooltip({ text, children, position = 'top', className = '', enabled = true }: Props) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (!enabled) return
    timeoutRef.current = setTimeout(() => setVisible(true), 400)
  }

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!visible) return
    document.addEventListener('scroll', hide, true)
    document.addEventListener('touchstart', hide)
    return () => {
      document.removeEventListener('scroll', hide, true)
      document.removeEventListener('touchstart', hide)
    }
  }, [visible, hide])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className={`${className} relative inline-flex`}
      onMouseEnter={show}
      onMouseLeave={hide}
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
