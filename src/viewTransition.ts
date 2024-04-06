import { flushSync } from 'react-dom'

const isClient = typeof window !== 'undefined'
const isSupportViewTransition = isClient && 'startViewTransition' in document

export function startViewTransition(fn: () => void) {
  if (isSupportViewTransition) {
    // @ts-expect-error startViewTransition is not in the type definition
    document.startViewTransition(() => flushSync(fn))
  }
  else {
    fn()
  }
}
