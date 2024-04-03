import { useState } from 'react'
import { useSwitchTransition } from 'transition-hooks'
import { Button } from '../Button'

const modes = ['default', 'out-in', 'in-out']
const texts = ['Apple', 'Banana', 'Orange']
export function BasicUseSwitchTransition() {
  const [mode, setMode] = useState<'default' | 'out-in' | 'in-out'>('default')
  const [count, setCount] = useState(0)
  const text = texts[count % texts.length]
  const { transition } = useSwitchTransition(text, { mode })

  return (
    <div>
      <div style={{ position: 'relative', height: 36 }}>
        {transition((text, { isEnter, status }) => (
          <Button
            onClick={() => setCount(count + 1)}
            style={{
              transition: 'all 0.3s',
              opacity: isEnter ? 1 : 0,
              transform: `translateY(${isEnter
              ? 0
              : status === 'from' ? 30 : -30
              }px)`,
              position: 'absolute',
            }}
          >{text}
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
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
    </div>
  )
}
