import { INGREDIENTS } from '@/data/ingredients';
import type { ParameterKey } from '@/data/parameters';
import { RECIPES } from '@/data/recipes';
import type { IRecipeRange } from '@/types/game.types';

function sumValues(values: readonly number[]): number {
  let total = 0;

  for (const value of values) {
    total += value;
  }

  return total;
}

function sortedValues(key: ParameterKey): number[] {
  return INGREDIENTS.map((ingredient) => ingredient[key]).toSorted(
    (first, second) => first - second,
  );
}

export function getBarScale(key: ParameterKey, count: number): IRecipeRange {
  const values = sortedValues(key);
  const targets = RECIPES.map((recipe) => recipe[key]);

  return {
    min: Math.min(
      0,
      sumValues(values.slice(0, count)),
      ...targets.map((target) => target.min),
    ),
    max: Math.max(
      0,
      sumValues(values.slice(-count)),
      ...targets.map((target) => target.max),
    ),
  };
}

export function toPercent(value: number, scale: IRecipeRange): number {
  const ratio = (value - scale.min) / (scale.max - scale.min);

  return Math.min(100, Math.max(0, ratio * 100));
}

export function isInRange(value: number, target: IRecipeRange): boolean {
  return value >= target.min && value <= target.max;
}
