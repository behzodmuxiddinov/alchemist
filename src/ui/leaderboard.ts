import { formatDate } from '@/logic/timer';
import { clearLeaderboard, readLeaderboard } from '@/storage/leaderboard';
import { openDialog } from './dialog';
import './leaderboard.scss';

function renderRows(): string {
  const entries = readLeaderboard();

  if (entries.length === 0) {
    return '<p class="leaderboard__empty">No results yet.</p>';
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
        <span>Name</span>
        <span>Score</span>
        <span>Date</span>
      </li>
      ${rows}
    </ol>
  `;
}

function renderContent(): string {
  return `
    ${renderRows()}
    <button class="button" type="button" data-action="clear">
      Clear Leaderboard
    </button>
  `;
}

function confirmClear(onCleared: () => void): void {
  const dialog = openDialog(
    'Clear Leaderboard',
    `
      <p>All saved results will be removed. This cannot be undone.</p>
      <button class="button" type="button" data-action="confirm-clear">
        Yes, clear it
      </button>
    `,
    'Cancel',
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
  const dialog = openDialog('Top 10', renderContent());
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
