import { Medley, Queue } from '@seamless-medley/medley';
import { AnalysisManager } from './analysis/analysis-manager';

import { SerialPort } from 'serialport';
import { DMX } from './transport/dmx';
import { Universe } from './universe';
import { Fixture } from './fixtures/fixture';
import { YUERGenericBeamSpot } from './fixtures/moving-head/yeur';
import { TADAMK54Rgb } from './fixtures/par/tadamk54';
import { EnergyDetector } from './analysis/energy-detector';
import { Mini30WMovingHeadPrismGoboWithLaser } from './fixtures/moving-head/mini';
import { Animator } from './animator';
import { Animation } from './fixtures/animation';
import { random } from 'lodash';

process.on('uncaughtException', e => console.error('uncaughtException', e));
process.on('unhandledRejection', e => console.error('unhandledRejection', e));

const usbDevices = [
  { vendorId: "0403", productId: "6001" }
];

async function main() {
  const devices = await SerialPort.binding.list().then(all =>
    all.filter(({ vendorId, productId }) =>
      usbDevices.find(u => u.vendorId === vendorId && u.productId === productId)
    )
  );

  const device = devices.at(0);
  if (!device) {
    console.error('No USB-DMX device found');
    return;
  }

  console.log('Found device:', device.path);

  const tracks = [
    'test1.mp3',
    'test2.mp3',
    'test3.mp3',
    'test4.flac',
    'test5.mp3'
  ];

  let index = random(tracks.length);
  // let index = 0;

  const q = new Queue();
  const m = new Medley(q);

  const mlStream = await m.requestAudioStream({ format: 'FloatLE', sampleRate: 16000 });
  const rhythmStream = await m.requestAudioStream({ format: 'FloatLE', sampleRate: 44100 });

  m.on('enqueueNext', (done) => {
    const track = tracks[index];
    index = (index + 1) % tracks.length;
    q.add(track);
    done(true);
  });

  const dmx = new DMX(device.path);
  const universe = new Universe(dmx);

  const beamSpot = new Fixture(YUERGenericBeamSpot).into(universe)
    .set('tilt', 127)
    .set('prism', 8)

  const miniBeam = new Fixture(Mini30WMovingHeadPrismGoboWithLaser).into(universe)
    .set('tilt', 127)

  const par = new Fixture(TADAMK54Rgb).into(universe)

  await dmx.open();

  const analysis = new AnalysisManager('file://./model-tfjs/model.json');
  await new Promise<void>((resolve) => analysis.once('ready', resolve));

  const energyDetector = new EnergyDetector(44100);

  const animator = new Animator({
    movingHead: {
      main: beamSpot,
      mini: miniBeam
    },
    parLight: par
  });

  mlStream.stream.on('data', (data: Buffer) => analysis.processMl(data));

  rhythmStream.stream.on('data', (data: Buffer) => {
    analysis.processRhythm(data);
    energyDetector.process(data);
  });

  analysis.on('extracted', ([topTag]) => {
    if (topTag?.score) {
      animator.updateTag(topTag);
    }
  });

  analysis.on('bpm', (bpm) => {
    animator.bpm = bpm;
  });

  analysis.on('danceability', (value) => {
    animator.dancability = value;
  });

  let lastEnergyLog = 0;
  energyDetector.on('energy', (level) => {
    const now = Date.now();
    if (now - lastEnergyLog >= 1000) {
      lastEnergyLog = now;
    }
    animator.energy = level;
  });

  energyDetector.on('kick', () => { animator.kick(); });

  m.play();
}

main();
