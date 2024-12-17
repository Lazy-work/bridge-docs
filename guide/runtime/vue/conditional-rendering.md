# Conditional rendering

To conditionally render, you can do as usual in React :

```js
<div>{count.value % 2 ? <p>It's even</p> : <p>It's odd</p>}</div>
```

```js
<div>{count.value > 5 && <p>It's greater than 5</p>}</div>
```

Additionally, the Bridge library provides helpers to make conditional rendering more appealing and readable.

## If

The Bridge library provides an `$if` helper to enable conditional rendering :

```js
import { $if } from "@bridge/vue";

$if(store.count % 2)
  .then(<p>It's even</p>)
  .else(<p>It's odd</p>)
  .end();
```

::: tip
To avoid unnecessary creation of elements, you can wrap the JSX in a function. This way, the element will only be created and returned when the conditional statement is fulfilled.

```js
import { $if } from "@bridge/vue";

$if(store.count % 2)
  .then(() => <p>It's even</p>)
  .else(() => <p>It's odd</p>)
  .end();
```
:::


## Switch case

The Bridge library provides an `$switch` helper to enable the use of switch case for conditional rendering. The `$switch` helper should be chained with the call of the `case` function, with the first parameter being the value to match and the last parameter being the value to return. The last call chained has to be `default` to return the value after evaluation.

```js
$switch(count.value)
  .case(1, <p>It's one</p>)
  .case(2, <p>It's two</p>)
  .case(3, <p>It's two</p>)
  .default(<p>I'm lost ¯\_(ツ)_/¯</p>);
```

The `case` function supports the definition of several values to match, and any expression that returns a boolean :

```js
$switch(count.value)
  .case(4, 5, 6, <p>It's between 4 and 6</p>)
  .case(
    count.value > 10,
    <p>It seems bigger than anything before, maybe it's OVER 9000 !!!!</p>
  );
```

Be careful: passing a `true` value as a condition will match the case any time, and passing a `false` value will skip the case every time as well.

```js
$switch(value)
  .case(false, <p>The value is false</p>) // Always skipped
  .case(true, <p>The value is true</p>) // Always matched
  .default();
```

To match a boolean value, use comparison just as you would in an if statement :

```js
$switch(value)
  .case(value === true, <p>The value is true</p>)
  .case(value === false, <p>The value is false</p>)
  .default()
  ...
```

The `case` function also supports basic pattern matching to match the shape of an object :

```js
const result = useTodos();

return () =>
  $switch(result)
    .case({ status: "pending" }, <p>It's loading...</p>)
    .case({ status: "success" }, () => (
      <ul>
        {result.data.map((item) => (
          <li>
            <p>Task: {item.task}</p>
            <p>Status: {item.completed}</p>
          </li>
        ))}
      </ul>
    ))
    .case({ status: "error" }, () => (
      <p>Oops, something goes wrong: {result.error}</p>
    ))
    .default(<p>I'm lost again ¯\_(ツ)_/¯</p>);
```

If you need to match the shape of a ref, the Bridge library provides the `v` helper to make pattern matching more convenient with refs:

```js
import { v } from "@bridge/vue";

$switch(result)
  .case({ status: v("pending") }, <p>It's loading...</p>)
  .case({ status: v("success") }, () => (
    <ul>
      {result.data.value.map((item) => (
        <li>
          <p>Task: {item.task}</p>
          <p>Status: {item.completed}</p>
        </li>
      ))}
    </ul>
  ))
  .case(
    { status: v("error") },
    <p>Oops, something goes wrong: {result.error}</p>
  )
  .default();
```
