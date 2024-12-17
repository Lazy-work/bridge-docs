---
outline: deep
---

# Equivalence

From React to Bridge library

| React                    |                                 Bridge lib                                  |
| ------------------------ | :---------------------------------------------------------------------------: |
| `useState()`             |                           `ref()` / ~ `reactive()`                            |
| `useDebugValue()`        |                              Not implemented yet                              |
| `useMemo()`              |                                 `computed()`                                  |
| `useDeferredValue()`     |                               `deferredValue()`                               |
| `useRef()`               |                                 `reactRef()`                                  |
| `useEffect()`            | `watch()` - flush: post / `watchEffect()` - flush: post / `watchPostEffect()` |
| `useId()`                |                                 `createId()`                                  |
| `useImperativeHandle()`  |                              Not implemented yet                              |
| `useInsertionEffect()`   |                              `insertionEffect()`                              |
| `useLayoutEffect()`      |                               `layoutEffect()`                                |
| `useReducer()`           |                                  `reducer()`                                  |
| `useActionState()`       |                              Not implemented yet                              |
| `useOptimistic()`        |                              Not implemented yet                              |
| `useCallback()`          |                                  Not needed                                   |
| `useContext()`           |                                  `context()`                                  |
| `useTransition()`        |                                `transition()`                                 |
| `useSyncExternalStore()` |                              Not implemented yet                              |

From Vue to React

| Vue                           |                React                |
| ----------------------------- | :---------------------------------: |
| `ref()`                       |            `useState()`             |
| `reactive()`                  |         No real equivalent          |
| `readonly()`                  |            No equivalent            |
| `computed()`                  |             `useMemo()`             |
| `watch()` - flush: pre        | Component’s body (before rendering) |
| `watch()` - flush: post       |   `useEffect()` (after rendering)   |
| `watch()` - flush: sync       |      Right after state setting      |
| `watchEffect()` - flush: pre  | Component’s body (before rendering) |
| `watchEffect()` - flush: post |   `useEffect()` (after rendering)   |
| `watchEffect()` - flush: sync |      Right after state setting      |
| `watchPostEffect()`           |   `useEffect()` (after rendering)   |
| `watchSyncEffect()`           |      Right after state setting      |
