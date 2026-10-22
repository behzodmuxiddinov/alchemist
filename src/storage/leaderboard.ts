import type { ILeaderboardEntry } from '@/types/game.types';

const STORAGE_KEY = 'alchemist-leaderboard';
const MAX_ENTRIES = 10;

function isEntry(value: unknown): value is ILeaderboardEntry {
  if (typeof value !== 'object' || !value) {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.name === 'string' &&
    typeof entry.score === 'number' &&
    Number.isFinite(entry.score) &&
    typeof entry.createdAt === 'number' &&
    Number.isFinite(entry.createdAt)
  );
}

function sortEntries(entries: ILeaderboardEntry[]): ILeaderboardEntry[] {
  return entries
    .toSorted(
      (first, second) =>
        second.score - first.score || first.createdAt - second.createdAt,
    )
    .slice(0, MAX_ENTRIES);
}

export function readLeaderboard(): ILeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed)
      ? sortEntries(parsed.filter((item) => isEntry(item)))
      : [];
  } catch {
    return [];
  }
}

export function isTopScore(score: number): boolean {
  const entries = readLeaderboard();
  const lowest = entries.at(-1);

  return entries.length < MAX_ENTRIES || !lowest || score > lowest.score;
}

export function addResult(name: string, score: number): void {
  const entries = sortEntries([
    ...readLeaderboard(),
    { name, score, createdAt: Date.now() },
  ]);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    return;
  }
}

export function clearLeaderboard(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}
