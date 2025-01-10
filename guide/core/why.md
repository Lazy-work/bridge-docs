@unisonjs/core Overview
@unisonjs/core provides the foundational primitives for scheduling, reactivity, and effect management within the Unison.js framework. It empowers developers with tools to efficiently manage execution contexts, connect to React lifecycles, and control job execution with fine-grained precision.

Key Features

1. Powered by Vue Scheduler and Reactivity
   At its core, @unisonjs/core leverages Vue's robust scheduler and reactivity system, offering efficient and reliable state management and scheduling capabilities.

2. Connection to React Component Lifecycle
   Seamlessly integrates with React's component lifecycle, ensuring smooth scheduling and effect execution without interfering with existing React patterns.

3. Effect Management
   Gain access to the currently executed effect, providing full visibility and control over reactive side effects within your components.

4. Job Queuing
   Easily schedule jobs by adding them to a queue for efficient execution.

5. Job Flushing
   Manage and flush jobs from the queue with flexibility:

Automatic Mode: Jobs are flushed automatically, ensuring smooth execution without manual intervention.
Manual Mode: Fine-grained control to flush specific jobs or groups of jobs on demand. 6. One-Time Execution Context
Provides a one-time execution context, ensuring predictable behavior for components and reducing unnecessary re-execution.

7. Plugin System
   Extend the capabilities of each component instance with the built-in plugin system, allowing for customizable and reusable functionality.
