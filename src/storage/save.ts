import { isDifficulty } from '@/data/difficulty';
import { findIngredient } from '@/data/ingredients';
import { findRecipe } from '@/data/recipes';
import type { ISavedGame } from '@/types/game.types';

const STORAGE_KEY = 'alchemist-save';

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isIngredientId(value: unknown): boolean {
  return typeof value === 'string' && Boolean(findIngredient(value));
}

function isIngredientIds(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((id) => isIngredientId(id));
}

function isStock(value: unknown): value is Record<string, number> {
  return typeof value !== 'object' || !value || Array.isArray(value)
    ? false
    : Object.entries(value).every(
        ([id, count]) => isIngredientId(id) && isCount(count),
      );
}

export function isValidSave(value: unknown): value is ISavedGame {
  if (typeof value !== 'object' || !value) {
    return false;
  }

  const save = value as Record<string, unknown>;

  return (
    (save.status === 'playing' || save.status === 'paused') &&
    isDifficulty(save.difficulty) &&
    isCount(save.score) &&
    isCount(save.savedAt) &&
    isCount(save.lives) &&
    save.lives > 0 &&
    isCount(save.timeLeft) &&
    save.timeLeft > 0 &&
    typeof save.recipeId === 'string' &&
    Boolean(findRecipe(save.recipeId)) &&
    isIngredientIds(save.cauldronIngredientIds) &&
    isStock(save.shelfStock)
  );
}

export function clearSave(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

export function readSave(): ISavedGame | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return undefined;
    }

    const parsed: unknown = JSON.parse(raw);

    if (isValidSave(parsed)) {
      return parsed;
    }
  } catch {
    clearSave();

    return undefined;
  }

  clearSave();

  return undefined;
}

export function writeSave(save: ISavedGame): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  } catch {
    return;
  }
}
