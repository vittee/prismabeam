import { extname } from 'node:path';
import http from 'node:http';
import express from 'express';
import { SerialPort } from 'serialport';

import { DMX } from './transport/dmx';
import { Universe } from './universe';
import { Fixture } from './fixtures/fixture';
import { YUERGenericBeamSpot } from './fixtures/moving-head/yeur';
import { Mini30WMovingHeadPrismGoboWithLaser } from './fixtures/moving-head/mini';
import { TADAMK54Rgb } from './fixtures/par/tadamk54';
import { ActivationTag, AnalysisClient } from './analysis/analysis-client';
import { Animator } from './animator';
import { ParamStore } from './params';
import { createWsServer } from './server';

export type { BroadcastMessage, Snapshot } from './server';
export type { ActivationTag } from './analysis/analysis-client';

process.on('uncaughtException', e => console.error('uncaughtException', e));
process.on('unhandledRejection', e => console.error('unhandledRejection', e));

const usbDevices = [
  { vendorId: "0403", productId: "6001" }
];

async function main() {
  const analyzerHost = process.env.ANALYZER_HOST;
  if (!analyzerHost) {
    console.error('ANALYZER_HOST is required');
    process.exit(1);
  }

  const devices = await SerialPort.binding.list().then(all => {
    const matches = all.filter(({ vendorId, productId }) =>
      usbDevices.find(u => u.vendorId === vendorId && u.productId === productId)
    );

    if (matches.length) {
      return matches;
    }

    const firstUSB = all.find(d => d.path.startsWith('/dev/ttyUSB'));

    return firstUSB ? [firstUSB] : [];
  });

  const device = devices.at(0);
  if (!device) {
    console.error('No USB-DMX device found');
    process.exit(1);
  }

  console.log('Found device:', device.path);

  const httpPort = +(process.env.PORT || 7400);

  const dmx = new DMX(device.path);
  const universe = new Universe(dmx);

  const beamSpot = new Fixture(YUERGenericBeamSpot).into(universe)
    .set('tilt', 127)
    .set('prism', 8)

  const miniBeam = new Fixture(Mini30WMovingHeadPrismGoboWithLaser).into(universe)
    .set('tilt', 127)

  const par = new Fixture(TADAMK54Rgb).into(universe)

  await dmx.open();

  const analysis = new AnalysisClient(analyzerHost, +(process.env.ANALYZER_PORT || 7442));
  await new Promise<void>((resolve) => analysis.once('ready', resolve));

  const params = new ParamStore();

  let bpm = 120;
  let energy = 0.5;
  let danceability = 0.5;
  let tags: ActivationTag[] = [];
  let moods: ActivationTag[] = [];

  const animator = new Animator({
    movingHead: {
      main: beamSpot,
      mini: miniBeam
    },
    parLight: par,
    params
  });

  const expressApp = express();
  const httpServer = http.createServer(expressApp);

  expressApp.set('trust proxy', 1);

  const { server: socketServer, broadcast } = createWsServer(httpServer, params);

  httpServer.listen(httpPort)

  console.log(`Listening — http:${httpPort}`);

  const uiRoot = process.env.NODE_ENV === 'development' ? './ui/dist' : './ui';

  expressApp.use('/', express.static(uiRoot), (req, res, next) => {
    const ext = extname(req.path);

    if (!ext) {
      res.sendFile('index.html', { root: uiRoot, dotfiles: 'deny' }, (error) => {
        if (error) {
          res.status(404).end();
        }
      });

      return;
    }

    next();
  });

  analysis.on('extracted', (activations) => {
    tags = activations;
    if (activations.length) {
      animator.updateGenre(activations.map(tag => ({...tag, name: tag.name.toLowerCase() })));
    }
  });

  analysis.on('mood', (activations) => {
    moods = activations;
    if (activations.length) {
      animator.updateMood(activations.map(tag => ({...tag, name: tag.name.toLowerCase() })));
    }
  });

  analysis.on('bpm', (v) => {
    bpm = v;
    animator.bpm = v;
  });

  analysis.on('danceability', (v) => {
    danceability = v;
    animator.danceability = v;
  });

  analysis.on('energy', (level) => {
    energy = level;
    animator.energy = level;
  });

  const kicks: number[] = [];

  analysis.on('kick', () => {
    kicks.push(Date.now());
    if (kicks.length > 8) {
      kicks.shift();
    }
  });

  setInterval(() => {
    const now = Date.now();
    const delay = params.kickDelay();
    const due = kicks.findIndex(t => now >= t + delay);
    if (due !== -1) {
      kicks.splice(0, due + 1);
      animator.kick();
    }
  }, 1000 / 120);

  setInterval(() => {
    broadcast({
      type: 'stats',
      bpm,
      danceability,
      energy
    });
  }, 1000 / 10);

  setInterval(() => {
    broadcast({
      type: 'tags',
      profile: animator.getProfileName(),
      tags,
      moods
    })
  }, 1000);
}

main();
