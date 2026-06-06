<script lang="ts">
  import { clamp } from "lodash";
  import type { Attachment } from "svelte/attachments";
  import { on } from "svelte/events";

  const PI_HALF = Math.PI / 2;
  const TAU = Math.PI * 2;

  export type Props = {
    radius?: number;
    trackWidth?: number;
    angleOffset?: number;
    indicator?: {
      witdh?: number;
      size?: [min: number, max: number];
    }
    unitValue: number; // 0-1
    initialValue?: number;
    anchor?: number;
    color?: string;

    onchange?: (value: number) => void;
  };

  let {
    unitValue = $bindable(),
    initialValue,
    radius = 20,
    trackWidth = 1.5,
    angleOffset = Math.PI / 5,
    indicator,
    anchor = 0,
    color,
    onchange
  }: Props = $props();

  let { witdh: indicatorWidth = 2.5, size: indicatorSize } = indicator ?? {};

  let width = $derived(radius * 2.0);
  let height = $derived(radius + Math.ceil(Math.cos(angleOffset) * radius));

  let angleMin = $derived(PI_HALF + angleOffset);
  let angleMax = $derived(PI_HALF - angleOffset);
  let angleRange = $derived(TAU - angleOffset * 2.0);
  let angleAnc = $derived(angleMin + anchor * angleRange);

  let trackRadius = $derived(Math.floor(radius - trackWidth * 0.5));

  function circleSegment(cx: number, cy: number, radius: number, a0: number, a1: number) {
    const [x0, x1] = [a0, a1].map(a => cx + Math.cos(a) * radius);
    const [y0, y1] = [a0, a1].map(a => cy + Math.sin(a) * radius);

    let range = a1 - a0;
    while (range < 0.0) range += TAU;

    let d = `M${x0.toFixed(3)} ${y0.toFixed(3)}`;
    d += `A${radius} ${radius} 0 ${range > Math.PI ? 1 : 0} 1 ${x1.toFixed(3)} ${y1.toFixed(3)}`
    return d;
  }

  let valuePath = $derived.by(() => {
    const angleVal = angleMin + unitValue * angleRange;
    const aMinValAnc = Math.min(angleVal, angleAnc);
    const aMaxValAnc = Math.max(angleVal, angleAnc);

    return circleSegment(0, 0, trackRadius, aMinValAnc - 1.0 / trackRadius, aMaxValAnc + 1.0 / trackRadius);
  });

  let indicatorPath = $derived.by(() => {
    const angleVal = angleMin + unitValue * angleRange;

    const cos = Math.cos(angleVal) * trackRadius;
    const sin = Math.sin(angleVal) * trackRadius;

    const [min = 0.3, max = 0.6] = indicatorSize ?? [];

    return `M${(cos * min).toFixed(3)} ${(sin * min).toFixed(3)} L${(cos * max).toFixed(3)} ${(sin * max).toFixed(3)}`
  });

  const knob: Attachment = (node) => {
    let offpointermove: () => void;
    let offpointerup: () => void;

    let captured: HTMLElement;

    let startPos: [x: number, y: number] = [0, 0];
    let prevPos = startPos;
    let dragValue = 0;

    function setValue(v: number) {
      unitValue = clamp(v, 0, 1);
      onchange?.(unitValue);
    }

    function onPointermove(p: PointerEvent) {
      const [dx, dy] = [p.clientX - prevPos[0], p.clientY - prevPos[1]];

      let distance = Math.sqrt(dx * dx + dy * dy);
      const yDominant = Math.abs(dy) > Math.abs(dx);

      if ((yDominant && dy > 0) || (!yDominant && dx < 0)) {
        distance = -distance;
      }

      const next = clamp(dragValue + distance / (Math.PI * radius), 0, 1);
      if (next !== dragValue) {
        dragValue = next;
        prevPos = [p.clientX, p.clientY];

        setValue(next);
      }
    }

    function onPointerup(p: PointerEvent) {
      captured.releasePointerCapture(p.pointerId);
      offpointermove?.();
      offpointerup?.();
    }

    function onPointerdown(p: PointerEvent) {
      if (!p.target || p.button !== 0) {
        return;
      }

      captured = p.target as HTMLElement;
      captured.setPointerCapture(p.pointerId);

      startPos = [p.clientX, p.clientY];
      prevPos = startPos;
      dragValue = unitValue;

      offpointermove = on(p.target, 'pointermove', p => onPointermove(p as PointerEvent));
      offpointerup = on(p.target, 'pointerup', p => onPointerup(p as PointerEvent));
    }

    const offpointerdown = on(node, 'pointerdown', p => onPointerdown(p as PointerEvent));

    const offdblclick = on(node, 'dblclick', () => setValue(initialValue ?? anchor));

    return () => {
      offpointerdown();
      offpointermove?.();
      offpointerup?.();
      offdblclick();
    }
  }

</script>

<svg class="knob" {@attach knob} viewBox={`0 0 ${width} ${height}`} overflow="visible" style:color>
  <defs>
    <linearGradient id="knob-rim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white"/>
      <stop offset="100%" stop-color="black"/>
    </linearGradient>
  </defs>

  <g fill="none"
    stroke="currentColor"
    stroke-linecap="butt"
    stroke-width={trackWidth}
    transform={`translate(${radius}, ${radius})`}
    overflow="visible"
  >
    <!-- Knob -->
    <circle r={radius * 0.6 * 1.1} stroke="none" fill="black" class="shadow" cy={radius * 0.1}/>
    <circle r={radius * 0.6} stroke="none" fill="currentColor"/>
    <circle r={radius * 0.6} stroke="url(#knob-rim)" stroke-opacity="0.5" fill="none"/>

    <!-- Arc -->
    <path stroke="currentColor" stroke-opacity={1 / 3}
      d={circleSegment(0, 0, trackRadius, angleMin, angleMax)}
    />

    <!-- Value -->
    <path d={valuePath} />
    <!-- Indicator -->
    <path d={indicatorPath} stroke-linecap="round" stroke="rgba(0,0,0,0.5)" stroke-width={indicatorWidth} />
  </g>
</svg>

<style>
.knob {
  min-width: 1.75em;
  max-width: 1.75em;
  min-height: 1.75em;
  max-height: 1.75em;
  place-self: center;
  align-self: center;
  justify-content: center;
  user-select: none;
}

.shadow {
  opacity: 0.5;
  filter: blur(1px);
  mix-blend-mode: luminosity;
}
</style>