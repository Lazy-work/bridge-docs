---
outline: deep
---

# Integration with React

## Using a react component inside a Bridge component and vice-versa

When you declare a Bridge component, it produces a React component that renders standard JSX. You can pass your component as a child as usual.

## Using React hook inside a Bridge component

In a Bridge component, you can't use React hooks as usual. Technically, you can call a React hook, but due to the one-time execution paradigm of a Bridge component, the result will not be usable over time.

To bring a React hook to the Bridge world, you need to wrap it with: `toBridgeHook`

```js
import { useQuery as uq } from "@tanstack/react-query";
import { $bridge, toBridgeHook } from "@bridge/vue";

const useQuery = toBridgeHook(uq);

function TodoList() {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <ul>
      {data.value.map((item) => (
        <li>{item.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
```
By default, `toBridgeHook` will track individually every first depth properties of an object.
Also it tracks only non-object values to prevent excessive rerender.


```js
import { useQueryClient as uqc } from "@tanstack/react-query";
import { toBridgeHook, $bridge } from "@bridge/vue";

const useQueryClient = toBridgeHook(uqc, { shallow: true });

function PrintQueryClient() {
  const client = useQueryClient();

  return <p>{JSON.stringify(client.value)}</p>;
}

export default PrintQueryClient;
```

## Using composable inside a react component

If you have created some composables that you want to use in a normal React component, you can wrap your composables with the `createReactHook` helper :

```js
import { createReactHook } from "@bridge/vue";

export const useOnlineStatus = createReactHook(() => {
  const isOnline = ref(true);

  function handleOnline() {
    isOnline.value = true;
  }
  function handleOffline() {
    isOnline.value = false;
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

Don't forget to call the `useBridge()` hook

```js
// components/online-status.jsx
import { useBridge } from "@bridge/vue";

function OnlineStatus() {
  useBridge();
  const isOnline = useOnlineStatus();

  return <p>Connected: {isOnline.value}</p>;
}
```
