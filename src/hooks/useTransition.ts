import { useEffect, useRef, useState } from 'react'
import type {
  Canceller,
} from '../helpers/setAnimationFrameTimeout'
import {
  clearAnimationFrameTimeout,
  setAnimationFrameTimeout,
} from '../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../helpers/getTimeout'
import type { Stage, StatusState } from '../status'
import { STATUS, getEndStatus, getState } from '../status'
import type { TransitionOptions } from '../types'
import useMemoizedFn from '../helpers/useMemorizeFn'
import { useLatest } from '../helpers/useLatest'

export function useTransition(state: boolean, transitionOptions?: TransitionOptions) {
  const {
    timeout = 300,
    onStatusChange,
    from = true,
    initialEntered = false,
  } = transitionOptions ?? {}
  const [statusState, setState] = useState(() =>
    getState(state ? (initialEntered ? STATUS.from : STATUS.entered) : STATUS.exited),
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
    if (status) {
      updateState(status)
    }
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

        case STATUS.from:
          timer.current = setAnimationFrameTimeout(() => transitState(status + 1))
          break
      }
    }
    const enterStage = latestStageRef.current.notExit

    if (to) {
      const _ = !enterStage
        && transitState(from ? STATUS.from : STATUS.entering)
    }
    else {
      const _ = enterStage
        && transitState(STATUS.exiting)
    }
  })

  if (state !== latestStageRef.current.notExit)
    doTransition(state)

  useEffect(() => {
    if (state === latestStageRef.current.notExit && statusState._s === STATUS.from) {
      setState(getState(STATUS.entering))
      timer.current = setAnimationFrameTimeout(endTransition, enterTimeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() =>
    () => clearAnimationFrameTimeout(timer.current), [])

  return statusState as StatusState
}
