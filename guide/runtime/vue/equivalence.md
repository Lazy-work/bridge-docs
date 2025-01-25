---
outline: deep
---

# Equivalence

From React to Unison framework

| React                    |                                    Unison                                     |
| ------------------------ | :---------------------------------------------------------------------------: |
| `useState()`             |                           `ref()` / ~ `reactive()`                            |
| `useDebugValue()`        |                              Not implemented yet                              |
| `useMemo()`              |                                 `computed()`                                  |
| `useDeferredValue()`     |                              Not implemented yet                              |
| `useRef()`               |                                 `reactRef()`                                  |
| `useEffect()`            | `watch()` - flush: post / `watchEffect()` - flush: post / `watchPostEffect()` |
| `useId()`                |                              Not implemented yet                              |
| `useImperativeHandle()`  |                              Not implemented yet                              |
| `useInsertionEffect()`   |                           `watchInsertionEffect()`                            |
| `useLayoutEffect()`      |                             `watchLayoutEffect()`                             |
| `useReducer()`           |                              Not implemented yet                              |
| `useActionState()`       |                              Not implemented yet                              |
| `useOptimistic()`        |                              Not implemented yet                              |
| `useCallback()`          |                                  Not needed                                   |
| `useContext()`           |                              Not implemented yet                              |
| `useTransition()`        |                              Not implemented yet                              |
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
