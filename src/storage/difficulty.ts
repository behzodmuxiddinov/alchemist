import { isDifficulty } from '@/data/difficulty';
import type { Difficulty } from '@/types/game.types';

const STORAGE_KEY = 'alchemist-difficulty';

export function readDifficulty(): Difficulty | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return isDifficulty(raw) ? raw : undefined;
  } catch {
    return undefined;
  }
}

export function writeDifficulty(difficulty: Difficulty): void {
  try {
    localStorage.setItem(STORAGE_KEY, difficulty);
  } catch {
    return;
  }
}
