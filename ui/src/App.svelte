<script lang="ts">
  import Fader from "./components/Fader.svelte";
  import Knob from "./components/Knob.svelte";
  import ToggleButton from "./components/ToggleButton.svelte";

  type Light = {
    luminosity: number;
    enabled: boolean;
  };

  type MovingHead = Light & {
    tiltOffset: number; // -1 = toward 0°, 0 = no offset, 1 = toward 180°
  };

  type State = {
    head: MovingHead;
    mini: MovingHead;
    par: Light;
    kickDelay: number;
  };

  let s = $state<State>({
    head: { luminosity: 1, enabled: true, tiltOffset: 0 },
    mini: { luminosity: 1, enabled: true, tiltOffset: 0 },
    par: { luminosity: 1, enabled: true },
    kickDelay: 0,
  });

  let connected = $state(false);

  const WS_URL = `ws://${location.hostname}:7400`;
  let ws: WebSocket;

  function connect() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      connected = true;
    };

    ws.onclose = () => {
      connected = false;
      setTimeout(connect, 2000);
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === "state") {
        s = msg.state;
      } else if (msg.type === "update") {
        let o = s as any;

        if (msg.key !== undefined) {
          o = o[msg.key]
        }

        o[msg.param] = msg.value;
      }
    };
  }

  connect();

  function sendFixture(param: string, key: string, value: number | boolean) {
    if (ws.readyState !== WebSocket.OPEN) {
      return;
    }

    ws.send(JSON.stringify({ action: "set", set: { param, key, value } }));
  }
</script>

<main>
  <div class="container">
    <section class="top">
      <div class="status" class:connected>
        {connected ? "Connected" : "Connecting…"}
      </div>
    </section>

    <section class="fixtures">
      {#each [["head", "Main"], ["mini", "Mini"], ["par", "Par"]] as [key, label]}
        {@const fixture = (s as any)[key]}
        <div class="strip">
          <div class="label">{label}</div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.35em">
            <ToggleButton
              size={20}
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

      <div class="strip">
        <div class="label">Adj</div>
        <div class="knob">
          <Knob
            unitValue={s.kickDelay / 1000}
            initialValue={420 / 1000}
            onchange={(v) => {
              s.kickDelay = Math.round(v * 1000);
              ws.send(JSON.stringify({ action: "set", set: { param: "kickDelay", value: s.kickDelay } }));
            }}
            color="red"
          />
          <div class="hint">{s.kickDelay} ms</div>
          <div class="hint">Kick Delay</div>
        </div>
      </div>
    </section>
  </div>
</main>

<style>
  :global(body)  {
    background: #111;
    color: #eee;
    padding: 1.2em;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  }

  main {
    display: flex;
    min-height: calc(100vh - 1.2em * 2);
    align-items: center;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .status {
    font-size: 0.7em;
    color: #f55;
    margin-bottom: 1.2em;
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
    height: 250px;
    gap: 4px;
  }

  .knob {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 1px;
    width: 100%;
    height: 70px;
  }

  .hint {
    font-size: 0.5em;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
