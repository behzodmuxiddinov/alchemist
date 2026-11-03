import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore/lite';
import { DEFAULT_DIFFICULTY, isDifficulty } from '@/data/difficulty';
import type { GameOverReason, IRunEntry, IRunResult } from '@/types/game.types';
import { auth, firestore } from './firebaseauth';

const HISTORY_LIMIT = 20;

const REASONS: readonly GameOverReason[] = ['time', 'lives', 'ingredients'];

function isReason(value: unknown): value is GameOverReason {
  return (
    typeof value === 'string' && (REASONS as readonly string[]).includes(value)
  );
}

function toEntry(id: string, data: Record<string, unknown>): IRunEntry {
  const { score, difficulty, reason, playedAt } = data;

  return {
    id,
    score: typeof score === 'number' ? score : 0,
    difficulty: isDifficulty(difficulty) ? difficulty : DEFAULT_DIFFICULTY,
    reason: isReason(reason) ? reason : 'time',
    playedAt: playedAt instanceof Timestamp ? playedAt.toMillis() : Date.now(),
  };
}

export async function saveRun(run: IRunResult): Promise<void> {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    await addDoc(collection(firestore, 'users', user.uid, 'runs'), {
      ...run,
      playedAt: serverTimestamp(),
    });
  } catch {
    return;
  }
}

export async function readRuns(): Promise<IRunEntry[]> {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const snapshot = await getDocs(
    query(
      collection(firestore, 'users', user.uid, 'runs'),
      orderBy('playedAt', 'desc'),
      limit(HISTORY_LIMIT),
    ),
  );

  return snapshot.docs.map((item) => toEntry(item.id, item.data()));
}
