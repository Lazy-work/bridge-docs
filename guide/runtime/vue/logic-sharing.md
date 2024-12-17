---
outline: deep
---

# Logic sharing

## Compasables

In React, we have hooks, and in Vue (or a reactive context), we have composables. The concept is similar to hooks.

```js
// compasables.js
import { ref, watchPostEffect } from '@bridge/vue';

export function useOnlineStatus() {
 const isOnline = ref(true);

 function handleOnline() {
   isOnline.value = true;
 }
 function handleOffline() {
   isOnline.value = false;
 }

 watchPostEffect((onCleanup) => {
   window.addEventListener('online', handleOnline);
   window.addEventListener('offline', handleOffline);

   onCleanup(() => {
     window.removeEventListener('online', handleOnline);
     window.removeEventListener('offline', handleOffline);
   });
 });
 return isOnline;
}
```

```jsx
// StatusBar.jsx
import { $bridge } from '@bridge/vue';
import { useOnlineStatus } from './compasables';

const StatusBar = $bridge(() => {
  const isOnline = useOnlineStatus();
  
  return () => <h1>{isOnline.value ? '✅ Online' : '❌ Disconnected'}</h1>;
});

export default StatusBar;
```

## Global state

Vue allows you to declare state outside of a component, making it possible to create a shared store. In reactive-vue, you can do the same.

Using `ref`

```js
// store.js
import { ref } from '@bridge/vue'

const count = ref(0);

export const store = {
  get count() {
    return count.value
  },
  increment() {
    count.value++
  }
}
```

Using `reactive`

```js
// store.js
import { reactive } from '@bridge/vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

Consuming the shared store

```jsx
// shared-counter.jsx
import { reactivity as rct } from '@bridge/vue';
import { store } from './store.js';

const SharedCounter = $bridge(() => {
  return () => (
    <div>
      <p>Current count: {store.count}</p>
      <button onClick={store.increment}>Increment</button>
    </div>
  );
});

export default SharedCounter;
```