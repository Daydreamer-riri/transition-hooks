import { useEffect, useRef } from 'react'
import type { ModeHookParam } from '../../types'
import { STATUS, getState } from '../../status'
import type { Canceller } from '../../helpers/setAnimationFrameTimeout'
import { clearAnimationFrameTimeout, setAnimationFrameTimeout } from '../../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../../helpers/getTimeout'

export function useOutInMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
}: ModeHookParam<S>) {
  const { enterTimeout, exitTimeout } = getTimeout(timeout)
  const timerRef = useRef<Canceller>({})

  useEffect(() => {
    // skip unmatched mode 🚫
    if (mode !== 'out-in')
      return

    const [lastItem] = list.slice(-1)

    // if state has changed && stage is enter (trigger prev last item to leave)
    if (lastItem.state !== state && lastItem.isEnter) {
      // 1 leave prev last item
      setList([{ ...lastItem, ...getState(STATUS.exiting), nextState: state }])
    }

    // if state has changed && stage is leave (add new item after prev last item leave ani ends)
    if (lastItem.state !== state && !lastItem.notExit) {
      // 2 add new item after prev last item leave animation ends
      clearAnimationFrameTimeout(timerRef.current)
      timerRef.current = setAnimationFrameTimeout(() => {
        keyRef.current++
        setList([{ state, key: keyRef.current, ...getState(STATUS.from), prevState: lastItem.state }])
      }, exitTimeout)
    }

    // if state hasn't change && stage is from
    if (lastItem.state === state && lastItem.status === 'from') {
      // 3 change that new item's stage to 'enter' immediately
      setAnimationFrameTimeout(() => {
        setList(prev => [{ ...prev[0], ...getState(STATUS.entering) }])
      })
      clearAnimationFrameTimeout(timerRef.current)
      timerRef.current = setAnimationFrameTimeout(() => {
        setList(prev => [{ ...prev[0], ...getState(STATUS.entered) }])
      }, enterTimeout)
    }

    return () => {
      clearAnimationFrameTimeout(timerRef.current)
    }
  }, [keyRef, list, mode, setList, state, enterTimeout, exitTimeout])
}
