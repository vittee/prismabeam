import dgram from 'node:dgram';
import path from 'node:path';
import http from 'node:http';
import express from 'express';
import { SerialPort } from 'serialport';

import { DMX } from './transport/dmx';
import { Universe } from './universe';
import { Fixture } from './fixtures/fixture';
import { YUERGenericBeamSpot } from './fixtures/moving-head/yeur';
import { Mini30WMovingHeadPrismGoboWithLaser } from './fixtures/moving-head/mini';
import { TADAMK54Rgb } from './fixtures/par/tadamk54';
import { AnalysisManager } from './analysis/analysis-manager';
import { EnergyDetector } from './analysis/energy/energy-detector';
import { Animator } from './animator';
import { ParamStore } from './params';
import { createWsServer } from './server';

process.on('uncaughtException', e => console.error('uncaughtException', e));
process.on('unhandledRejection', e => console.error('unhandledRejection', e));

const usbDevices = [
  { vendorId: "0403", productId: "6001" }
];

async function main() {
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
    return;
  }

  console.log('Found device:', device.path);

  const httpPort = +(process.env.PORT || 7400);
  const taggingPort = +(process.env.TAGGING_PORT || 7440);
  const audioPort = +(process.env.AUDIO_PORT || 7441);

  const dmx = new DMX(device.path);
  const universe = new Universe(dmx);

  const beamSpot = new Fixture(YUERGenericBeamSpot).into(universe)
    .set('tilt', 127)
    .set('prism', 8)

  const miniBeam = new Fixture(Mini30WMovingHeadPrismGoboWithLaser).into(universe)
    .set('tilt', 127)

  const par = new Fixture(TADAMK54Rgb).into(universe)

  await dmx.open();

  const analysis = new AnalysisManager('file://./models/musicnn/model.json', path.resolve('models/tempocnn/deeptemp-k4-3'));
  await new Promise<void>((resolve) => analysis.once('ready', resolve));

  const energyDetector = new EnergyDetector(48000);

  const params = new ParamStore();

  let bpm = 120;
  let energy = 0.5;
  let danceability = 0.5;

  const animator = new Animator({
    movingHead: {
      main: beamSpot,
      mini: miniBeam
    },
    parLight: par,
    params
  });

  const taggingSocket = dgram.createSocket('udp4');
  const audioSocket = dgram.createSocket('udp4');

  taggingSocket.on('message', (data) =>{
    analysis.processMl(data)
  });

  audioSocket.on('message', (data) => {
    analysis.processRhythm(data);
    energyDetector.process(data);
  });

  await Promise.all([
    new Promise<void>(resolve => taggingSocket.bind(taggingPort, resolve)),
    new Promise<void>(resolve => audioSocket.bind(audioPort, resolve))
  ]);

  const expressApp = express();
  const httpServer = http.createServer(expressApp);

  expressApp.set('trust proxy', 1);

  const { server: socketServer, broadcast } = createWsServer(httpServer, params);

  httpServer.listen(httpPort)

  console.log(`Listening — http:${httpPort} audio:${audioPort} audio-tagging:${taggingPort}`);

  analysis.on('extracted', ([topTag]) => {
    if (topTag?.score) {
      animator.updateTag(topTag);
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

  energyDetector.on('energy', (level) => {
    energy = level;
    animator.energy = level;
  });

  const kicks: number[] = [];

  energyDetector.on('kick', () => {
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
  }, 1000 / 10)
}

main();
