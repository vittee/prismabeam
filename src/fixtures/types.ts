export type ChannelStaticValue = {
  type: 'static';
  name: string;
  value: number;
};

export type ChannelRangeValue = {
  type: 'range';
  name: string;
  value: [min: number, max: number];
};

export type ChannelValueOption = ChannelStaticValue | ChannelRangeValue;

export type ChannelDescription = {
  id: string;
  options: ChannelValueOption[];
};

export type FixtureDefinition = {
  name: string;
  channels: ReadonlyArray<ChannelDescription>;
  metadata?: Record<string, any>;
};