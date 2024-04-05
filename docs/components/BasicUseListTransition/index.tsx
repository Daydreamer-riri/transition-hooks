import { useRef, useState } from 'react'
import { getSimpleStatus, useListTransition } from 'transition-hooks'
import { Button } from '../Button'
import { shuffle } from '../utils'

const numbers = Array.from({ length: 5 }, (_, i) => i)
export function BasicUseListTransition() {
  const [list, setList] = useState(numbers)
  const idRef = useRef(numbers.length)
  const { transitionList } = useListTransition(list, { entered: false, timeout: 300, keyExtractor: i => i })

  return (
    <div>
      <div style={{ display: 'flex', gap: 4 }}>
        <Button onClick={insert}>insert</Button>
        <Button onClick={remove}>remove</Button>
        <Button onClick={() => setList(shuffle)}>shuffle</Button>
      </div>
      <ul>
        {transitionList((item, { status }) => {
          const simpleStatus = getSimpleStatus(status)
          return (
            <li
              style={{
                opacity: simpleStatus === 'enter' ? 1 : 0,
                transform: simpleStatus === 'enter' ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 300ms',
              }}
            >
              - {item}
            </li>
          )
        })}
      </ul>
      {}
    </div>
  )
  function insert() {
    const i = Math.round(Math.random() * list.length)
    const newList = [...list]
    newList.splice(i, 0, idRef.current++)
    setList(newList)
  }
  function remove() {
    const i = Math.round(Math.random() * list.length - 1)
    const newList = [...list]
    newList.splice(i, 1)
    setList(newList)
  }
}
