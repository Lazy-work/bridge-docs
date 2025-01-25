<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vitepress";

const route = useRoute();
const router = useRouter();
const compiler = computed(() => /^\/guide\/compiler\//.test(route.path));

const compilerExclusive = [
    "/guide/compiler/vue/async-component",
    "/guide/compiler/vue/extra",
    "/guide/compiler/vue/mode",
    "/guide/compiler/vue/incremental-compiler"
];
function switchMode() {
    if (compiler.value) {
        if (compilerExclusive.find((path) => route.path.includes(path))) {
            router.go("/guide/runtime/vue/");
        } else {
            router.go(route.path.replace("/compiler", "/runtime"));
        }
    } else {
        router.go(route.path.replace("/runtime", "/compiler"));
    }
}
</script>
<template>
    <button
        @click="switchMode"
        class="compiler-switch"
        :class="{ on: compiler, off: !compiler }"
    >
        Compiler {{ compiler ? "ON" : "OFF" }}
    </button>
</template>

<style scoped>
.compiler-switch {
    display: block;
    padding: 1rem;
    margin-block: 1rem;
    margin-inline: auto;
    font-weight: 800;
    font-size: 1rem;
    border-radius: 0.9rem;
    transition: 0.5s color;
    width: 100%;
}
.compiler-switch.on {
    color: rgb(0, 191, 255);
    background-color: rgba(0, 191, 255, 0.3);
}
.compiler-switch.off {
    color: rgb(119, 132, 136);
    background-color: rgba(119, 132, 136, 0.3);
}
</style>
