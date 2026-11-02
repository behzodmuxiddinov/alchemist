import { t } from '@/i18n';
import { signOutUser } from '@/service/auth';
import { getUserEmail, getUsername, isSignedIn } from '@/state/session';
import { renderAvatarContent } from './avatar';
import { openDialog } from './dialog';
import { escapeHtml } from './escape';
import { goToGame } from './router';
import './profile.scss';

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
      <p class="profile__empty">${t('profile.empty')}</p>
    </section>
  `;
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
