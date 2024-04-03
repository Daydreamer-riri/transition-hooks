import { useState } from 'react'
import { useSwitchTransition } from 'transition-hooks'
import { Button } from '../Button'

const modes = ['default', 'out-in', 'in-out']

export function BasicUseSwitchTransition() {
  const [mode, setMode] = useState<'default' | 'out-in' | 'in-out'>('default')
  const [count, setCount] = useState(0)
  const { transition } = useSwitchTransition(count, { mode })

  return (
    <div className="BasicSwitchTransition" style={{ paddingBlock: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <p>Select mode:</p>
        {modes.map(m => (
          <label key={m}>
            {m}
            <input
              type="radio"
              name="mode"
              value={m}
              checked={m === mode}
              style={{ marginLeft: 2 }}
              onChange={() => setMode(m as any)}
            />
          </label>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          marginTop: 50,
        }}
      >
        <Button onClick={() => setCount(count - 1)}>
          -
        </Button>
        <div
          style={{
            width: 150,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {transition((state, { status, prevState, nextState }) => {
            const enterDirection = prevState !== undefined ? state > prevState : false
            const exitDirection = nextState !== undefined ? state > nextState : false
            return (
              <span
                style={{
                  fontSize: '5em',
                  position: 'absolute',
                  transition: '.3s',
                  opacity: ['entered', 'entering'].includes(status) ? 1 : 0,
                  transform: ({
                    preEnter: `translateY(${enterDirection ? '-' : ''}150%) scale(.5)`,
                    entering: 'translateY(0%)',
                    exiting: `translateY(${exitDirection ? '-' : ''}150%) scale(.5)`,
                  })[status as 'preEnter' | 'entering' | 'exiting'] ?? '',
                }}
              >
                {state}
              </span>
            )
          })}
        </div>
        <Button onClick={() => setCount(count + 1)}>
          +
        </Button>
      </div>
    </div>
  )
}
