import type { SwitchRenderCallback, SwitchTransitionOptions } from '../hooks/useSwitchTransition'
import { useSwitchTransition } from '../hooks/useSwitchTransition'

interface SwitchTransitionProps<T> {
  state: T
  transitionOptions?: SwitchTransitionOptions
  children: SwitchRenderCallback<T>
}

export function SwitchTransition<T>(props: SwitchTransitionProps<T>) {
  const { transition } = useSwitchTransition(props.state, props.transitionOptions)

  return transition(props.children)
}
