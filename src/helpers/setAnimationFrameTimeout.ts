export interface Canceller {
  id?: number
}

export function setAnimationFrameTimeout(
  callback: () => void,
  timeout: number = 0,
) {
  const startTime = performance.now()
  const canceller: Canceller = {}

  function call() {
    canceller.id = requestAnimationFrame(now => {
      if (now - startTime > timeout)
        callback()
      else
        call()
    })
  }

  call()
  return canceller
}

export function clearAnimationFrameTimeout(canceller: Canceller) {
  if (canceller.id)
    cancelAnimationFrame(canceller.id)
}

const isBrowser = typeof document !== 'undefined'

export function nextTick(callback: () => unknown) {
  if (!isBrowser)
    return setAnimationFrameTimeout(callback, 0)

  return setTimeout(() => {
    // Reading document.body.offsetTop can force browser to repaint before transition to the next state
    Number.isNaN(document.body.offsetTop) || callback()
  }, 0)
}
