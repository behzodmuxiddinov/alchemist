import { DEFAULT_DIFFICULTY, DIFFICULTIES } from '@/data/difficulty';
import { findIngredient, getShelfIngredients } from '@/data/ingredients';
import { findRecipe } from '@/data/recipes';
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
import { readDifficulty, writeDifficulty } from '@/storage/difficulty';
import { clearSave, readSave, writeSave } from '@/storage/save';
import type {
  Difficulty,
  GameOverReason,
  GameStatus,
  ICauldronValues,
  IDifficultyConfig,
  IIngredient,
  IRecipe,
  ISavedGame,
} from '@/types/game.types';

export const state = {
  status: 'menu' as GameStatus,
  difficulty: readDifficulty() ?? DEFAULT_DIFFICULTY,
  score: 0,
  timeLeft: 0,
  lives: 0,
  shelfStock: {} as Record<string, number>,
  cauldronIngredients: [] as IIngredient[],
  activeRecipe: undefined as IRecipe | undefined,
  endsAt: 0,
  gameOverReason: undefined as GameOverReason | undefined,
  isResultSaved: false,
};

export function getConfig(): IDifficultyConfig {
  return DIFFICULTIES[state.difficulty];
}

export function getShelf(): readonly IIngredient[] {
  return getShelfIngredients(getConfig().shelfSize);
}

export function getMaxCauldronIngredients(): number {
  return getConfig().maxCauldronIngredients;
}

export function getStartTime(): number {
  return getConfig().startTime;
}

function toSavedGame(): ISavedGame | undefined {
  const recipe = state.activeRecipe;

  if (!recipe || !isRunning()) {
    return undefined;
  }

  return {
    status: isPaused() ? 'paused' : 'playing',
    difficulty: state.difficulty,
    score: state.score,
    timeLeft: isPaused() ? state.timeLeft : getRemainingSeconds(state.endsAt),
    lives: state.lives,
    recipeId: recipe.id,
    cauldronIngredientIds: state.cauldronIngredients.map(
      (ingredient) => ingredient.id,
    ),
    shelfStock: { ...state.shelfStock },
    savedAt: Date.now(),
  };
}

export function saveGame(): void {
  const save = toSavedGame();

  if (save) {
    writeSave(save);
  }
}

export function hasSavedGame(): boolean {
  return Boolean(readSave());
}

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
  saveGame();
}

export function resumeGame(): void {
  if (!isPaused()) {
    return;
  }

  state.endsAt = getEndTime(state.timeLeft);
  state.status = 'playing';
  saveGame();
}

export function exitToMenu(): void {
  clearSave();
  state.status = 'menu';
  state.score = 0;
  state.timeLeft = 0;
  state.lives = 0;
  state.endsAt = 0;
  state.shelfStock = {};
  state.cauldronIngredients = [];
  state.activeRecipe = undefined;
  state.gameOverReason = undefined;
  state.isResultSaved = false;
}

export function getVisibleShelf(): readonly IIngredient[] {
  return isRunning() ? getShelf() : [];
}

export function canChangeDifficulty(): boolean {
  return !isRunning();
}

export function setDifficulty(difficulty: Difficulty): void {
  if (!canChangeDifficulty()) {
    return;
  }

  state.difficulty = difficulty;
  writeDifficulty(difficulty);
}

export function continueGame(): void {
  const save = readSave();
  const recipe = save && findRecipe(save.recipeId);

  if (!save || !recipe) {
    return;
  }

  state.status = 'paused';
  state.difficulty = save.difficulty;
  state.score = save.score;
  state.timeLeft = save.timeLeft;
  state.endsAt = getEndTime(save.timeLeft);
  state.lives = save.lives;
  state.shelfStock = { ...save.shelfStock };
  state.cauldronIngredients = save.cauldronIngredientIds
    .map((id) => findIngredient(id))
    .filter((ingredient) => ingredient !== undefined);
  state.activeRecipe = recipe;
  state.gameOverReason = undefined;
  state.isResultSaved = false;
  saveGame();
}

export function startGame(): void {
  const config = getConfig();

  state.status = 'playing';
  state.score = 0;
  state.timeLeft = config.startTime;
  state.endsAt = getEndTime(config.startTime);
  state.gameOverReason = undefined;
  state.isResultSaved = false;
  state.lives = config.lives;
  state.shelfStock = createStock(getShelf());
  state.cauldronIngredients = [];
  state.activeRecipe = pickRecipe(state.difficulty);
  saveGame();
}

export function endGame(reason: GameOverReason): void {
  clearSave();
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

  const config = getConfig();
  const isSuccess = isBrewSuccessful(
    getCauldronValues(),
    recipe,
    config.tolerance,
  );

  if (isSuccess) {
    state.score += config.scorePerBrew;
    state.endsAt = Math.min(
      addSeconds(state.endsAt, config.timeBonus),
      getEndTime(config.startTime),
    );
    state.timeLeft = getRemainingSeconds(state.endsAt);
    state.activeRecipe = pickRecipe(state.difficulty);
  } else {
    state.lives = Math.max(0, state.lives - 1);
  }

  state.cauldronIngredients = [];

  if (state.lives === 0) {
    endGame('lives');
  } else if (isShelfEmpty(state.shelfStock)) {
    endGame('ingredients');
  }

  saveGame();
}

export function isCauldronFull(): boolean {
  return state.cauldronIngredients.length >= getMaxCauldronIngredients();
}

export function addIngredient(id: string): void {
  const ingredient = getShelf().find((item) => item.id === id);

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
  saveGame();
}
