<script lang="ts">
  import { flip } from "svelte/animate";
  import { scale, slide } from "svelte/transition";


  export type Props = {
    data: Array<{ name: string; score: number }>;
    color: string;
  }

  let { data, color }: Props = $props();
</script>

<div class="container">
  {#each data as { name, score } (name)}
    <div animate:flip in:scale out:slide class="line" style:--score={score} style:--color={color}>
      <div class="bar">

      </div>

      <div class="name">
        {name}
      </div>
    </div>
  {/each}
</div>

<style>
.container {
  font-size: 0.85rem;
}

.line {
  position: relative;
}

.name {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.bar {
  position: absolute;
  bottom: 0;
  z-index: 0;
  height: 100%;
  border-bottom: 1px solid;
  border-color: var(--color);
  width: calc(var(--score) * 100%);
  transition: width 0.5s ease;
}
</style>