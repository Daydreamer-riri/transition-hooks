import { useState } from 'react'
import { useTransition } from 'transition-hooks'
import { Button } from '../Button'

export function BasicUseTransition() {
  const [show, setShow] = useState(true)
  const { status, shouldMount } = useTransition(show, { initialEntered: true })

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
