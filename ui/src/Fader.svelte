<script lang="ts">
  import { on } from 'svelte/events';
  import type { Attachment } from 'svelte/attachments';
  import { clamp } from 'lodash';

  export type Props = {
    value: number;
    normalValue?: number;
    min?: number;
    max?: number;
    precision?: number;
    onchange?: (value: number) => void;
  };

  let { value = $bindable(), min = 0, max = 1, normalValue = 0, precision = 0.1, onchange }: Props = $props();

  function valueFromY(y: number): number {
    const rect = el!.getBoundingClientRect();
    const ratio = 1 - (y - rect.top) / height;
    return min + Math.max(0, Math.min(1, ratio)) * (max - min);
  }

  function setValue(v: number) {
    value = v;
    onchange?.(v);
  }

  function update(y: number) {
    setValue(valueFromY(y));
  }

  let range = $derived(max - min);
  let count = $derived(Math.floor(range / precision + 1));
  let marks = $derived(Array(count).fill(0).map((_, i) => i * precision + min));

  let el = $state<HTMLDivElement>();
  let width = $derived.by(() => el?.clientWidth ?? 0);
  let height = $derived.by(() => el?.clientHeight ?? 0);

  let thumb = $state<HTMLDivElement>();
  let dragging = $state(false);

  const fader: Attachment = (node) => {
    el = node as HTMLDivElement;

    let captured: HTMLElement;

    let lastY = 0;

    let offpointermove: () => void;
    let offpointerup: () => void;

    function onPointermove(p: PointerEvent) {
      const delta = p.clientY - lastY;
      const next = clamp(value - (delta / height) * range, min, max);
      if (next !== value) {
        setValue(next);
        lastY = p.clientY;
      }
    }

    function onPointerup(p: PointerEvent) {
      dragging = false;
      captured.releasePointerCapture(p.pointerId);
      offpointermove?.();
      offpointerup?.();
    }

    function onPointerdown(p: PointerEvent) {
      if (p.target !== thumb) {
        if (p.button == 0) {
          setValue(valueFromY(p.clientY - 1));
        }
        return;
      }

      dragging = true;
      captured = p.target as HTMLElement;
      captured.setPointerCapture(p.pointerId);

      lastY = p.clientY;

      offpointermove = on(p.target, 'pointermove', p => onPointermove(p as PointerEvent))
      offpointerup = on(p.target, 'pointerup', p => onPointerup(p as PointerEvent))
    }

    const offpointerdown = on(node, 'pointerdown', p => onPointerdown(p as PointerEvent));

    const offdblclick = on(node, 'dblclick', (p) => {
      if (p.target === thumb) {
        setValue(normalValue);
      }
    })

    return () => {
      offpointerdown();
      offpointermove?.();
      offpointerup?.();
      offdblclick();
    }
  }
</script>

<div class="container">
  <div class="fader" {@attach fader}>
    <svg viewBox={`0 0 ${width} ${height}`} overflow="visible" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute">
      <!-- guide -->
      <rect width="0.125em" height="calc(100% - 2em + 1.5px)"
            x="calc(50% - 0.0625em)"
            y="calc(1em - 1px)"
            rx="0.0625em"
            ry="0.0625em"
            stroke="none"
            fill="rgba(33 33 33 / 0.25)"/>

      <!-- line container -->
      <svg y="1em" height="100%" stroke-width="0.5" overflow="visible" stroke="rgba(255 255 255 / 0.16)" shape-rendering="crispEdges">
        <g>
          {#each marks as m}
            {@const y = `calc(${(1 - (m - min) / range) * 100}% - 1em + 1px)`}
            {@const color = m === normalValue ? 'red' : undefined}
            <line
              x1={m % 0.5 !== 0 ? '25%' : '15%'}
              x2="calc(50% - 0.0625em - 1px)"
              y1={y}
              y2={y}
              stroke={color}
              data-value={m}
            />
            <line
              x1="50%"
              x2={`calc(${m % 0.5 !== 0 ? 75 : 85}% - 0.0625em)`}
              y1={y}
              y2={y}
              stroke={color}
            />
          {/each}
        </g>
      </svg>
    </svg>

    <div class="thumb" bind:this={thumb}
      class:dragging
      style:top={`calc(${(1 - (value - min) / range) * 100}% - 1em)`}
    />
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    padding: 1em 0;
  }

  .fader {
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
    touch-action: none;
    place-self: end;
    padding: 4px;
  }

  .thumb {
    --color-black: hsl(197, 10%, 20%);
    --color-shadow: hsl(197, 10%, 55%);

    position: absolute;
    left: calc(50% - 0.5em);
    width: 1em;
    height: 2em;
    border-radius: 0.125em;
    background: linear-gradient(to bottom, color-mix(in srgb, var(--color-black), black 33%) 0%, color-mix(in srgb, var(--color-black), black 20%) 50%, var(--color-shadow) 50%, var(--color-shadow) calc(50% + 1.5px), color-mix(in srgb, var(--color-black), black 20%) calc(50% + 1.5px));
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 0.5), 0 2px 2px 0 rgb(0 0 0 / 0.3), 0 0 1px 0 rgba(255 255 255 / 0.1) inset;
    filter: brightness(120%);
    transition: top 200ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  .thumb.dragging {
    transition: none;
  }
</style>
