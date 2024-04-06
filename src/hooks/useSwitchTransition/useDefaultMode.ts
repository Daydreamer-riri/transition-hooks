import { useEffect, useState } from 'react'
import { STATUS, getState } from '../../status'
import { nextTick } from '../../helpers/setAnimationFrameTimeout'
import { getTimeout } from '../../helpers/getTimeout'
import type { ListItem, ModeHookParam } from './index'

export function useDefaultMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
}: ModeHookParam<S>) {
  const { enterTimeout, exitTimeout } = getTimeout(timeout)
  const timeoutIdMap = useState(() => new Map<number, number>())[0]
  useEffect(() => {
    // skip unmatched mode 🚫
    if (mode !== undefined && mode !== 'default')
      return

    const [lastItem] = list.slice(-1)
    if (lastItem.state === state)
      return

    // 0 update key
    const prevKey = keyRef.current // save prev key
    keyRef.current++ // update to last item key
    const curKey = keyRef.current // save cur key (for async gets)

    // 1 add new item immediately with stage 'from'
    setList(prev => prev.concat({ state, prevState: lastItem.state, key: curKey, ...getState(STATUS.from) }))

    // 1.1 change this item immediately with stage 'entering'
    const isCurItem = (item: ListItem<S>) => item.key === curKey
    nextTick(() => {
      setList(prev =>
        prev.map(item => (isCurItem(item) ? { ...item, ...getState(STATUS.entering) } : item)),
      )
      const id = window.setTimeout(() => {
        setList(prev =>
          prev.map(item => (isCurItem(item) ? { ...item, ...getState(STATUS.entered) } : item)),
        )
        timeoutIdMap.delete(curKey)
      }, enterTimeout)
      timeoutIdMap.set(curKey, id)
    })

    // 1.2 leave prev item immediately with stage 'exiting'
    const shouldItemLeave = (item: ListItem<S>) => item.key === prevKey
    setList(prev =>
      prev.map(item => {
        if (!shouldItemLeave(item))
          return item

        const id = timeoutIdMap.get(item.key)
        if (id) {
          clearTimeout(id)
          timeoutIdMap.delete(item.key)
        }

        return { ...item, nextState: state, ...getState(STATUS.exiting) }
      },
      ),
    )

    // 2 unmount leaved item after timeout
    const shouldUnmountItem = (item: ListItem<S>) => item.key !== prevKey
    setTimeout(() => {
      setList(prev => prev.filter(shouldUnmountItem))
    }, exitTimeout)
  }, [keyRef, list, mode, setList, state, enterTimeout, exitTimeout])
}
