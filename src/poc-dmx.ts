import { SerialPort } from 'serialport';
import { DMX } from './transport/dmx';
import { Universe } from './universe';
import { Fixture } from './fixtures/fixture';
import { Animation } from './fixtures/animation';
import { YUERGenericBeamSpot } from './fixtures/moving-head/yeur';
import { Mini30WMovingHeadPrismGoboWithLaser } from './fixtures/moving-head/mini';
import { TADAMK54Rgb } from './fixtures/par/tadamk54';

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const usbDevices = [
  { vendorId: "0403", productId: "6001" }
];

function easeInSine(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

function easeInOutBack(x: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

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

  const dmx = new DMX(device.path);
  const universe = new Universe(dmx);

  const beamSpot = new Fixture(YUERGenericBeamSpot).into(universe)
    .set('luminous', 80)
    .set('color', 16)
    // .set('gobo', 96)
    .set('prism', 200)
    .set('led-ring', 190)
    .set('led-speed', 200)
    // .set('pan', 42)
    .set('tilt', 127)


  const mini = new Fixture(Mini30WMovingHeadPrismGoboWithLaser).into(universe)
    // .set('motor-delay', 0)
    // .set('gobo-rotation', 255)
    .set('luminous', 255)
    // .set('beam', 80)
    // .set('pan', 255)
    .set('laser', 10)
    .set('tilt', 90)

  const par = new Fixture(TADAMK54Rgb).into(universe)
    .set('master', 10)
    .set('red', 255)
    // .set('program', 0)
    // .set('speed', 250)

  // new Animation(par)
  //   .add({ push: ['master'] })
  //   .add({ to: [['master', 255]], duration: 200 })
  //   .add({ to: [['master', (v, anim) => anim.pop('master') ?? v]], duration: 200 })
  //   .start({ loop: true })



  await dmx.open();
  console.log('streaming DMX...');

  new Animation(beamSpot)
      .clear()
      .add({
        to: [
          ['strobe', 255]
        ],
        duration: 0
      })
      .delay(250)
      .add({
        to: [
          ['strobe', 0]
        ],
        duration: 10,
        easing: () => 1
      })
    .start()
}

main();
