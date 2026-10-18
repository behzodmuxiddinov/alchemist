import { DEFAULT_DIFFICULTY, DIFFICULTIES } from '@/data/difficulty';
import { getShelfIngredients } from '@/data/ingredients';
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
