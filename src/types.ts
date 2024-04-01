import type { STATUS } from './status'

export type Stage = keyof typeof STATUS

export interface TransitionOptions {
  preEnter?: boolean
  preExit?: boolean
  enter?: boolean
  exit?: boolean
  timeout?: number | { enter: number, exit: number }
  onStatusChange?: (status: Stage) => void
}
