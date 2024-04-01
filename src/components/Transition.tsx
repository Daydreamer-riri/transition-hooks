import { useTransition } from '../hooks/useTransition'
import type { StatusState } from '../status'
import type { TransitionOptions } from '../types'

interface TransitionProps {
  state: boolean
  transitionOptions?: TransitionOptions
  children: (statusState: StatusState) => React.ReactNode
}

export function Transition(props: TransitionProps) {
  const statusState = useTransition(props.state, props.transitionOptions)

  return props.children(statusState)
}
