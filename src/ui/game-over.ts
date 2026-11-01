import { t } from '@/i18n';
import {
  isValidPlayerName,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from '@/logic/player-name';
import { state } from '@/state/game-state';
import { addResult, isTopScore } from '@/storage/leaderboard';
import { openLeaderboard } from './leaderboard';
import './game-over.scss';

function renderNameForm(): string {
  if (state.isResultSaved) {
    return `<p class="game-over__saved">${t('gameOver.saved')}</p>`;
  }

  if (!isTopScore(state.score)) {
    return '';
  }

  return `
    <form class="game-over__form">
      <label class="game-over__label" for="player-name">
        ${t('gameOver.nameLabel')}
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
        ${t('gameOver.nameError', { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })}
      </p>
      <button class="button" type="submit">${t('gameOver.save')}</button>
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
      <h2 class="game-over__title">${t('gameOver.title')}</h2>
      <p class="game-over__reason">${t(`gameOver.reason.${reason}`)}</p>
      <p class="game-over__score">
        ${t('gameOver.score')}: <span class="game-over__value">${state.score}</span>
      </p>
      ${renderNameForm()}
      <div class="game-over__actions">
        <button class="button" type="button" data-action="leaderboard">
          ${t('gameOver.leaderboard')}
        </button>
        <button
          class="button button--primary"
          type="button"
          data-action="play-again"
        >
          ${t('gameOver.playAgain')}
        </button>
      </div>
    </section>
  `;
}
