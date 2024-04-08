# transition-hooks

[![NPM version][npm-version-src]][npm-version-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Extremely light-weight react transition hooks which is simpler and easier to use than react-transition-group.

## Features

- State-driven, supports react-dom and react-native
- Hooks style, easy to use
- Tiny: ~1KB each hook and no dependencies
- Support view transition for list transition

## Documentation

See [Documentation](https://transition-hooks.netlify.app/).

Awesome documentation station is under construction!

## Usage

### useTransition

```tsx
function Demo() {
  const [show, setShow] = useState(false)
  const { status, shouldMount } = useTransition(show)

  return shouldMount
    ? (
      <div
        style={{
          transition: 'opacity 0.3s',
          opacity: (status === 'entering' || status === 'entered')
            ? 1
            : 0,
        }}
      >
        Hello Word
      </div>
      )
    : null
}
```

### useSwitchTransition

```tsx
function Demo() {
  const [count, setCount] = useState(0)
  const { transition } = useSwitchTransition(count, { mode: 'default' })

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>add</button>
      {transition((count, { simpleStatus }) => (
        <p style={{
          transition: '.3s',
          opacity: simpleStatus === 'enter' ? 1 : 0,
          transform: {
            from: 'translateX(-100%)',
            enter: 'translateX(0%)',
            exit: 'translateX(100%)',
          }[simpleStatus]
        }}
        >{count}
        </p>
      ))}
    </div>
  )
}
```

### useListTransition

```tsx
function Demo() {
  const [list, setList] = useState(numbers)
  const { transitionList } = useListTransition(list)

  return (
    <div>
      <ul>
        {transitionList((item, { simpleStatus }) => {
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
    </div>
  )
}
```

### `StatusState`

```ts
interface StatusState {
  status: 'entered' | 'from' | 'entering' | 'exiting' | 'exited'
  simpleStatus: 'from' | 'enter' | 'exit'
  shouldMount: boolean
  isEnter: boolean
  notExit: boolean
  isResolved: boolean
}
```

See the documentation(https://transition-hooks.netlify.app/) for more usage.

## Credits

All credit goes to [iamyoki](https://github.com/iamyoki) for initiating [transition-hook](https://github.com/iamyoki/transition-hook), but the project is not currently active and does not support react18.

## License

[MIT](./LICENSE) License © 2023 [Riri](https://github.com/Daydreamer-riri)

[npm-version-src]: https://img.shields.io/npm/v/transition-hooks?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://www.npmjs.com/package/transition-hooks
[bundle-src]: https://img.shields.io/bundlephobia/minzip/transition-hooks?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=transition-hooks
[license-src]: https://img.shields.io/github/license/daydreamer-riri/transition-hooks.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/daydreamer-riri/transition-hooks/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/transition-hooks
