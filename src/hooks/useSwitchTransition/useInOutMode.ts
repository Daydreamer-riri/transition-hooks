import { useEffect, useRef } from 'react'
import { STATUS, getState } from '../../status'
import type { Canceller } from '../../helpers/setAnimationFrameTimeout'
import { clearAnimationFrameTimeout, setAnimationFrameTimeout } from '../../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../../helpers/getTimeout'
import type { ModeHookParam } from './index'

export function useInOutMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
}: ModeHookParam<S>) {
  const { enterTimeout, exitTimeout } = getTimeout(timeout)
  const timerRef = useRef<Canceller>({})
  const timerRef2 = useRef<Canceller>({})
  const timerRef3 = useRef<Canceller>({})

  useEffect(() => {
    // skip unmatched mode 🚫
    if (mode !== 'in-out')
      return

    const [lastItem, secondLastItem] = [...list].reverse()
    // if state has changed && stage is enter (add new item)
    if (lastItem.state !== state && lastItem?.isEnter) {
      // 1 add new item with stage 'from'
      keyRef.current++
      setList(prev =>
        prev.slice(-1).concat({ state, key: keyRef.current, ...getState(STATUS.from), prevState: lastItem.state }),
      )
    }

    // if state hasn't changed && stage is from (enter that new item)
    if (lastItem.state === state && lastItem.status === 'from') {
      // 2 set that new item's stage to 'enter' immediately
      setAnimationFrameTimeout(() => {
        setList([secondLastItem, { ...lastItem, ...getState(STATUS.entering) }])
      })
      clearAnimationFrameTimeout(timerRef3.current)
      timerRef3.current = setAnimationFrameTimeout(() => {
        setList([secondLastItem, { ...lastItem, ...getState(STATUS.entered) }])
      }, enterTimeout)
    }

    // if state hasn't changed
    // && stage is enter
    // && second last item exist
    // && second last item enter
    // (leave second last item)
    if (
      lastItem.state === state
      && lastItem?.isEnter
      && secondLastItem?.isEnter
    ) {
      // 3 leave second last item after new item enter animation ends
      clearAnimationFrameTimeout(timerRef.current)
      timerRef.current = setAnimationFrameTimeout(() => {
        setList([{ ...secondLastItem, ...getState(STATUS.exiting) }, lastItem])
      }, enterTimeout)
    }

    // if second last item exist
    // && second last item is enter
    // (unmount second last item)
    if (secondLastItem?.status === 'exiting') {
      // 4 unmount second last item after it's leave animation ends
      clearAnimationFrameTimeout(timerRef2.current)
      timerRef2.current = setAnimationFrameTimeout(() => {
        setList(prev => prev.filter(item => item.key !== secondLastItem.key))
      }, exitTimeout)
    }
  }, [keyRef, list, mode, setList, state, enterTimeout, exitTimeout])

  useEffect(() => () => {
    clearAnimationFrameTimeout(timerRef.current)
    clearAnimationFrameTimeout(timerRef2.current)
    clearAnimationFrameTimeout(timerRef3.current)
  }, [])
}
