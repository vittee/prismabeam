import type { SvelteConfig } from "@sveltejs/vite-plugin-svelte";

export default {
  compilerOptions: {
    warningFilter: () => false
  }
} satisfies SvelteConfig;