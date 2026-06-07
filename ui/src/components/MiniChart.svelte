<script lang="ts">
  import { onMount } from "svelte";

  export type Props = {
    data: number[];
    points: number;
    min: number;
    max: number;
    format?: (v: number) => string;
    color?: string;
  }

  let { data, points, min, max, format = v => v.toFixed(2), color = '#00ff88' }: Props = $props();

  let canvas = $state<HTMLCanvasElement>();
  let req = 0;

  onMount(() => {
    const ctx = canvas?.getContext('2d');

    if (!ctx) return;

    const draw = () => {
      req = requestAnimationFrame(draw);

      const [w, h] = [ctx.canvas.width, ctx.canvas.height];
      ctx.clearRect(0, 0, w, h);

      const dataPoints = data.slice(-points);

      if (dataPoints.length >= 2) {
        const slotW = w / points;
        const xOffset = (points - dataPoints.length) * slotW;
        const range = max - min || 1;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;

        for (let i = 0; i < dataPoints.length; i++) {
          const x = xOffset + i * slotW;
          const y = h - ((dataPoints[i] - min) / range) * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      const last = dataPoints[dataPoints.length - 1];
      if (typeof last === 'number') {
        ctx.font = '0.75em monospace';
        ctx.fillStyle = color;
        ctx.textBaseline = 'top';
        ctx.fillText(format(last), 4, 4);
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(req);
    }
  })

</script>

<canvas class="c" bind:this={canvas} style:--color={color} />

<style>
.c {
  outline: 1px solid color(from var(--color) srgb r g b / 0.3);
  width: 100%;
  height: 100%;
}
</style>