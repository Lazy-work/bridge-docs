---
outline: deep
---

# Async client component

## Introduction

The `unisonjs` compiler allows you to create and use asynchronous client components. When using `async/await`, the component must be wrapped in a `Suspense` boundary to handle loading states effectively.


## Exemple

```js
// todo-list.jsx
import { ref } from "@unisonjs/vue";

async function TodoList() {
  const todos = ref(await fetchTodos()); // [!code highlight]
  const newTodo = ref("");

  async function handleAddTodo() {
    if (!newTodo.value.trim()) return;

    const addedTodo = await addTodo({ text: newTodo.value, completed: false });
    todos.value.push(addedTodo); // Mutate array in place
    newTodo.value = "";
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {$for(todos.value).each((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
          </li>
        ))}
      </ul>
      {/* Add To-Do */}
      <div>
        <input
          type="text"
          value={newTodo.value}
          onInput={(e) => (newTodo.value = e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default TodoList;

// app.jsx
import { Suspense } from "@unisonjs/vue";

export default function App() {
  return (
    <div>
      <h1>This is a new App</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <TodoList />
      </Suspense>
    </div>
  )
}
```

## Note

While asynchronous components are suitable for simple use cases, for more complex real-world applications, it's recommended to use a dedicated data-fetching library like [@tanstack/query](https://tanstack.com/query/latest/docs/framework/react/overview) to manage caching, background updates, and other advanced features more effectively.
