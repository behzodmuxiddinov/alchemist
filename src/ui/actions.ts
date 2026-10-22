import { RULES } from '@/data/rules';
import { canBrew, isPlaying, isRunning } from '@/state/game-state';
import { openDialog } from './dialog';
import { openMenu } from './menu';
import './actions.scss';

export interface IActionHandlers {
  onStart: () => void;
  onBrew: () => void;
  onPause: () => void;
  onRender: () => void;
}

function renderRules(): string {
  return RULES.map((rule) => `<p>${rule}</p>`).join('');
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
        openMenu(handlers.onStart, handlers.onRender);

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
