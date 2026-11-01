import '@/styles/main.scss';
import {
  addIngredient,
  brew,
  continueGame,
  exitToMenu,
  isPaused,
  isPlaying,
  pauseGame,
  resumeGame,
  startGame,
  tick,
} from '@/state/game-state';
import { applyLocale, t } from '@/i18n';
import { getGameLayout } from '@/ui/layout';
import { initShelf, renderShelf } from '@/ui/shelf';
import { renderCauldron } from '@/ui/cauldron';
import { initActions, renderActions } from '@/ui/actions';
import { renderHud } from '@/ui/hud';
import { renderScore } from '@/ui/score';
import { renderBars } from '@/ui/bars';
import { renderRecipePanel } from '@/ui/recipe-panel';
import { initGameOver, renderGameOver } from '@/ui/game-over';
import { openPauseDialog } from '@/ui/pause';

const TICK_INTERVAL = 500;

function getElement(selector: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Element ${selector} is missing`);
  }

  return element;
}

const app = getElement('#app');

applyLocale();
app.innerHTML = getGameLayout();

const hudElement = getElement('#hud');
const shelfElement = getElement('#shelf');
const cauldronElement = getElement('#cauldron');
const recipeElement = getElement('#recipe');
const scoreElement = getElement('#score');
const barsElement = getElement('#bars');
const actionsElement = getElement('#actions');
const overlayElement = getElement('#overlay');
const gameElement = getElement('.game');
const titleElement = getElement('.game__title');

function render(): void {
  titleElement.textContent = t('app.title');
  renderHud(hudElement);
  renderScore(scoreElement);
  renderShelf(shelfElement);
  renderCauldron(cauldronElement);
  renderRecipePanel(recipeElement);
  renderBars(barsElement);
  renderActions(actionsElement);
  renderGameOver(overlayElement);
  gameElement.classList.toggle('game--paused', isPaused());
}

function restart(): void {
  startGame();
  render();
}

initShelf(shelfElement, (id) => {
  addIngredient(id);
  render();
});

function openPauseOverlay(): void {
  openPauseDialog(
    () => {
      resumeGame();
      render();
    },
    () => {
      exitToMenu();
      render();
    },
  );
}

function pause(): void {
  if (!isPlaying()) {
    return;
  }

  pauseGame();
  render();
  openPauseOverlay();
}

function continueSaved(): void {
  continueGame();

  if (!isPaused()) {
    return;
  }

  render();
  openPauseOverlay();
}

initActions(actionsElement, {
  onStart: restart,
  onContinue: continueSaved,
  onBrew: () => {
    brew();
    render();
  },
  onPause: pause,
  onRender: render,
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pause();
  }
});

initGameOver(overlayElement, restart);

setInterval(() => {
  if (!isPlaying()) {
    return;
  }

  tick();
  renderHud(hudElement);

  if (!isPlaying()) {
    render();
  }
}, TICK_INTERVAL);

render();
