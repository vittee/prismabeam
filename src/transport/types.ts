export interface DMXTransport {
  set(channel: number, value: number): void;
}