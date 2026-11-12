import { t } from '@/i18n';
import { openDialog } from './dialog';

const PAUSE_CLASS = 'dialog--pause';

export function isPauseDialogOpen(): boolean {
  return Boolean(document.querySelector(`.${PAUSE_CLASS}`));
}

export function openPauseDialog(
  onResume: () => void,
  onExit: () => void,
): void {
  if (isPauseDialogOpen()) {
    return;
  }

  const dialog = openDialog(
    t('pause.title'),
    `
      <p>${t('pause.text')}</p>
      <button class="button" type="button" data-action="exit">
        ${t('pause.exit')}
      </button>
    `,
    t('pause.resume'),
  );

  dialog.classList.add(PAUSE_CLASS);

  let isExiting = false;

  dialog
    .querySelector('[data-action="exit"]')
    ?.addEventListener('click', () => {
      isExiting = true;
      dialog.close();
      onExit();
    });

  dialog.addEventListener('close', () => {
    if (!isExiting) {
      onResume();
    }
  });
}
