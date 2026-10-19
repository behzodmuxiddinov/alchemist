import { DEFAULT_DIFFICULTY, DIFFICULTIES } from '@/data/difficulty';
import { getShelfIngredients } from '@/data/ingredients';
import { isBrewSuccessful } from '@/logic/brew-check';
import { calculateCauldron } from '@/logic/calculate-cauldron';
import { pickRecipe } from '@/logic/recipe-generator';
import { createStock, decreaseStock, hasStock } from '@/logic/stock';
import type {
  GameStatus,
  ICauldronValues,
  IIngredient,
  IRecipe,
} from '@/types/game.types';

const config = DIFFICULTIES[DEFAULT_DIFFICULTY];

export const shelfIngredients = getShelfIngredients(config.shelfSize);

export const maxCauldronIngredients = config.maxCauldronIngredients;

export const startTime = config.startTime;

export const tolerance = config.tolerance;

export const state = {
  status: 'menu' as GameStatus,
  score: 0,
  timeLeft: 0,
  lives: 0,
  shelfStock: {} as Record<string, number>,
  cauldronIngredients: [] as IIngredient[],
  activeRecipe: undefined as IRecipe | undefined,
};

export function getCauldronValues(): ICauldronValues {
  return calculateCauldron(state.cauldronIngredients);
}

export function isPlaying(): boolean {
  return state.status === 'playing';
}

export function getVisibleShelf(): readonly IIngredient[] {
  return isPlaying() ? shelfIngredients : [];
}

export function startGame(): void {
  state.status = 'playing';
  state.score = 0;
  state.timeLeft = config.startTime;
  state.lives = config.lives;
  state.shelfStock = createStock(shelfIngredients);
  state.cauldronIngredients = [];
  state.activeRecipe = pickRecipe(DEFAULT_DIFFICULTY);
}

export function canBrew(): boolean {
  return isPlaying() && state.cauldronIngredients.length > 0;
}

export function brew(): void {
  const recipe = state.activeRecipe;

  if (!recipe || !canBrew()) {
    return;
  }

  const isSuccess = isBrewSuccessful(getCauldronValues(), recipe, tolerance);

  if (isSuccess) {
    state.score += config.scorePerBrew;
    state.timeLeft = Math.min(
      state.timeLeft + config.timeBonus,
      config.startTime,
    );
    state.activeRecipe = pickRecipe(DEFAULT_DIFFICULTY);
  } else {
    state.lives = Math.max(0, state.lives - 1);
  }

  state.cauldronIngredients = [];
}

export function isCauldronFull(): boolean {
  return state.cauldronIngredients.length >= maxCauldronIngredients;
}

export function addIngredient(id: string): void {
  const ingredient = shelfIngredients.find((item) => item.id === id);

  if (
    !ingredient ||
    !isPlaying() ||
    isCauldronFull() ||
    !hasStock(state.shelfStock, id)
  ) {
    return;
  }

  state.cauldronIngredients = [...state.cauldronIngredients, ingredient];
  state.shelfStock = decreaseStock(state.shelfStock, id);
}
