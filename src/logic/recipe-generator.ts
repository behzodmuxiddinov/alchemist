import { RECIPES } from '@/data/recipes';
import type { Difficulty, IRecipe } from '@/types/game.types';

export function pickRecipe(difficulty: Difficulty): IRecipe {
  const available = RECIPES.filter(
    (recipe) => recipe.difficulty === difficulty,
  );
  const recipe = available[Math.floor(Math.random() * available.length)];

  if (!recipe) {
    throw new Error(`No recipe for difficulty ${difficulty}`);
  }

  return recipe;
}
