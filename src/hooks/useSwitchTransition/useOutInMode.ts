import { useEffect, useRef, useState } from 'react'
import { STATUS, getState } from '../../status'
import type { Canceller } from '../../helpers/setAnimationFrameTimeout'
import { clearAnimationFrameTimeout, immediateExecution, nextTick, setAnimationFrameTimeout } from '../../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../../helpers/getTimeout'
import type { ModeHookParam } from './index'

export function useOutInMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
  hasChanged,
  from,
  entered,
}: ModeHookParam<S>) {
  const { enterTimeout, exitTimeout } = getTimeout(timeout)
  const startEnterTimerRef = useRef<Canceller>({})
  const endEnterTimerRef = useRef<Canceller>({})
  const allTimers = useState(() => new Set<Canceller>())[0]
  const nextTickOrNow = from ? nextTick : immediateExecution

  const lastStateRef = useRef<S>()

  useEffect(() => () => {
    clearAnimationFrameTimeout(startEnterTimerRef.current)
  }, [])

  if (mode !== 'out-in')
    return

  if (!hasChanged)
    return

  const [lastItem] = list.slice(-1)
  if (lastItem !== undefined)
    lastStateRef.current = lastItem.state

  if (lastItem?.state !== state) {
    if (lastItem?.notExit) {
      setList(list => list.map(item => item.key === lastItem.key ? { ...lastItem, ...getState(STATUS.exiting), nextState: state, prevState: undefined } : item))
      const endExitTimer = setAnimationFrameTimeout(() => {
        setList(list => list.filter(item => item.key !== lastItem.key))
        allTimers.delete(endExitTimer)
      }, exitTimeout)
      allTimers.add(endExitTimer)
    }

    keyRef.current++
    const curKey = keyRef.current
    clearAnimationFrameTimeout(startEnterTimerRef.current)
    clearAnimationFrameTimeout(endEnterTimerRef.current)
    startEnterTimerRef.current = setAnimationFrameTimeout(() => {
      setList(list => list.concat({ state, key: keyRef.current, ...getState(STATUS.from), prevState: lastStateRef.current }))
      nextTickOrNow(() => {
        setList(list => list.map(item => item.key === curKey ? { ...item, ...getState(STATUS.entering) } : item))
      })
      if (!entered)
        return
      endEnterTimerRef.current = setAnimationFrameTimeout(() => {
        setList(list => list.map(item => item.key === curKey ? { ...item, ...getState(STATUS.entered) } : item))
      }, enterTimeout)
    }, exitTimeout)
  }
}
