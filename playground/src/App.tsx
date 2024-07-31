import { useState } from 'react'
import { useListTransition } from 'transition-hooks'
// import { startViewTransition } from 'transition-hooks/viewTransition'

export function App() {
  const [list, setList] = useState([
    { id: 1, text: '1' },
    { id: 2, text: '2' },
  ])

  const { transitionList } = useListTransition(list, {
    timeout: 1000,
    keyExtractor: i => i.id,
  })

  const updateLastItem = () => {
    const newList = [...list]
    newList[newList.length - 2] = {
      id: newList[newList.length - 2].id,
      text: `${newList[newList.length - 2].text}test`,
    }
    setList(newList)
  }

  const addItem = () => {
    setList(l => [...l, { id: l.length + 1, text: (l.length + 1).toString() }])
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        <button onClick={addItem}>add</button>
        <button onClick={updateLastItem}>update last item</button>
      </div>
      <ul>
        {transitionList((item, { key, simpleStatus }) => {
          return (
            <li
              style={{
                position: simpleStatus === 'exit' ? 'absolute' : 'relative',
                opacity: simpleStatus === 'enter' ? 1 : 0,
                transform:
                  simpleStatus === 'enter'
                    ? 'translateX(0)'
                    : 'translateX(20px)',
                transition: 'all .6s',
                // viewTransitionName: simpleStatus === 'enter' ? `transition-list-${key}` : '',
              }}
            >
              - {item.text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
