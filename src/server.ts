import { WebSocketServer, WebSocket } from 'ws';
import { z } from 'zod';
import { match, P } from 'ts-pattern';
import { Params, ParamStore } from './params';

const Fixtures = z.enum(['head', 'mini', 'par']);

const SetParam = z.discriminatedUnion('param', [
  z.object({
    param: z.literal('luminosity'),
    key: Fixtures,
    value: z.number().min(0).max(1.5)
  }),
  z.object({
    param: z.literal('enabled'),
    key: Fixtures,
    value: z.boolean()
  }),
  z.object({
    param: z.literal('tiltOffset'),
    key: Fixtures.exclude(['par']),
    value: z.number().min(-1).max(1)
  }),
]);

const SetAction = z.object({
  action: z.literal('set'),
  set: SetParam
})

const Message = z.discriminatedUnion('action', [
  SetAction
]);

export function createWsServer(params: ParamStore, port: number) {
  const wss = new WebSocketServer({ port });

  const broadcast = (data: object) => {
    const msg = JSON.stringify(data);
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  };

  const getLuminousity = (name: keyof Params) => ({
    luminosity: params.getLuminosity(name),
    enabled: params.enabled(name)
  });

  const snapshot = () => ({
    head: { ...getLuminousity('head'), tiltOffset: params.tiltOffset('head') },
    mini: { ...getLuminousity('mini'), tiltOffset: params.tiltOffset('mini') },
    par: getLuminousity('par'),
  });

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'state', state: snapshot() }));

    ws.on('message', (raw) => {
      const parsed = Message.safeParse(JSON.parse(raw.toString()));

      if (!parsed.success) {
        return;
      }

      match(parsed.data)
        .with(
          { action: 'set', set: { param: 'luminosity', key: P.select('key'), value: P.select('value') } },
          ({ key, value }) => params.luminosity(key, value)
        )
        .with(
          { action: 'set', set: { param: 'enabled', key: P.select('key'), value: P.select('value') } },
          ({ key, value }) => params.enabled(key, value)
        )
        .with(
          { action: 'set', set: { param: 'tiltOffset', key: P.select('key'), value: P.select('value') } },
          ({ key, value }) => params.tiltOffset(key, value)
        )
        .exhaustive()
    });
  });

  const createUpdateBroadcast = (param: string) => (key: string, value: any) => broadcast({ type: 'update', param, key, value });

  ['luminosity', 'enabled', 'tiltOffset']
    .map(t => params.on(t as any, createUpdateBroadcast(t)))

  console.log(`WS control server on :${port}`);

  return wss;
}
