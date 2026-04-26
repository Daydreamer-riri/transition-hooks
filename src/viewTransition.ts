import { flushSync } from 'react-dom'

const isClient = typeof window !== 'undefined'
const isSupportViewTransition = isClient && 'startViewTransition' in document

type DocumentWithViewTransition = Document & {
  startViewTransition: (fn: () => void) => void
}

export function startViewTransition(fn: () => void) {
  if (isSupportViewTransition) {
    (document as DocumentWithViewTransition).startViewTransition(() => flushSync(fn))
  }
  else {
    fn()
  }
}
