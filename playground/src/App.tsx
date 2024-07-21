import { useState } from 'react'
import { SwitchTransition } from 'transition-hooks'

export function App() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <SwitchTransition state={show}>
        {(state, { status }) => {
          return (
            <div
              style={{
                transition: 'opacity 0.3s',
                opacity: status === 'entering' || status === 'entered' ? 1 : 0,
              }}
            >
              Hello Word {state ? 'true' : 'false'}
            </div>
          )
        }}
      </SwitchTransition>
      <button onClick={() => setShow(!show)}>toggle</button>
    </div>
  )
}
