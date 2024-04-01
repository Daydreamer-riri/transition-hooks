export type Timeout = number | { enter: number, exit: number }

export function getTimeout(timeout: number | { enter: number, exit: number }) {
  return typeof timeout === 'object'
    ? { enterTimeout: timeout.enter, exitTimeout: timeout.exit }
    : { enterTimeout: timeout, exitTimeout: timeout }
}
