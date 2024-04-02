import type { STATUS } from './status'

export type Stage = keyof typeof STATUS

export interface TransitionOptions {
  /**
   * Add a 'preEnter' state immediately before 'entering', which is necessary to change DOM elements from unmounted or display: none with CSS transition (not necessary for CSS animation).
   * @default true
   */
  preEnter?: boolean
  /**
   * Add a 'preExit' state immediately before 'exiting'
   * @default false
   */
  preExit?: boolean
  /**
   * Set timeout in ms for transitions; you can set a single value or different values for enter and exit transitions.
   * @default 300
   */
  timeout?: number | { enter: number, exit: number }
  onStatusChange?: (status: Stage) => void
  enter?: boolean
  exit?: boolean
}
