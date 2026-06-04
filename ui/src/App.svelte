<script lang="ts">
  import Fader from "./components/Fader.svelte";

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
  };

  let s = $state<State>({
    head: { luminosity: 1, enabled: true, tiltOffset: 0 },
    mini: { luminosity: 1, enabled: true, tiltOffset: 0 },
    par: { luminosity: 1, enabled: true },
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
        (s as any)[msg.key][msg.param] = msg.value;
      }
    };
  }

  connect();

  function send(param: string, key: string, value: number | boolean) {
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
        <div class="fixture">
          <div class="label">{label}</div>

          <label class="enabled">
            <input
              type="checkbox"
              checked={fixture.enabled}
              onchange={(e) => {
                fixture.enabled = e.currentTarget.checked;
                send("enabled", key, e.currentTarget.checked);
              }}
            />
            Enabled
          </label>

          <div class="controls">
            <div class="control-group">
              <Fader
                value={fixture.luminosity}
                min={0}
                max={1.5}
                normalValue={1.0}
                onchange={(v) => {
                  fixture.luminosity = v;
                  send("luminosity", key, v);
                }}
              />
              <div class="hint">{fixture.luminosity.toFixed(2)}</div>
              <div class="hint">Luminosity</div>
            </div>

            {#if fixture.tiltOffset !== undefined}
              <div class="control-group">
                <Fader
                  value={fixture.tiltOffset}
                  min={-1}
                  max={1}
                  onchange={(v) => {
                    fixture.tiltOffset = v;
                    send("tiltOffset", key, v);
                  }}
                />
                <div class="hint">
                  {(fixture.tiltOffset * 180).toFixed(2)}&deg;
                </div>
                <div class="hint">Tilt Offset</div>
              </div>
            {/if}
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
    gap: 0.5em;
  }

  .fixture {
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
    gap: 8px;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    height: 300px;
    gap: 4px;
  }

  .hint {
    font-size: 0.8em;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .enabled {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
  }
</style>
