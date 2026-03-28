import type { QuickButtonColor } from '@/types/Settings'

export const quickButtonColorStyles: Record<QuickButtonColor, { button: string; badge: string }> = {
  red: {
    button:
      'border-red-400 bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300 dark:border-red-900/75 dark:bg-red-950/75 dark:text-red-300 dark:hover:bg-red-900/75 dark:active:bg-red-800/75',
    badge: 'bg-red-500 text-white dark:bg-red-600',
  },
  rose: {
    button:
      'border-rose-400 bg-rose-100 text-rose-700 hover:bg-rose-200 active:bg-rose-300 dark:border-rose-800 dark:bg-rose-950/75 dark:text-rose-400 dark:hover:bg-rose-900/75 dark:active:bg-rose-800/75',
    badge: 'bg-rose-500 text-white dark:bg-rose-600',
  },
  pink: {
    button:
      'border-pink-400 bg-pink-100 text-pink-700 hover:bg-pink-200 active:bg-pink-300 dark:border-pink-800 dark:bg-pink-950/75 dark:text-pink-400 dark:hover:bg-pink-900/75 dark:active:bg-pink-800/75',
    badge: 'bg-pink-500 text-white dark:bg-pink-600',
  },
  orange: {
    button:
      'border-orange-400 bg-orange-100 text-orange-700 hover:bg-orange-200 active:bg-orange-300 dark:border-orange-800 dark:bg-orange-950/75 dark:text-orange-400 dark:hover:bg-orange-900/75 dark:active:bg-orange-800/75',
    badge: 'bg-orange-500 text-white dark:bg-orange-600',
  },
  amber: {
    button:
      'border-amber-400 bg-amber-100 text-amber-700 hover:bg-amber-200 active:bg-amber-300 dark:border-amber-800 dark:bg-amber-950/75 dark:text-amber-400 dark:hover:bg-amber-900/75 dark:active:bg-amber-800/75',
    badge: 'bg-amber-500 text-white dark:bg-amber-600',
  },
  yellow: {
    button:
      'border-yellow-400 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 active:bg-yellow-300 dark:border-yellow-800 dark:bg-yellow-950/75 dark:text-yellow-400 dark:hover:bg-yellow-900/75 dark:active:bg-yellow-800/75',
    badge: 'bg-yellow-500 text-white dark:bg-yellow-600',
  },
  lime: {
    button:
      'border-lime-400 bg-lime-100 text-lime-700 hover:bg-lime-200 active:bg-lime-300 dark:border-lime-800 dark:bg-lime-950/75 dark:text-lime-400 dark:hover:bg-lime-900/75 dark:active:bg-lime-800/75',
    badge: 'bg-lime-500 text-white dark:bg-lime-600',
  },
  green: {
    button:
      'border-green-400 bg-green-100 text-green-700 hover:bg-green-200 active:bg-green-300 dark:border-green-800 dark:bg-green-950/75 dark:text-green-400 dark:hover:bg-green-900/75 dark:active:bg-green-800/75',
    badge: 'bg-green-500 text-white dark:bg-green-600',
  },
  teal: {
    button:
      'border-teal-400 bg-teal-100 text-teal-700 hover:bg-teal-200 active:bg-teal-300 dark:border-teal-800 dark:bg-teal-950/75 dark:text-teal-400 dark:hover:bg-teal-900/75 dark:active:bg-teal-800/75',
    badge: 'bg-teal-500 text-white dark:bg-teal-600',
  },
  blue: {
    button:
      'border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 dark:border-blue-800 dark:bg-blue-950/75 dark:text-blue-400 dark:hover:bg-blue-900/75 dark:active:bg-blue-800/75',
    badge: 'bg-blue-500 text-white dark:bg-blue-600',
  },
  indigo: {
    button:
      'border-indigo-400 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:bg-indigo-300 dark:border-indigo-800 dark:bg-indigo-950/75 dark:text-indigo-400 dark:hover:bg-indigo-900/75 dark:active:bg-indigo-800/75',
    badge: 'bg-indigo-500 text-white dark:bg-indigo-600',
  },
  purple: {
    button:
      'border-purple-400 bg-purple-100 text-purple-700 hover:bg-purple-200 active:bg-purple-300 dark:border-purple-800 dark:bg-purple-950/75 dark:text-purple-400 dark:hover:bg-purple-900/75 dark:active:bg-purple-800/75',
    badge: 'bg-purple-500 text-white dark:bg-purple-600',
  },
} as const

export type TagTheme = QuickButtonColor | 'gray'

export const tagThemeColorMap: Record<TagTheme, string> = {
  red: 'bg-red-100 border-red-400 dark:bg-red-950/75 dark:border-red-900/75 text-red-700 dark:text-red-300',
  rose: 'bg-rose-100 border-rose-400 dark:bg-rose-950/75 dark:border-rose-800 text-rose-700 dark:text-rose-400',
  pink: 'bg-pink-100 border-pink-400 dark:bg-pink-950/75 dark:border-pink-800 text-pink-700 dark:text-pink-400',
  orange:
    'bg-orange-100 border-orange-400 dark:bg-orange-950/75 dark:border-orange-800 text-orange-700 dark:text-orange-400',
  amber: 'bg-amber-100 border-amber-400 dark:bg-amber-950/75 dark:border-amber-800 text-amber-700 dark:text-amber-400',
  yellow:
    'bg-yellow-100 border-yellow-400 dark:bg-yellow-950/75 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400',
  lime: 'bg-lime-100 border-lime-400 dark:bg-lime-950/75 dark:border-lime-800 text-lime-700 dark:text-lime-400',
  green:
    'dark:border-green-900/40 dark:bg-green-950/50 border-green-400 bg-green-100 text-green-700 dark:text-green-400',
  teal: 'bg-teal-100 border-teal-400 dark:bg-teal-950/75 dark:border-teal-800 text-teal-700 dark:text-teal-400',
  blue: 'bg-blue-100 border-blue-400 dark:bg-blue-950/75 dark:border-blue-800 text-blue-700 dark:text-blue-400',
  indigo:
    'bg-indigo-100 border-indigo-400 dark:bg-indigo-950/75 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400',
  purple:
    'bg-purple-100 border-purple-400 dark:bg-purple-950/75 dark:border-purple-800 text-purple-700 dark:text-purple-400',
  gray: 'bg-neutral-100 border-neutral-400 dark:bg-neutral-800/75 dark:border-neutral-600 text-neutral-700 dark:text-neutral-400',
}

export const tagThemeGlowMap: Record<TagTheme, string> = {
  red: 'shadow-[0_0_8px_2px_rgba(239,68,68,0.5),0_0_16px_4px_rgba(239,68,68,0.2)] dark:shadow-[0_0_8px_2px_rgba(239,68,68,0.4),0_0_16px_4px_rgba(239,68,68,0.15)]',
  rose: 'shadow-[0_0_8px_2px_rgba(244,63,94,0.5),0_0_16px_4px_rgba(244,63,94,0.2)] dark:shadow-[0_0_8px_2px_rgba(244,63,94,0.4),0_0_16px_4px_rgba(244,63,94,0.15)]',
  pink: 'shadow-[0_0_8px_2px_rgba(236,72,153,0.5),0_0_16px_4px_rgba(236,72,153,0.2)] dark:shadow-[0_0_8px_2px_rgba(236,72,153,0.4),0_0_16px_4px_rgba(236,72,153,0.15)]',
  orange:
    'shadow-[0_0_8px_2px_rgba(249,115,22,0.5),0_0_16px_4px_rgba(249,115,22,0.2)] dark:shadow-[0_0_8px_2px_rgba(249,115,22,0.4),0_0_16px_4px_rgba(249,115,22,0.15)]',
  amber:
    'shadow-[0_0_8px_2px_rgba(245,158,11,0.5),0_0_16px_4px_rgba(245,158,11,0.2)] dark:shadow-[0_0_8px_2px_rgba(245,158,11,0.4),0_0_16px_4px_rgba(245,158,11,0.15)]',
  yellow:
    'shadow-[0_0_8px_2px_rgba(234,179,8,0.5),0_0_16px_4px_rgba(234,179,8,0.2)] dark:shadow-[0_0_8px_2px_rgba(234,179,8,0.4),0_0_16px_4px_rgba(234,179,8,0.15)]',
  lime: 'shadow-[0_0_8px_2px_rgba(132,204,22,0.5),0_0_16px_4px_rgba(132,204,22,0.2)] dark:shadow-[0_0_8px_2px_rgba(132,204,22,0.4),0_0_16px_4px_rgba(132,204,22,0.15)]',
  green:
    'shadow-[0_0_8px_2px_rgba(34,197,94,0.5),0_0_16px_4px_rgba(34,197,94,0.2)] dark:shadow-[0_0_8px_2px_rgba(34,197,94,0.4),0_0_16px_4px_rgba(34,197,94,0.15)]',
  teal: 'shadow-[0_0_8px_2px_rgba(20,184,166,0.5),0_0_16px_4px_rgba(20,184,166,0.2)] dark:shadow-[0_0_8px_2px_rgba(20,184,166,0.4),0_0_16px_4px_rgba(20,184,166,0.15)]',
  blue: 'shadow-[0_0_8px_2px_rgba(59,130,246,0.5),0_0_16px_4px_rgba(59,130,246,0.2)] dark:shadow-[0_0_8px_2px_rgba(59,130,246,0.4),0_0_16px_4px_rgba(59,130,246,0.15)]',
  indigo:
    'shadow-[0_0_8px_2px_rgba(99,102,241,0.5),0_0_16px_4px_rgba(99,102,241,0.2)] dark:shadow-[0_0_8px_2px_rgba(99,102,241,0.4),0_0_16px_4px_rgba(99,102,241,0.15)]',
  purple:
    'shadow-[0_0_8px_2px_rgba(168,85,247,0.5),0_0_16px_4px_rgba(168,85,247,0.2)] dark:shadow-[0_0_8px_2px_rgba(168,85,247,0.4),0_0_16px_4px_rgba(168,85,247,0.15)]',
  gray: 'shadow-[0_0_8px_2px_rgba(163,163,163,0.5),0_0_16px_4px_rgba(163,163,163,0.2)] dark:shadow-[0_0_8px_2px_rgba(163,163,163,0.4),0_0_16px_4px_rgba(163,163,163,0.15)]',
} as const

export const tagThemeBorderMap: Record<TagTheme, string> = {
  red: 'border-red-500 dark:border-red-500',
  rose: 'border-rose-500 dark:border-rose-500',
  pink: 'border-pink-500 dark:border-pink-500',
  orange: 'border-orange-500 dark:border-orange-500',
  amber: 'border-amber-500 dark:border-amber-500',
  yellow: 'border-yellow-500 dark:border-yellow-500',
  lime: 'border-lime-500 dark:border-lime-500',
  green: 'border-green-500 dark:border-green-500',
  teal: 'border-teal-500 dark:border-teal-500',
  blue: 'border-blue-500 dark:border-blue-500',
  indigo: 'border-indigo-500 dark:border-indigo-500',
  purple: 'border-purple-500 dark:border-purple-500',
  gray: 'border-neutral-500 dark:border-neutral-500',
} as const

export const colorSelectSwatches: Record<QuickButtonColor, string> = {
  red: 'bg-red-500',
  rose: 'bg-rose-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  teal: 'bg-teal-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
} as const
