import type { ListRenderCallback, ListTransitionOptions } from '../hooks/useListTransition'
import { useListTransition } from '../hooks/useListTransition'

interface ListTransitionProps<T> {
  list: T[]
  transitionOptions?: ListTransitionOptions<T>
  children: ListRenderCallback<T>
}

export function ListTransition<T>(props: ListTransitionProps<T>) {
  const { list, transitionOptions, children } = props
  const { transitionList } = useListTransition(list, transitionOptions)

  return <>{transitionList(children)}</>
}
