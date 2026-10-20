import { state } from '@/state/game-state';
import type { GameOverReason } from '@/types/game.types';
import './game-over.scss';

const REASON_LABELS: Record<GameOverReason, string> = {
  time: 'Time is up',
  lives: 'No lives left',
  ingredients: 'Out of ingredients',
};

export function initGameOver(
  container: HTMLElement,
  onPlayAgain: () => void,
): void {
  container.addEventListener('click', (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('[data-action="play-again"]')
    ) {
      onPlayAgain();
    }
  });
}

export function renderGameOver(container: HTMLElement): void {
  const reason = state.gameOverReason;

  if (!reason || state.status !== 'game-over') {
    container.replaceChildren();

    return;
  }

  container.innerHTML = `
    <section class="game-over">
      <h2 class="game-over__title">Game Over</h2>
      <p class="game-over__reason">${REASON_LABELS[reason]}</p>
      <p class="game-over__score">
        Final score: <span class="game-over__value">${state.score}</span>
      </p>
      <button
        class="button button--primary"
        type="button"
        data-action="play-again"
      >
        Play Again
      </button>
    </section>
  `;
}
