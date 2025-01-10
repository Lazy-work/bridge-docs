@unisonjs/core provide core primitive to handle scheduling and effects

- Based on Vue scheduler and reactivity
- Connection to React component lifecycle
- Effect management
- Job queing
- Job flushing
- Flushing mode : automatic
- Flushing mode : manual
- Provide one time execution context
- Plugin system

- ReactiveEffect
- activeSub
- shouldTrack
- effect.scheduler
- effect.run
- instance
- instance.queueEffect
- SchedulerJob
- queueJob
- flush: pre
- flush: post
- flush: insertion
- flush: layout
- instance plugin
- Dep
- Link
- track
- trigger
- queueJob
- nextTick
- queuePostFlushCb,
  - flushJobsUntil,
  - flushPostJobsUntil,
  - flushPreFlushCbs,
  - flushPostFlushCbs,
  - switchToAuto,
  - switchToManual,
  - toggleMode,
  - getJobAt,
  - endFlush,
  - SchedulerJobFlags,
  - getCurrentInstance,
  - setCurrentInstance


````ts
import { activeSub, shouldTrack, ReactiveEffect } from '@unisonjs/core'

export default class Ref<T> {
    #effects = new Set<ReactiveEffect>();
    #value: T;

    constructor(value: T) {
        this.#value = value;
    }

    get value() {
        this.#track();
        return this.#value;
    }

    set value(newValue: T) {
        if (!Object.is(this.#value, newValue)) {
            this.#value = newValue;
            this.#trigger();
        }
    }

    #track() {
        if (!(activeSub instanceof ReactiveEffect) || !shouldTrack) {
            return;
        }
        this.#effects.add(activeSub);
    }

    #trigger() {
        for (const sub of this.#effects) {
            sub.trigger();
        }
        this.#effects.clear();
    }
}```

```ts
import { ReactiveEffect, getCurrentInstance, queueJob, queuePostFlushCb, type SchedulerJob } from '@unisonjs/core';


/**
 * Create a reactive effect and schedule it to run.
 *
 * @param {Function} fn - The effect function to run reactively.
 */
export function watchEffect(fn) {
  const effect = new ReactiveEffect(fn);

  const job: SchedulerJob = () => effect.run();

  /**
   * Scheduler function for the effect.
   *
   * @param isFirstRun - Whether this is the first run of the effect.
   */
  effect.scheduler = (isFirstRun: boolean) => {
    const instance = job.i;
    if (isFirstRun) {
      job();
    } else {
      const jobIndex = queueJob(job);
      if (instance && instance.queueEffect) {
        instance.queueEffect('pre', jobIndex);
      }
    }
  };

  const instance = getCurrentInstance();
  if (!instance) throw new Error('No instance found');

  job.i = instance;
  job.position = instance.getEffectPosition();

  effect.scheduler(true);
}
````

```ts
/**
 * Create a reactive effect and schedule it to run after a flush.
 *
 * @param {Function} fn - The effect function to run reactively.
 */
export function watchPostEffect(fn) {
  const effect = new ReactiveEffect(fn);

  const job: SchedulerJob = () => effect.run();

  /**
   * Scheduler function for post-flush effects.
   */
  effect.scheduler = () => {
    const instance = job.i;
    const jobIndex = queuePostFlushCb(job);
    if (instance && instance.queueEffect) {
      instance.queueEffect("post", jobIndex.offset);
    }
  };

  const instance = getCurrentInstance();
  if (!instance) throw new Error("No instance found");

  job.i = instance;
  job.position = instance.getEffectPosition();

  effect.scheduler();
}
```

```ts
/**
 * Create a reactive effect and schedule it to run after a flush.
 *
 * @param {Function} fn - The effect function to run reactively.
 */
export function createEffect(fn) {
  const effect = new ReactiveEffect(fn);

  const job: SchedulerJob = () => effect.run();

  /**
   * Scheduler function for post-flush effects.
   */
  effect.scheduler = () => {
    const instance = job.i;
    const jobIndex = queuePostFlushCb(job);
    if (instance && instance.queueEffect) {
      instance.queueEffect("post", jobIndex.offset);
    }
  };

  const instance = getCurrentInstance();
  if (!instance) throw new Error("No instance found");

  job.i = instance;
  job.position = instance.getEffectPosition();

  effect.scheduler();
}
```

```ts
import { activeSub, shouldTrack, ReactiveEffect } from "@unisonjs/core";

export default class Ref<T> {
  #effects = new Set<ReactiveEffect>();
  #value: T;
  #websocket: WebSocket;

  constructor(value: T, websocketUrl: string) {
    this.#value = value;
    this.#websocket = new WebSocket(websocketUrl);

    // Listen for WebSocket messages to update the value.
    this.#websocket.addEventListener("message", (event) => {
      try {
        const { value: newValue, shouldTrigger } = JSON.parse(event.data);
        this.#updateValueFromExternal(newValue, shouldTrigger);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    });
  }

  get value() {
    this.#track();
    return this.#value;
  }

  set value(newValue: T) {
    // Notify WebSocket server of local changes.
    if (this.#websocket.readyState === WebSocket.OPEN) {
      this.#websocket.send(JSON.stringify({ value: newValue }));
    }
  }

  #track() {
    if (!(activeSub instanceof ReactiveEffect) || !shouldTrack) {
      return;
    }
    this.#effects.add(activeSub);
  }

  #trigger() {
    for (const sub of this.#effects) {
      sub.trigger();
    }
    this.#effects.clear();
  }

  // Internal method to update the value from an external source.
  #updateValueFromExternal(newValue: T, shouldTrigger: boolean) {
    this.#value = newValue;
    if (shouldTrigger) {
      this.#trigger();
    }
  }

  // Optional cleanup method for WebSocket.
  close() {
    this.#websocket.close();
  }
}
```
