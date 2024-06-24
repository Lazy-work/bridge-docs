---
outline: deep
---

# Difference with Vue

## Not same templating / Only JSX

In React, because JSX is just JavaScript, you can define multiple components in a single file. Vue's Single File Components (SFCs) typically allow only one component per file

## Several components in one file

Because React/JSX is just Javascript and components are just functions (or classes), you can put several components in the same file, when Vue in SFC mode, allow only one component per file

## Implementation

Even if, the Reactive (Vue) library has for goal to reproduce the Vue Composition API, the internal implementation of Reactive differ from the Vue's on many things internally.
