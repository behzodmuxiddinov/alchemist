import type { ICauldronValues, IIngredient } from '@/types/game.types';

export function calculateCauldron(
  ingredients: readonly IIngredient[],
): ICauldronValues {
  const total: ICauldronValues = {
    temperature: 0,
    density: 0,
    magicPower: 0,
  };

  for (const ingredient of ingredients) {
    total.temperature += ingredient.temperature;
    total.density += ingredient.density;
    total.magicPower += ingredient.magicPower;
  }

  return total;
}
