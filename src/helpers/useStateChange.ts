import { useRef } from 'react'

export function useStateChange<S>(state: S) {
  const curRef = useRef(state)
  const hasChanged = curRef.current !== state
  curRef.current = state
  return hasChanged
}
