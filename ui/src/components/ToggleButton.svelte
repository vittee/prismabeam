<script lang="ts">
  type Props = {
    active?: boolean;
    size: any;
    color?: string;
    onclick?: () => any;
  };

  let { active = $bindable(false), size, color = 'red', onclick }: Props = $props();

  const cssSize = $derived.by(() => typeof size === 'number' ? `${size}px` : size);
</script>

<div
  class="btn"
  class:active
  class:clickable={onclick !== undefined}
  style:--size={cssSize}
  style:--color={color}
  onclick={onclick}
/>

<style>
.btn {
  width: var(--size);
  height: var(--size);
  border-radius: 0.08em;
  background-color: color(from var(--color) srgb r g b / 0.15);
  box-shadow: 0 0 0 0 transparent;
  transition: box-shadow 200ms ease, background-color 200ms ease;
  user-select: none;
}

.btn.clickable {
  cursor: pointer;
}

.btn.active {
  --mixed: color-mix(in hsl shorter hue, color(from var(--color) srgb r g b / 0.95) 100%, white 15%);

  background-color: var(--mixed);
  box-shadow:
    0 0 0.4em 0.1em color(from var(--mixed) srgb r g b / 0.6),
    0 0 1.2em 0.2em color(from var(--mixed) srgb r g b / 0.4),
    inset 0 0 0.3em color(from var(--mixed) srgb r g b / 0.1);
}

</style>