import {
  isValidPlayerName,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from '@/logic/player-name';
import { state } from '@/state/game-state';
import { addResult, isTopScore } from '@/storage/leaderboard';
import type { GameOverReason } from '@/types/game.types';
import { openLeaderboard } from './leaderboard';
import './game-over.scss';

const REASON_LABELS: Record<GameOverReason, string> = {
  time: 'Time is up',
  lives: 'No lives left',
  ingredients: 'Out of ingredients',
};

function renderNameForm(): string {
  if (state.isResultSaved) {
    return '<p class="game-over__saved">Result saved to the leaderboard.</p>';
  }

  if (!isTopScore(state.score)) {
    return '';
  }

  return `
    <form class="game-over__form">
      <label class="game-over__label" for="player-name">
        Top 10 result! Enter your name
      </label>
      <input
        class="game-over__input"
        id="player-name"
        name="player-name"
        type="text"
        minlength="${MIN_NAME_LENGTH}"
        maxlength="${MAX_NAME_LENGTH}"
        autocomplete="off"
      />
      <p class="game-over__error" hidden>
        Use ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} letters, digits, space, _ or -
      </p>
      <button class="button" type="submit">Save Result</button>
    </form>
  `;
}

function saveResult(container: HTMLElement): void {
  const input = container.querySelector<HTMLInputElement>('.game-over__input');

  if (!input) {
    return;
  }

  const name = input.value.trim();

  if (!isValidPlayerName(name)) {
    container
      .querySelector<HTMLElement>('.game-over__error')
      ?.removeAttribute('hidden');

    return;
  }

  addResult(name, state.score);
  state.isResultSaved = true;
  renderGameOver(container);
}

export function initGameOver(
  container: HTMLElement,
  onPlayAgain: () => void,
): void {
  container.addEventListener('submit', (event) => {
    event.preventDefault();
    saveResult(container);
  });

  container.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.closest('[data-action="play-again"]')) {
      onPlayAgain();
    }

    if (event.target.closest('[data-action="leaderboard"]')) {
      openLeaderboard();
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
      ${renderNameForm()}
      <div class="game-over__actions">
        <button class="button" type="button" data-action="leaderboard">
          Leaderboard
        </button>
        <button
          class="button button--primary"
          type="button"
          data-action="play-again"
        >
          Play Again
        </button>
      </div>
    </section>
  `;
}
