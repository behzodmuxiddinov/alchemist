import { getUserPhoto, getUsername, isSignedIn } from '@/state/session';
import { escapeHtml } from './escape';
import './avatar.scss';

export function renderAvatarContent(): string {
  const photo = getUserPhoto();

  return photo
    ? `<img class="avatar__image" src="${escapeHtml(photo)}" alt="" />`
    : escapeHtml(getUsername().slice(0, 1).toUpperCase());
}

export function renderAvatar(container: HTMLElement): void {
  if (!isSignedIn()) {
    container.replaceChildren();

    return;
  }

  container.innerHTML = `
    <button
      class="avatar"
      type="button"
      data-action="profile"
      aria-label="${escapeHtml(getUsername())}"
    >
      ${renderAvatarContent()}
    </button>
  `;
}

export function initAvatar(container: HTMLElement, onOpen: () => void): void {
  container.addEventListener('click', (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('[data-action="profile"]')
    ) {
      onOpen();
    }
  });
}
