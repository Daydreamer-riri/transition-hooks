import type { Stage } from './types'

export enum STATUS {
  preEnter,
  entering,
  entered,
  preExit,
  exiting,
  exited,
  unmounted,
}

export type StatusState = Omit<ReturnType<typeof getState>, '_s'>

export function getState(status: STATUS) {
  return {
    _s: status,
    status: STATUS[status] as Stage,
    shouldMount: status !== STATUS.exited,
    isEnter: status < STATUS.preExit,
    isResolved: status === STATUS.entered || status > STATUS.exiting,
  }
}

export function getEndStatus(status: STATUS) {
  switch (status) {
    case STATUS.entering:
    case STATUS.preEnter:
      return STATUS.entered

    case STATUS.exiting:
    case STATUS.preExit:
      return STATUS.exited
  }
}
