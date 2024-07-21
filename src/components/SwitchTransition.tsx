import type { SwitchRenderCallback, SwitchTransitionOptions } from '../hooks/useSwitchTransition'
import { useSwitchTransition } from '../hooks/useSwitchTransition'

interface SwitchTransitionProps<T> {
  state: T
  transitionOptions?: SwitchTransitionOptions
  children: SwitchRenderCallback<T>
}

export function SwitchTransition<T>(props: SwitchTransitionProps<T>) {
  const { state, transitionOptions, children } = props
  const { transition } = useSwitchTransition(state, transitionOptions)

  return <>{transition(children)}</>
}
