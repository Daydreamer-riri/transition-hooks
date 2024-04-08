import type { ListRenderCallback, ListTransitionOptions } from '../hooks/useListTransition'
import { useListTransition } from '../hooks/useListTransition'

interface ListTransitionProps<T> {
  list: T[]
  transitionOptions?: ListTransitionOptions<T>
  children: ListRenderCallback<T>
}

export function ListTransition<T>(props: ListTransitionProps<T>) {
  const { transitionList } = useListTransition(props.list, props.transitionOptions)

  return <>{transitionList(props.children)}</>
}
