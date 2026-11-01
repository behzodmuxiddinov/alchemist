import { t } from '@/i18n';
import { formatDate } from '@/logic/timer';
import { clearLeaderboard, readLeaderboard } from '@/storage/leaderboard';
import { openDialog } from './dialog';
import './leaderboard.scss';

function renderRows(): string {
  const entries = readLeaderboard();

  if (entries.length === 0) {
    return `<p class="leaderboard__empty">${t('leaderboard.empty')}</p>`;
  }

  const rows = entries
    .map(
      (entry, index) => `
        <li class="leaderboard__row">
          <span class="leaderboard__rank">${index + 1}</span>
          <span class="leaderboard__name">${entry.name}</span>
          <span class="leaderboard__score">${entry.score}</span>
          <span class="leaderboard__date">${formatDate(entry.createdAt)}</span>
        </li>
      `,
    )
    .join('');

  return `
    <ol class="leaderboard">
      <li class="leaderboard__row leaderboard__row--head">
        <span>#</span>
        <span>${t('leaderboard.name')}</span>
        <span>${t('leaderboard.score')}</span>
        <span>${t('leaderboard.date')}</span>
      </li>
      ${rows}
    </ol>
  `;
}

function renderContent(): string {
  return `
    ${renderRows()}
    <button class="button" type="button" data-action="clear">
      ${t('leaderboard.clear')}
    </button>
  `;
}

function confirmClear(onCleared: () => void): void {
  const dialog = openDialog(
    t('leaderboard.clear'),
    `
      <p>${t('leaderboard.clearText')}</p>
      <button class="button" type="button" data-action="confirm-clear">
        ${t('leaderboard.clearConfirm')}
      </button>
    `,
    t('leaderboard.cancel'),
  );

  dialog
    .querySelector('[data-action="confirm-clear"]')
    ?.addEventListener('click', () => {
      clearLeaderboard();
      dialog.close();
      onCleared();
    });
}

export function openLeaderboard(): void {
  const dialog = openDialog(t('leaderboard.title'), renderContent());
  const content = dialog.querySelector('.dialog__content');

  dialog.addEventListener('click', (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('[data-action="clear"]')
    ) {
      confirmClear(() => {
        if (content) {
          content.innerHTML = renderContent();
        }
      });
    }
  });
}
