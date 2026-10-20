import { RULES } from '@/data/rules';
import { canBrew, isPlaying, isRunning } from '@/state/game-state';
import { openDialog } from './dialog';
import './actions.scss';

export interface IActionHandlers {
  onStart: () => void;
  onBrew: () => void;
  onPause: () => void;
}

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

export function initActions(
  container: HTMLElement,
  handlers: IActionHandlers,
): void {
  container.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const action =
      event.target.closest<HTMLButtonElement>('[data-action]')?.dataset.action;

    switch (action) {
      case 'start': {
        handlers.onStart();

        break;
      }
      case 'brew': {
        handlers.onBrew();

        break;
      }
      case 'pause': {
        handlers.onPause();

        break;
      }
      case 'help': {
        openDialog('How to play', renderRules());

        break;
      }
      case 'menu': {
        openMenu(handlers.onStart);

        break;
      }
      // No default
    }
  });
}

export function renderActions(container: HTMLElement): void {
  const mainButton = isRunning()
    ? `
      <button
        class="button button--primary"
        type="button"
        data-action="brew"
        ${canBrew() ? '' : 'disabled'}
      >
        Brew
      </button>
    `
    : `
      <button class="button button--primary" type="button" data-action="start">
        Start Game
      </button>
    `;

  const pauseButton = isPlaying()
    ? '<button class="button" type="button" data-action="pause">Pause</button>'
    : '';

  container.innerHTML = `
    <button class="button" type="button" data-action="help">Help</button>
    <div class="actions__main">
      ${pauseButton}
      ${mainButton}
    </div>
    <button class="button" type="button" data-action="menu">Menu</button>
  `;
}
