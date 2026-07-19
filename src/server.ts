import { Duplex } from 'node:stream';
import http, { IncomingMessage } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import { z } from 'zod';
import { match, P } from 'ts-pattern';
import { ParamStore, type Params } from './params';
import type { ActivationTag } from './analysis/analysis-client';

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
  z.object({
    param: z.literal('kickDelay'),
    value: z.number().min(0).max(1000)
  }),
]);

const SetAction = z.object({
  action: z.literal('set'),
  set: SetParam
});

const Message = z.discriminatedUnion('action', [
  SetAction
]);

type Light = {
  luminosity: number;
  enabled: boolean;
};

type MovingHead = Light & {
  tiltOffset: number; // -1 = toward 0°, 0 = no offset, 1 = toward 180°
};

export type Snapshot = {
  head: MovingHead;
  mini: MovingHead;
  par: Light;
  kickDelay: number;
};

type SnapshotMessage = {
  type: 'snapshot';
  snapshot: Snapshot;
}

type UpdateMessage = {
  type: 'update';
  param: string;
  key?: string;
  value: any;
}

type StatsMessage = {
  type: 'stats';
  bpm: number;
  danceability: number;
  energy: number;
}

type TagsMessage = {
  type: 'tags';
  profile: string;
  tags: ActivationTag[];
  moods: ActivationTag[];
}

export type BroadcastMessage = SnapshotMessage | UpdateMessage | StatsMessage | TagsMessage;

export function createWsServer(httpServer: http.Server, params: ParamStore) {
  const server = new WebSocketServer({
    noServer: true,
    clientTracking: false
  });

  const sockets = new Set<WebSocket>();

  httpServer.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    if (!req.url) {
      return;
    }

    if (!req.url.startsWith('/ws')) {
      return;
    }

    server.handleUpgrade(req, socket, head, (socket) => {
      sockets.add(socket);

      socket.send(JSON.stringify({ type: 'snapshot', snapshot: snapshot() } satisfies SnapshotMessage));

      socket
        .on('pong', () => lastPinged.delete(socket))
        .on('close', () => {
          sockets.delete(socket);
        })
        .on('error', () => {
          socket.terminate();
          sockets.delete(socket);
        })
        .on('message', (raw) => {
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
            .with(
              { action: 'set', set: { param: 'kickDelay', value: P.select() } },
              (value) => params.kickDelay(value)
            )
            .exhaustive()
        });
    });
  });

  // Evict half-open TCP connections that never emit 'close'
  const lastPinged = new Map<WebSocket, number>();

  setInterval(() => {
    const now = Date.now();
    for (const client of sockets) {
      const pingedAt = lastPinged.get(client);
      if (pingedAt !== undefined && now - pingedAt < 30_000) {
        continue;
      }
      if (pingedAt !== undefined) {
        // pinged 30s ago, no pong received — dead
        client.terminate();
        sockets.delete(client);
        lastPinged.delete(client);
        continue;
      }
      lastPinged.set(client, now);
      client.ping();
    }
  }, 1_000);

  const broadcast = (data: BroadcastMessage) => {
    const msg = JSON.stringify(data);

    for (const client of sockets) {
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
    kickDelay: params.kickDelay(),
  });

  const createUpdateBroadcast = (param: string) => (key: string, value: any) => broadcast({ type: 'update', param, key, value });

  ['luminosity', 'enabled', 'tiltOffset']
    .map(t => params.on(t as any, createUpdateBroadcast(t)));

  params.on('kickDelay', (value) => broadcast({ type: 'update', param: 'kickDelay', value }));

  return {
    server,
    broadcast
  };
}
