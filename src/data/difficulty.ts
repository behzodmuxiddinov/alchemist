import type { Difficulty, IDifficultyConfig } from '@/types/game.types';

export const DEFAULT_DIFFICULTY: Difficulty = 'medium';

export const DIFFICULTY_ORDER: readonly Difficulty[] = [
  'easy',
  'medium',
  'hard',
];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export function isDifficulty(value: unknown): value is Difficulty {
  return (
    typeof value === 'string' &&
    (DIFFICULTY_ORDER as readonly string[]).includes(value)
  );
}

export const LOW_TIME_SECONDS = 15;

export const DIFFICULTIES: Record<Difficulty, IDifficultyConfig> = {
  easy: {
    shelfSize: 4,
    maxCauldronIngredients: 4,
    startTime: 180,
    tolerance: 12,
    lives: 5,
    scorePerBrew: 100,
    timeBonus: 15,
    reactionCount: 0,
  },
  medium: {
    shelfSize: 6,
    maxCauldronIngredients: 4,
    startTime: 150,
    tolerance: 8,
    lives: 3,
    scorePerBrew: 200,
    timeBonus: 10,
    reactionCount: 2,
  },
  hard: {
    shelfSize: 8,
    maxCauldronIngredients: 5,
    startTime: 150,
    tolerance: 5,
    lives: 3,
    scorePerBrew: 300,
    timeBonus: 5,
    reactionCount: 3,
  },
};
