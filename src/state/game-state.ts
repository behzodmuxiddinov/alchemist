import { DEFAULT_DIFFICULTY, DIFFICULTIES } from '@/data/difficulty';
import { getShelfIngredients } from '@/data/ingredients';
import { isBrewSuccessful } from '@/logic/brew-check';
import { calculateCauldron } from '@/logic/calculate-cauldron';
import { pickRecipe } from '@/logic/recipe-generator';
import {
  createStock,
  decreaseStock,
  hasStock,
  isShelfEmpty,
} from '@/logic/stock';
import { addSeconds, getEndTime, getRemainingSeconds } from '@/logic/timer';
import type {
  GameOverReason,
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
  endsAt: 0,
  gameOverReason: undefined as GameOverReason | undefined,
};

export function getCauldronValues(): ICauldronValues {
  return calculateCauldron(state.cauldronIngredients);
}

export function isPlaying(): boolean {
  return state.status === 'playing';
}

export function isPaused(): boolean {
  return state.status === 'paused';
}

export function isRunning(): boolean {
  return isPlaying() || isPaused();
}

export function pauseGame(): void {
  if (!isPlaying()) {
    return;
  }

  state.timeLeft = getRemainingSeconds(state.endsAt);
  state.status = 'paused';
}

export function resumeGame(): void {
  if (!isPaused()) {
    return;
  }

  state.endsAt = getEndTime(state.timeLeft);
  state.status = 'playing';
}

export function exitToMenu(): void {
  state.status = 'menu';
  state.score = 0;
  state.timeLeft = 0;
  state.lives = 0;
  state.endsAt = 0;
  state.shelfStock = {};
  state.cauldronIngredients = [];
  state.activeRecipe = undefined;
  state.gameOverReason = undefined;
}

export function getVisibleShelf(): readonly IIngredient[] {
  return isRunning() ? shelfIngredients : [];
}

export function startGame(): void {
  state.status = 'playing';
  state.score = 0;
  state.timeLeft = config.startTime;
  state.endsAt = getEndTime(config.startTime);
  state.gameOverReason = undefined;
  state.lives = config.lives;
  state.shelfStock = createStock(shelfIngredients);
  state.cauldronIngredients = [];
  state.activeRecipe = pickRecipe(DEFAULT_DIFFICULTY);
}

export function endGame(reason: GameOverReason): void {
  state.status = 'game-over';
  state.gameOverReason = reason;
  state.timeLeft = getRemainingSeconds(state.endsAt);
}

export function tick(): void {
  if (!isPlaying()) {
    return;
  }

  state.timeLeft = getRemainingSeconds(state.endsAt);

  if (state.timeLeft === 0) {
    endGame('time');
  }
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
    state.endsAt = Math.min(
      addSeconds(state.endsAt, config.timeBonus),
      getEndTime(config.startTime),
    );
    state.timeLeft = getRemainingSeconds(state.endsAt);
    state.activeRecipe = pickRecipe(DEFAULT_DIFFICULTY);
  } else {
    state.lives = Math.max(0, state.lives - 1);
  }

  state.cauldronIngredients = [];

  if (state.lives === 0) {
    endGame('lives');
  } else if (isShelfEmpty(state.shelfStock)) {
    endGame('ingredients');
  }
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
