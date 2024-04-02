import { useEffect, useRef, useState } from 'react'
import type {
  Canceller,
} from '../helpers/setAnimationFrameTimeout'
import {
  clearAnimationFrameTimeout,
  setAnimationFrameTimeout,
} from '../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../helpers/getTimeout'
import type { StatusState } from '../status'
import { STATUS, getEndStatus, getState } from '../status'
import type { Stage, TransitionOptions } from '../types'
import useMemoizedFn from '../helpers/useMemorizeFn'
import { useLatest } from '../helpers/useLatest'

export function useTransition(state: boolean, transitionOptions?: TransitionOptions) {
  const {
    timeout = 300,
    onStatusChange,
    enter = true,
    exit = true,
    preEnter = true,
    preExit = false,
  } = transitionOptions ?? {}
  const [statusState, setState] = useState(() =>
    getState(state ? STATUS.entered : STATUS.exited),
  )

  const latestStageRef = useLatest(statusState)

  const { enterTimeout, exitTimeout } = getTimeout(timeout)
  const timer = useRef<Canceller>({})

  const updateState = useMemoizedFn((status: STATUS) => {
    clearAnimationFrameTimeout(timer.current)
    const state = getState(status)
    setState(state)
    onStatusChange?.(STATUS[status] as Stage)
  })

  const endTransition = useMemoizedFn(() => {
    const status = getEndStatus(latestStageRef.current._s)
    status && updateState(status)
  })

  const doTransition = useMemoizedFn((to: boolean) => {
    const transitState = (status: STATUS) => {
      updateState(status)
      switch (status) {
        case STATUS.entering:
          if (enterTimeout >= 0)
            timer.current = setAnimationFrameTimeout(endTransition, enterTimeout)
          break

        case STATUS.exiting:
          if (exitTimeout >= 0)
            timer.current = setAnimationFrameTimeout(endTransition, exitTimeout)
          break

        case STATUS.preEnter:
        case STATUS.preExit:
          timer.current = setAnimationFrameTimeout(() => transitState(status + 1))
          break
      }
    }
    const enterStage = latestStageRef.current.isEnter

    if (to) {
      !enterStage && transitState(enter ? (preEnter ? STATUS.preEnter : STATUS.entering) : STATUS.entered)
    }
    else {
      enterStage
      && transitState(exit ? (preExit ? STATUS.preExit : STATUS.exiting) : STATUS.exited)
    }
  })

  if (state !== latestStageRef.current.isEnter)
    doTransition(state)

  useEffect(() =>
    () => clearAnimationFrameTimeout(timer.current), [])

  return statusState as StatusState
}
