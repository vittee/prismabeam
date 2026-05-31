import { SerialPort } from 'serialport';
import koffi from 'koffi';
import type { DMXTransport } from './types';

const sendBreak = (() => {
  if (process.platform === 'win32') {
    const kernel32 = koffi.load('kernel32.dll');
    const EscapeCommFunction = kernel32.func('bool __stdcall EscapeCommFunction(intptr hFile, uint32 dwFunc)');
    const SETBREAK = 8;
    const CLRBREAK = 9;
    return (handle: number, status: boolean) => EscapeCommFunction(handle, status ? SETBREAK : CLRBREAK);
  }

  if (process.platform === 'linux') {
    const libc = koffi.load('libc.so.6');
    const ioctl = libc.func('int ioctl(int fd, uint32 request, ...)');
    const TIOCSBRK = 0x5427;
    const TIOCCBRK = 0x5428;
    return (handle: number, status: boolean) => ioctl(handle, status ? TIOCSBRK : TIOCCBRK);
  }

  return (_handle: number, _status: boolean) => {};
})();

export class DMX implements DMXTransport {
  #frame = Buffer.alloc(513); // DMX actually support 512 channels, the first byte in the frame is actually the start code
  #dev: SerialPort;
  #handle = 0;
  readonly frequency = 40;

  constructor(path: string) {
    this.#dev = new SerialPort({
      path,
      baudRate: 250_000,
      dataBits: 8,
      stopBits: 2,
      parity: 'none',
      autoOpen: false
    });
  }

  set(channel: number, value: number): this {
    this.#frame[channel] = value;
    return this;
  }

  open(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.#dev.open((err) => {
        if (err) return reject(err);

        if (process.platform === 'win32' || process.platform === 'linux') {
          this.#handle = (this.#dev as any)?.port?.fd;
        }

        setInterval(() => this.#sendFrame(), 1000 / this.frequency);
        resolve();
      });
    });
  }

  #sendBreak(status: boolean) {
    sendBreak(this.#handle, status);
  }

  #sendFrame() {
    this.#sendBreak(true);
    this.#sendBreak(false);
    this.#dev.write(this.#frame);
  }
}
