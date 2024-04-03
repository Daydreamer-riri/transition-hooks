export type Stage = keyof typeof STATUS

export enum STATUS {
  from,
  entering,
  entered,
  exiting,
  exited,
}

export type StatusState = Omit<ReturnType<typeof getState>, '_s'>

export function getState(status: STATUS) {
  return {
    _s: status,
    status: STATUS[status] as Stage,
    /**
     * status !== 'exited',
     */
    shouldMount: status !== STATUS.exited,
    isEnter: status === STATUS.entering || status === STATUS.entered,
    notExit: status < STATUS.exiting,
    isResolved: status === STATUS.entered || status > STATUS.exiting,
  }
}

const simpleStatusMap = {
  from: 'from',
  entering: 'enter',
  entered: 'enter',
  exiting: 'exit',
  exited: 'exit',
} as const
export function getSimpleStatus(status: Stage) {
  return simpleStatusMap[status]
}

export function getEndStatus(status: STATUS) {
  switch (status) {
    case STATUS.entering:
    case STATUS.from:
      return STATUS.entered

    case STATUS.exiting:
      return STATUS.exited
  }
}
