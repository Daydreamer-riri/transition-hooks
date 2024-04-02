import { useState } from 'react'
import { Transition } from 'transition-hooks'

export function App() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Transition state={show}>
        {({ status, shouldMount }) => {
          return shouldMount
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
            : null
        }}
      </Transition>
      <button onClick={() => setShow(!show)}>toggle</button>
    </div>
  )
}
