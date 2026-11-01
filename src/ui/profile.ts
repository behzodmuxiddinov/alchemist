import { t } from '@/i18n';
import { signOutUser } from '@/service/auth';
import { getUserEmail, getUsername } from '@/state/session';
import { renderAvatarContent } from './avatar';
import { openDialog } from './dialog';
import { escapeHtml } from './escape';
import './profile.scss';

function renderProfile(): string {
  return `
    <div class="profile">
      <span class="avatar avatar--large">${renderAvatarContent()}</span>
      <p class="profile__name">${escapeHtml(getUsername())}</p>
      <p class="profile__email">${escapeHtml(getUserEmail())}</p>
    </div>
    <button class="button" type="button" data-action="sign-out">
      ${t('profile.signOut')}
    </button>
  `;
}

export function openProfile(): void {
  const dialog = openDialog(t('profile.title'), renderProfile());

  dialog.addEventListener('click', (event) => {
    if (
      !(event.target instanceof HTMLElement) ||
      !event.target.closest('[data-action="sign-out"]')
    ) {
      return;
    }

    dialog.close();
    void signOutUser();
  });
}
