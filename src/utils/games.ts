export type Platform = 'nes' | 'ps5';

const Platform: Record<Platform, string> = {
  nes: 'NES',
  ps5: 'PS5',
};

export const getPlatformName = (name: Platform) => Platform[name];

export type Owner = 'iivari' | 'salla';

const Owner: Record<Owner, string> = {
  iivari: 'Iivari',
  salla: 'Salla',
};

export const getOwnerName = (name: Owner) => Owner[name];
