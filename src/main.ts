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
  setGameOverListener,
  startGame,
  tick,
} from '@/state/game-state';
import { applyLocale, t } from '@/i18n';
import { getLayout } from '@/ui/layout';
import { initShelf, renderShelf } from '@/ui/shelf';
import { renderCauldron } from '@/ui/cauldron';
import { initActions, renderActions } from '@/ui/actions';
import { renderHud } from '@/ui/hud';
import { renderScore } from '@/ui/score';
import { renderBars } from '@/ui/bars';
import { renderRecipePanel } from '@/ui/recipe-panel';
import { initGameOver, renderGameOver } from '@/ui/game-over';
import { openPauseDialog } from '@/ui/pause';
import { initAvatar, renderAvatar } from '@/ui/avatar';
import { initProfilePage, renderProfilePage } from '@/ui/profile';
import { goToProfile, initRouter, isProfileRoute } from '@/ui/router';
import { initSession, isSignedIn } from '@/state/session';
import { saveRun } from '@/service/runs';

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
app.innerHTML = getLayout();

const hudElement = getElement('#hud');
const shelfElement = getElement('#shelf');
const cauldronElement = getElement('#cauldron');
const recipeElement = getElement('#recipe');
const scoreElement = getElement('#score');
const barsElement = getElement('#bars');
const actionsElement = getElement('#actions');
const overlayElement = getElement('#overlay');
const gameElement = getElement('.game');
const avatarElement = getElement('#avatar');
const titleElement = getElement('.game__title');
const profileElement = getElement('#profile');

function render(): void {
  const isProfile = isProfileRoute() && isSignedIn();

  gameElement.hidden = isProfile;
  profileElement.hidden = !isProfile;
  document.title = t(isProfile ? 'profile.title' : 'app.title');

  if (isProfile) {
    renderProfilePage(profileElement);

    return;
  }

  titleElement.textContent = t('app.title');
  renderHud(hudElement);
  renderAvatar(avatarElement);
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

function handleRoute(): void {
  if (isProfileRoute()) {
    pauseGame();
    render();

    return;
  }

  render();

  if (isPaused()) {
    openPauseOverlay();
  }
}

initSession(render);

initRouter(handleRoute);

initAvatar(avatarElement, goToProfile);

initProfilePage(profileElement);

setGameOverListener((run) => {
  void saveRun(run);
});

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
