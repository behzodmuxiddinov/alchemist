import {
  DIFFICULTIES,
  DIFFICULTY_LABELS,
  DIFFICULTY_ORDER,
  isDifficulty,
} from '@/data/difficulty';
import { canChangeDifficulty, setDifficulty, state } from '@/state/game-state';
import type { Difficulty } from '@/types/game.types';
import { openDialog } from './dialog';
import { openLeaderboard } from './leaderboard';
import './menu.scss';

function renderSummary(difficulty: Difficulty): string {
  const config = DIFFICULTIES[difficulty];

  return [
    `${config.shelfSize} ingredients`,
    `${config.maxCauldronIngredients} in the cauldron`,
    `${config.startTime} s`,
    `tolerance ±${config.tolerance}`,
    `${config.lives} lives`,
    `${config.scorePerBrew} per brew`,
  ].join(' · ');
}

function renderOption(difficulty: Difficulty): string {
  const isActive = difficulty === state.difficulty;

  return `
    <button
      class="button menu__option ${isActive ? 'menu__option--active' : ''}"
      type="button"
      data-action="difficulty"
      data-difficulty="${difficulty}"
      aria-pressed="${isActive}"
    >
      ${DIFFICULTY_LABELS[difficulty]}
    </button>
  `;
}

function renderDifficulty(): string {
  if (!canChangeDifficulty()) {
    return `
      <p>Difficulty: ${DIFFICULTY_LABELS[state.difficulty]}</p>
      <p class="menu__summary">It can only be changed before a run starts.</p>
    `;
  }

  return `
    <p>Difficulty</p>
    <div class="menu__options">
      ${DIFFICULTY_ORDER.map((difficulty) => renderOption(difficulty)).join('')}
    </div>
    <p class="menu__summary">${renderSummary(state.difficulty)}</p>
  `;
}

function renderMenu(): string {
  return `
    ${renderDifficulty()}
    <button class="button button--primary" type="button" data-action="new-game">
      New Game
    </button>
    <button class="button" type="button" data-action="leaderboard">
      Leaderboard
    </button>
  `;
}

export function openMenu(onStart: () => void, onRender: () => void): void {
  const dialog = openDialog('Menu', renderMenu());
  const content = dialog.querySelector('.dialog__content');

  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('[data-action]');

    switch (button?.dataset.action) {
      case 'difficulty': {
        const { difficulty } = button.dataset;

        if (content && isDifficulty(difficulty)) {
          setDifficulty(difficulty);
          content.innerHTML = renderMenu();
          onRender();
        }

        break;
      }
      case 'new-game': {
        dialog.close();
        onStart();

        break;
      }
      case 'leaderboard': {
        dialog.close();
        openLeaderboard();

        break;
      }
      // No default
    }
  });
}
