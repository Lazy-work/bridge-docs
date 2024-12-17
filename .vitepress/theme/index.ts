import DefaultTheme from "vitepress/theme";

import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import "./customs.css";
import type { Theme } from "vitepress";
import "virtual:group-icons.css";
import { h } from "vue";
import CompilerSwitch from './components/CompilerSwitch.vue';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "sidebar-nav-before": () => h(CompilerSwitch),
    });
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue);
  },
} satisfies Theme;
