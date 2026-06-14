<script lang="ts">
  import { onMount } from "svelte";
  import Fader from "./components/Fader.svelte";
  import Knob from "./components/Knob.svelte";
  import MiniChart from "./components/MiniChart.svelte";
  import ToggleButton from "./components/ToggleButton.svelte";
  import type { ActivationTag, BroadcastMessage, Snapshot } from 'prismabeam';
  import TagsChart from "./components/TagsChart.svelte";


  let _state = $state<Snapshot>({
    head: { luminosity: 1, enabled: true, tiltOffset: 0 },
    mini: { luminosity: 1, enabled: true, tiltOffset: 0 },
    par: { luminosity: 1, enabled: true },
    kickDelay: 0,
  });

  let connected = $state(false);

  let bpmPoints = $state<number[]>([]);
  let danceabilityPoints = $state<number[]>([]);
  let energyPoints = $state<number[]>([]);
  let tags = $state<ActivationTag[]>([]);
  let moods = $state<ActivationTag[]>([]);
  let profile = $state<string>();

  const websocketUrl = location.protocol.replace('http', 'ws') + '//' + location.host + '/ws';
  let ws: WebSocket;

  function connect() {
    ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      connected = true;
      bpmPoints = [];
      danceabilityPoints = [];
      energyPoints = [];
    };

    ws.onclose = () => {
      connected = false;
      setTimeout(connect, 2000);
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data) as BroadcastMessage;

      switch (msg.type) {
        case 'snapshot':
          _state = msg.snapshot;
          break;

        case 'update': {
          let o = _state as any;

          if (msg.key !== undefined) {
            o = o[msg.key]
          }

          o[msg.param] = msg.value;
        }

        break;

        case 'stats': {
          const { bpm, danceability, energy } = msg;

          const append = (a: number[], v: number | undefined) => {
            if (!v) return;
            a.push(v);
            if (a.length > 50) a.shift();
          }

          append(bpmPoints, bpm);
          append(danceabilityPoints, danceability);
          append(energyPoints, energy);
        }

        break;

        case 'tags': {
          tags = msg.tags;
          moods = msg.moods;
          profile = msg.profile;
        }

        break;
      }
    };
  }

  function sendFixture(param: string, key: string, value: number | boolean) {
    if (ws.readyState !== WebSocket.OPEN) {
      return;
    }

    ws.send(JSON.stringify({ action: "set", set: { param, key, value } }));
  }

  onMount(() => {
    connect();

    return () => {
      ws?.close();
    }
  })
</script>

<main>
  <div class="container">
    <section class="fixtures">
      <div class="strip" style="width: 6.5em">
        <div class="label">Ctrls</div>
        <div class="toggle">
          <ToggleButton
            size="1.5em"
            color="red"
            active={connected}
          />
          <div class="hint">{connected ? 'Connected' : 'Connecting...'}</div>
        </div>

        <div class="knob">
          <Knob
            unitValue={_state.kickDelay / 1000}
            initialValue={420 / 1000}
            onchange={(v) => {
              _state.kickDelay = Math.round(v * 1000);
              ws.send(JSON.stringify({ action: "set", set: { param: "kickDelay", value: _state.kickDelay } }));
            }}
            color="red"
          />
          <div class="hint">{_state.kickDelay} ms</div>
          <div class="hint">Kick Delay</div>
        </div>

        <div>
          <div class="chart">
            <MiniChart
              color="#55ffff"
              data={bpmPoints}
              points={50}
              min={40}
              max={250}
              format={v => `BPM: ${v.toFixed(0)}`}
            />
          </div>

          <div class="chart">
            <MiniChart
              color="#ffff00"
              data={danceabilityPoints}
              points={50} min={0}
              max={1.5}
              format={v => `Dance: ${(v * 100).toFixed(2)}%`}
            />
          </div>

          <div class="chart">
            <MiniChart
              color="#ff8800"
              data={energyPoints}
              points={50}
              min={0}
              max={1.5}
              format={v => `Energy: ${(v * 100).toFixed(2)}%`}
            />
          </div>
        </div>

        <div style="font-size: 1rem; display: flex; flex-direction: column; gap: 1.4em">
          <div style="height: 6em">
            Tags
            <TagsChart data={tags} color="hsl(0 88% 40% / 0.8)" />
          </div>

          <div style="height: 6em">
            Moods
            <TagsChart data={moods} color="hsl(90 88% 40% / 0.8)" />
          </div>

          <div>
            Profile
            <div style="font-size: 0.8em">{profile}</div>
          </div>
        </div>
      </div>

      {#each [["head", "Main"], ["mini", "Mini"], ["par", "Par"]] as [key, label]}
        {@const fixture = (_state as any)[key]}
        <div class="strip">
          <div class="label">{label}</div>

          <div class="toggle">
            <ToggleButton
              size="1.5em"
              color="green"
              active={fixture.enabled}
              onclick={() => {
                fixture.enabled = !fixture.enabled;
                sendFixture('enabled', key, fixture.enabled);
              }}
            />
            <div class="hint">{fixture.enabled ? 'ON' : 'OFF'}</div>
          </div>

          <div class="controls">
            <div class="knob">
            {#if fixture.tiltOffset !== undefined}
              <Knob
                unitValue={((fixture.tiltOffset + 1) / 2)}
                anchor={0.5}
                color={key === 'head' ? 'cyan' : 'yellow'}
                onchange={(v) => {
                  fixture.tiltOffset = v * 2 - 1;
                  sendFixture("tiltOffset", key, fixture.tiltOffset);
                }}
              />
              <div class="hint">
                {(fixture.tiltOffset * 180).toFixed(2)}&deg;
              </div>
              <div class="hint">Tilt Offset</div>
            {/if}
            </div>

            <div class="fader">
              <Fader
                value={fixture.luminosity}
                min={0}
                max={1.5}
                normalValue={1.0}
                onchange={(v) => {
                  fixture.luminosity = v;
                  sendFixture("luminosity", key, v);
                }}
              />
              <div class="hint">{fixture.luminosity.toFixed(2)}</div>
              <div class="hint">Luminosity</div>
            </div>
          </div>
        </div>
      {/each}
    </section>
  </div>
</main>

<style>
  :global(body)  {
    background: #111;
    color: #eee;
    font-size: 2rem;
    padding: 0.5rem;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  }

  main {
    display: flex;
    min-height: calc(100vh - 0.5rem * 2);
    align-items: center;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4em;
  }

  .toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35em;
  }

  .charts {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: 1px;
  }

  .chart {
    display: flex;
    justify-self: center;
    width: 4.8em;
    height: 2.4em;
  }

  .status {
    display: flex;
    align-items: center;
    height: 100%;
    margin-bottom: 1.2em;
    font-size: 0.7em;
    color: #f55;
  }

  .status.connected {
    color: #5f5;
  }

  .fixtures {
    display: flex;
    gap: 0.25em;
  }

  .strip {
    display: flex;
    flex-direction: column;
    gap: 1em;
    border: 1px solid #333;
    border-radius: 0.4em;
    padding: 1em;
  }

  .label {
    font-size: 1.5em;
    font-weight: bold;
    letter-spacing: 0.1em;
    color: #aaa;
    text-align: center;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fader {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 20em;
    gap: 4px;
  }

  .knob {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 1px;
    width: 100%;
    height: 4em;
  }

  .hint {
    font-size: 0.5em;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
