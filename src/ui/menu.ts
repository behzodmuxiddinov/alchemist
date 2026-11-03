import {
  DIFFICULTIES,
  DIFFICULTY_ORDER,
  isDifficulty,
} from '@/data/difficulty';
import {
  getLocale,
  isLocale,
  LOCALE_LABELS,
  LOCALE_ORDER,
  setLocale,
  t,
  type Locale,
} from '@/i18n';
import {
  canChangeDifficulty,
  hasSavedGame,
  setDifficulty,
  state,
} from '@/state/game-state';
import { isSignedIn } from '@/state/session';
import type { Difficulty } from '@/types/game.types';
import { openAuthDialog } from './auth';
import { openDialog } from './dialog';
import { openLeaderboard } from './leaderboard';
import './menu.scss';

function renderSummary(difficulty: Difficulty): string {
  const config = DIFFICULTIES[difficulty];

  return [
    t('menu.shelfSize', { count: config.shelfSize }),
    t('menu.cauldron', { count: config.maxCauldronIngredients }),
    t('menu.time', { count: config.startTime }),
    t('menu.tolerance', { count: config.tolerance }),
    t('menu.lives', { count: config.lives }),
    t('menu.score', { count: config.scorePerBrew }),
  ].join(' · ');
}

function renderOption(
  action: string,
  value: string,
  label: string,
  isActive: boolean,
): string {
  return `
    <button
      class="button menu__option ${isActive ? 'menu__option--active' : ''}"
      type="button"
      data-action="${action}"
      data-value="${value}"
      aria-pressed="${isActive}"
    >
      ${label}
    </button>
  `;
}

function renderLanguage(): string {
  const options = LOCALE_ORDER.map((locale: Locale) =>
    renderOption(
      'locale',
      locale,
      LOCALE_LABELS[locale],
      locale === getLocale(),
    ),
  ).join('');

  return `
    <p>${t('menu.language')}</p>
    <div class="menu__options">${options}</div>
  `;
}

function renderDifficulty(): string {
  if (!canChangeDifficulty()) {
    return `
      <p>${t('menu.difficultyFixed', { name: t(`difficulty.${state.difficulty}`) })}</p>
      <p class="menu__summary">${t('menu.difficultyLocked')}</p>
    `;
  }

  const options = DIFFICULTY_ORDER.map((difficulty) =>
    renderOption(
      'difficulty',
      difficulty,
      t(`difficulty.${difficulty}`),
      difficulty === state.difficulty,
    ),
  ).join('');

  return `
    <p>${t('common.difficulty')}</p>
    <div class="menu__options">${options}</div>
    <p class="menu__summary">${renderSummary(state.difficulty)}</p>
  `;
}

function renderSession(): string {
  if (isSignedIn()) {
    return '';
  }

  return `
    <button class="button" type="button" data-action="sign-in">
      ${t('menu.signIn')}
    </button>
  `;
}

function renderContinue(): string {
  if (!hasSavedGame()) {
    return '';
  }

  return `
    <button class="button" type="button" data-action="continue">
      ${t('menu.continue')}
    </button>
  `;
}

function renderMenu(): string {
  return `
    ${renderSession()}
    ${renderLanguage()}
    ${renderDifficulty()}
    ${renderContinue()}
    <button class="button button--primary" type="button" data-action="new-game">
      ${t('menu.newGame')}
    </button>
    <button class="button" type="button" data-action="leaderboard">
      ${t('menu.leaderboard')}
    </button>
  `;
}

export interface IMenuHandlers {
  onStart: () => void;
  onContinue: () => void;
  onRender: () => void;
}

export function openMenu(handlers: IMenuHandlers): void {
  const dialog = openDialog(t('menu.title'), renderMenu());
  const content = dialog.querySelector('.dialog__content');

  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('[data-action]');
    const { value } = button?.dataset ?? {};

    switch (button?.dataset.action) {
      case 'locale': {
        if (isLocale(value)) {
          setLocale(value);
          dialog.close();
          handlers.onRender();
          openMenu(handlers);
        }

        break;
      }
      case 'difficulty': {
        if (content && isDifficulty(value)) {
          setDifficulty(value);
          content.innerHTML = renderMenu();
          handlers.onRender();
        }

        break;
      }
      case 'continue': {
        dialog.close();
        handlers.onContinue();

        break;
      }
      case 'new-game': {
        dialog.close();
        handlers.onStart();

        break;
      }
      case 'sign-in': {
        dialog.close();
        openAuthDialog(handlers.onRender);

        break;
      }
      case 'leaderboard': {
        dialog.close();
        openLeaderboard();

        break;
      }
    }
  });
}
