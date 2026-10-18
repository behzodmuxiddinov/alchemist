import { RULES } from '@/data/rules';
import { isPlaying } from '@/state/game-state';
import { openDialog } from './dialog';
import './actions.scss';

function renderRules(): string {
  return RULES.map((rule) => `<p>${rule}</p>`).join('');
}

function renderMenu(): string {
  return `
    <p>Start a new run with the current difficulty.</p>
    <button class="button button--primary" type="button" data-action="new-game">
      New Game
    </button>
  `;
}

function openMenu(onStart: () => void): void {
  const dialog = openDialog('Menu', renderMenu());

  dialog
    .querySelector('[data-action="new-game"]')
    ?.addEventListener('click', () => {
      dialog.close();
      onStart();
    });
}

export function initActions(container: HTMLElement, onStart: () => void): void {
  container.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const action =
      event.target.closest<HTMLButtonElement>('[data-action]')?.dataset.action;

    switch (action) {
      case 'start': {
        onStart();

        break;
      }
      case 'help': {
        openDialog('How to play', renderRules());

        break;
      }
      case 'menu': {
        openMenu(onStart);

        break;
      }
      // No default
    }
  });
}

export function renderActions(container: HTMLElement): void {
  const mainButton = isPlaying()
    ? ''
    : `
      <button class="button button--primary" type="button" data-action="start">
        Start Game
      </button>
    `;

  container.innerHTML = `
    <button class="button" type="button" data-action="help">Help</button>
    ${mainButton}
    <button class="button" type="button" data-action="menu">Menu</button>
  `;
}
