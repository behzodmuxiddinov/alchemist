import { t } from '@/i18n';
import { formatDate } from '@/logic/timer';
import { readRuns } from '@/service/runs';
import { signOutUser } from '@/service/auth';
import { getUserEmail, getUsername, isSignedIn } from '@/state/session';
import type { IRunEntry } from '@/types/game.types';
import { renderAvatarContent } from './avatar';
import { openDialog } from './dialog';
import { escapeHtml } from './escape';
import { goToGame } from './router';
import './profile.scss';

function renderRun(run: IRunEntry): string {
  return `
    <li class="history__row">
      <span class="history__date">${formatDate(run.playedAt)}</span>
      <span class="history__difficulty">${t(`difficulty.${run.difficulty}`)}</span>
      <span class="history__score">${run.score}</span>
      <span class="history__reason">${t(`gameOver.reason.${run.reason}`)}</span>
    </li>
  `;
}

function renderHistory(runs: IRunEntry[]): string {
  if (runs.length === 0) {
    return `<p class="profile__empty">${t('profile.empty')}</p>`;
  }

  const rows = runs.map((run) => renderRun(run)).join('');

  return `
    <ol class="history">
      <li class="history__row history__row--head">
        <span>${t('common.date')}</span>
        <span>${t('common.difficulty')}</span>
        <span>${t('common.score')}</span>
        <span>${t('common.reason')}</span>
      </li>
      ${rows}
    </ol>
  `;
}

async function fillHistory(container: HTMLElement): Promise<void> {
  let content: string;

  try {
    content = renderHistory(await readRuns());
  } catch {
    content = `<p class="profile__empty">${t('profile.loadError')}</p>`;
  }

  const element = container.querySelector('.profile__history');

  if (element) {
    element.innerHTML = content;
  }
}

export function renderProfilePage(container: HTMLElement): void {
  if (!isSignedIn()) {
    container.replaceChildren();

    return;
  }

  container.innerHTML = `
    <button class="button profile__back" type="button" data-action="back">
      &#8592; ${t('profile.back')}
    </button>
    <header class="profile__head">
      <span class="avatar avatar--large">${renderAvatarContent()}</span>
      <div class="profile__identity">
        <h1 class="profile__name">${escapeHtml(getUsername())}</h1>
        <p class="profile__email">${escapeHtml(getUserEmail())}</p>
      </div>
      <button class="button" type="button" data-action="sign-out">
        ${t('profile.signOut')}
      </button>
    </header>
    <section class="profile__panel panel">
      <h2 class="profile__section">${t('profile.history')}</h2>
      <div class="profile__history">
        <p class="profile__empty">${t('common.loading')}</p>
      </div>
    </section>
  `;

  void fillHistory(container);
}

function confirmSignOut(): void {
  const dialog = openDialog(
    t('profile.signOut'),
    `
      <p>${t('profile.signOutText')}</p>
      <button class="button" type="button" data-action="confirm-sign-out">
        ${t('profile.signOutConfirm')}
      </button>
    `,
    t('common.cancel'),
  );

  dialog
    .querySelector('[data-action="confirm-sign-out"]')
    ?.addEventListener('click', () => {
      dialog.close();
      goToGame();
      void signOutUser();
    });
}

export function initProfilePage(container: HTMLElement): void {
  container.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const action =
      event.target.closest<HTMLButtonElement>('[data-action]')?.dataset.action;

    switch (action) {
      case 'back': {
        goToGame();

        break;
      }
      case 'sign-out': {
        confirmSignOut();

        break;
      }
    }
  });
}
