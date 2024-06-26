import type { Stage } from './status'

export interface TransitionOptions {
  /**
   * Add a 'from' state immediately before 'entering', which is necessary to change DOM elements from unmounted or display: none with CSS transition (not necessary for CSS animation).
   * @default true
   */
  from?: boolean
  /**
   * Set timeout in ms for transitions; you can set a single value or different values for enter and exit transitions.
   * @default 300
   */
  timeout?: number | { enter: number, exit: number }
  /**
   * Beginning from 'from' state
   */
  initialEntered?: boolean
  entered?: boolean
  onStatusChange?: (status: Stage) => void
}
