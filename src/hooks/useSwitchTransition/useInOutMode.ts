import { useEffect, useRef, useState } from 'react'
import { STATUS, getState } from '../../status'
import type { Canceller } from '../../helpers/setAnimationFrameTimeout'
import { clearAnimationFrameTimeout, immediateExecution, nextTick, setAnimationFrameTimeout } from '../../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../../helpers/getTimeout'
import type { ModeHookParam } from './index'

export function useInOutMode<S>({
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
  const enteredRef = useRef<Canceller>({})
  const allTimers = useState(() => new Set<Canceller>())[0]

  const nextTickOrNow = from ? nextTick : immediateExecution

  useEffect(() => () => {
    clearAnimationFrameTimeout(enteredRef.current)
    allTimers.forEach(clearAnimationFrameTimeout)
  }, [])

  if (mode !== 'in-out')
    return

  if (!hasChanged)
    return

  const [lastItem] = list.slice(-1)
  if (!(lastItem.state !== state && lastItem?.isEnter))
    return

  const prevKey = keyRef.current
  keyRef.current++
  setList(prev =>
    prev.concat({ state, key: keyRef.current, ...getState(STATUS.from), prevState: lastItem.state }),
  )
  const curKey = keyRef.current
  nextTickOrNow(() => {
    setList(list => list.map(item => item.key === curKey ? { ...item, ...getState(STATUS.entering) } : item))
  })

  const startExitTimer = setAnimationFrameTimeout(() => {
    setList(list => list.map(item => item.key === prevKey ? { ...item, ...getState(STATUS.exiting), prevState: undefined, nextState: state } : item))
    allTimers.delete(startExitTimer)
    if (!entered)
      return
    setList(list => list.map(item => (item.key === curKey && item.status === 'entering') ? { ...item, ...getState(STATUS.entered) } : item))
  }, enterTimeout)
  allTimers.add(startExitTimer)

  const endExitTimer = setAnimationFrameTimeout(() => {
    setList(list => list.filter(item => item.key !== prevKey))
    allTimers.delete(endExitTimer)
  }, exitTimeout + enterTimeout)
  allTimers.add(endExitTimer)
}
