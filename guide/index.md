---
outline: deep
---

# Why this library ?

## Motivation

It all began with a dilemma in choosing the right SPA framework for my next project. I yearned for the excitement offered by other frameworks like Svelte, Vue.js, and Solid.js, yet I needed to retain the comprehensive ecosystem of React at my fingertips. There was a fear that alternative frameworks might not fully meet my needs or do so as satisfactorily. I dreaded the possibility of lacking flexibility when tackling complex tasks outside of React's realm. And the concern loomed that if I ever decided to transition my project to mobile, I might rue not having React to share logic with React Native.

With React, it's just JavaScript, ensuring I have all the flexibility I desire to accomplish my goals. Thanks to its popularity, React boasts a mature and extensive ecosystem that likely caters to all my needs. However, I'm reluctant to inherit React's potential pitfalls and boilerplate code, such as useEffect and useMemo, which could adversely affect performance and the smooth operation of my application, introducing issues like unnecessary computation or excessive rendering.

## Choosing another than React becoming useless ?

Absolutely not ! The goal of this library is to improve the developer experience in the React world, not to compare with other framework
While this library overlaps with many React mechanisms (by replacing some of them), it’s still React at core.
Beside providing a way better implementation than the “Reactive” library, others frameworks offer better performance and less overhead at their core, and they may be more suitable if:

- You don’t need the React ecosystem
- You don’t need to build a cross-platform application
- You prefer a better templating system than React's JSX
- You are not already committed to a React project
- You seek less overhead and better performance

Don’t use this library, don’t use React, just pick an other framework, that suit your needs, your taste and will bring you joy...

Or don't pick front-end framework and just use HTMX / unpoly with PHP