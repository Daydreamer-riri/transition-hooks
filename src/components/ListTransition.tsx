import type { ListRenderCallback, ListTransitionOptions } from '../hooks/useListTransition'
import { useListTransition } from '../hooks/useListTransition'

interface SwitchTransitionProps<T> {
  list: T[]
  transitionOptions?: ListTransitionOptions<T>
  children: ListRenderCallback<T>
}

export function SwitchTransition<T>(props: SwitchTransitionProps<T>) {
  const { transitionList } = useListTransition(props.list, props.transitionOptions)

  return transitionList(props.children)
}
