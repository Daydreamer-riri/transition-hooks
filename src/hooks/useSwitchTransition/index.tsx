import React, { Fragment, useRef, useState } from 'react'
import type { TransitionOptions } from '../../types'
import type { StatusState } from '../../status'
import { STATUS, getState } from '../../status'
import type { Timeout } from '../../helpers/getTimeout'
import { useDefaultMode } from './useDefaultMode'
import { useOutInMode } from './useOutInMode'
import { useInOutMode } from './useInOutMode'

export type SwitchTransitionOptions = Omit<TransitionOptions, 'onStatusChange' | 'from' | 'enter' | 'exit' | 'initialEntered'> & { mode?: Mode }

export type Mode = 'default' | 'out-in' | 'in-out'
export interface ModeHookParam<S> {
  state: S
  timeout: Timeout
  mode?: Mode
  keyRef: React.MutableRefObject<number>
  list: ListItem<S>[]
  setList: React.Dispatch<React.SetStateAction<ListItem<S>[]>>
}

export type SwitchRenderCallback<S> = (state: S, statusState: StatusState & { prevState?: S, nextState?: S }) => React.ReactNode

export type ListItem<S> = {
  state: S
  key: number
} & {
  prevState?: S
  nextState?: S
} & StatusState

export function useSwitchTransition<S>(state: S, options?: SwitchTransitionOptions) {
  const {
    timeout = 300,
    mode = 'default',
  } = options || {}

  const keyRef = useRef(0)
  const firstDefaultItem: ListItem<S> = {
    state,
    key: keyRef.current,
    ...getState(STATUS.entered),
  }
  const [list, setList] = useState([firstDefaultItem])

  // for default mode only
  useDefaultMode({ state, timeout, keyRef, mode, list, setList })

  // for out-in mode only
  useOutInMode({ state, timeout, keyRef, mode, list, setList })

  // for in-out mode only
  useInOutMode({ state, timeout, keyRef, mode, list, setList })

  const isResolved = list.every(item => item.isResolved)

  function transition(renderCallback: SwitchRenderCallback<S>) {
    return list.map(item => (
      <Fragment key={item.key}>
        { renderCallback(item.state, item)}
      </Fragment>
    ))
  }

  return { transition, isResolved }
}
