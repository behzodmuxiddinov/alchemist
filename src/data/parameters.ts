import type { ICauldronValues } from '@/types/game.types';

export type ParameterKey = keyof ICauldronValues;

export const PARAMETER_KEYS: readonly ParameterKey[] = [
  'temperature',
  'density',
  'magicPower',
];
