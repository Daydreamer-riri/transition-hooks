import { useRef, useState } from 'react'
import { useListTransition } from 'transition-hooks'
import { Button } from '../Button'

const numbers = Array.from({ length: 5 }, (_, i) => i)
export function BasicUseListTransition() {
  const [list, setList] = useState(numbers)
  const idRef = useRef(numbers.at(-1)! + 1)
  const transition = useListTransition(list)

  return (
    <div>
      <Button onClick={insert}>insert</Button>
      <Button onClick={remove}>remove</Button>
      <ul>
        {transition((item, { status }) => {
          // console.log('🚀 ~ {transition ~ item:', item)
          return (
            <li key={item}>{item}</li>
          )
        })}
      </ul>
    </div>
  )
  function insert() {
    const i = Math.round(Math.random() * list.length)
    setList([...list].splice(i, 0, idRef.current++))
  }
  function remove() {
    const i = Math.round(Math.random() * list.length - 1)

    setList([...list].splice(i, 1))
  }
}
