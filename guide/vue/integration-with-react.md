---
outline: deep
---

# Integration with React

## Using a react component inside a reactive component and vice-versa

When you declare a reactive component, it produces a React component that renders standard JSX. You can pass your component as a child as usual.

## Using hook inside a reactive component

In a reactive component, you can't use React hooks as usual. Technically, you can call a React hook, but due to the one-time execution paradigm of a reactive component, the result will not be usable over time.

To bridge a hook to the reactive world, you need to wrap it with one of these helpers: `toReactiveHook` or `toReactiveHookShallow`

Both of these helpers ensure that the underlying hook is executed on every rendering and its result is properly tracked.

`toReactiveHookShallow` and `toReactiveHook` behave the same concerning non-object results from a hook. For objects, toReactiveHook will track the first depth properties individually. When you call a reactive hook's hook, it will return the same object shape, but each first-depth property is a readonly ref.

```js
import { useQuery as uq } from "@tanstack/react-query";
import { $reactive, toReactiveHook } from "@lazywork/reactive-vue";

const useQuery = toReactiveHook(uq);

const TodoList =  $reactive(() => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return () => (
    <ul>
      {data.value.map((item) => (
        <li>{item.text}</li>
      ))}
    </ul>
  );
});

export default TodoList;
```

`toReactiveHookShallow` tracks the result as a whole independently of its type. If a new object is returned on the next rendering, it will notify a mutation even if the content of the new object is exactly the same as the previous one.

```js
import { useQueryClient as uqc } from "@tanstack/react-query";
import { toReactiveHookShallow, $reactive } from "@lazywork/reactive-vue";

const useQueryClient = toReactiveHookShallow(uqc);

const PrintQueryClient = $reactive(() => {
  const client = useQueryClient();

  return () => <p>{JSON.stringify(client.value)}</p>;
})

export default PrintQueryClient;
```

## Using reactive hook inside a react component

If you have created some reactive hooks that you want to use in a normal React component, you can wrap your reactive hooks with the `createHook` helper :

```js
export const useOnlineStatus = createHook(() => {
  const isOnline = ref(true);

  function handleOnline() {
    isOnline.value = true;
  }
  function handleOffline() {
    isOnline.value = true;
  }

  watchPostEffect((onCleanup) => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    onCleanup(() => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    });
  });
  return isOnline;
});
```

## Using global state inside a react component

If you use a `ref` as a global state and you want to consume it in a normal React component, you can use the `useVueRef` hook :

```js
const count = ref(0);

function Counter() {
  const [value, setValue] = useVueRef(count);

  return (
    <button onClick={() => setValue((v) => v + 1)}>count is {value}</button>
  );
}
```

An exemple of wrapping `useVueRef` in a custom hook :

```js
// hooks/counter.js
const count = ref(0);

function useCounter() {
  const [value, setValue] = useVueRef(count);

  return {
    value,
    increment: () => setValue((v) => v + 1),
    decrement: () => setValue((v) => v - 1),
  };
}

// components/counter.js
function Counter() {
  const { value, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{value}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```


If you use a `reactive` as a global store and want to consume it in a normal React component, you can use the `useReactive` hook :

```js
const store = reactive({ count: 0 });

function Counter() {
  const [value, setValue] = useReactive(store, ["count"]);

  return (
    <button onClick={() => setValue("count", (v) => v + 1)}>
      count is {value}
    </button>
  );
}
```


An exemple of wrapping `useReactive` in a custom hook

```js
// hooks/counter.js
const store = reactive({ count: 0 });

function useCounter() {
  const [value, setValue] = useReactive(store, ["count"]);
  return {
    value: value.count,
    increment: () => setValue("count", (v) => v + 1),
    decrement: () => setValue("count", (v) => v - 1),
  };
}

// components/counter.js
function Counter() {
  const { value, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{value}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```
