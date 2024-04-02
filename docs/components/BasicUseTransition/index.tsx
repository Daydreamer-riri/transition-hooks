import { useState } from 'react'
import { useTransition } from 'transition-hooks'
import { Button } from '../Button'

export function BasicUseTransition() {
  const [show, setShow] = useState(false)
  const { status, shouldMount } = useTransition(show)

  return (
    <div>
      {shouldMount
        ? (
          <div
            style={{
              transition: 'opacity 0.3s',
              opacity: status === 'entering' || status === 'entered' ? 1 : 0,
            }}
          >
            Hello Word
          </div>
          )
        : null}
      <Button onClick={() => setShow(!show)}>toggle</Button>
      <p>status: { status }</p>
    </div>
  )
}
