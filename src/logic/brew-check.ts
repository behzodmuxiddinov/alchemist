import { PARAMETER_KEYS } from '@/data/parameters';
import type {
  ICauldronValues,
  IRecipe,
  IRecipeRange,
} from '@/types/game.types';

export function expandRange(
  target: IRecipeRange,
  tolerance: number,
): IRecipeRange {
  return { min: target.min - tolerance, max: target.max + tolerance };
}

export function isBrewSuccessful(
  values: ICauldronValues,
  recipe: IRecipe,
  tolerance: number,
): boolean {
  return PARAMETER_KEYS.every((key) => {
    const checked = expandRange(recipe[key], tolerance);

    return values[key] >= checked.min && values[key] <= checked.max;
  });
}
