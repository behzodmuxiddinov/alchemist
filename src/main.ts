import '@/styles/main.scss';
import { addIngredient, startGame, state } from '@/state/game-state';
import { GAME_LAYOUT } from '@/ui/layout';
import { initShelf, renderShelf } from '@/ui/shelf';
import { renderCauldron } from '@/ui/cauldron';
import { initActions, renderActions } from '@/ui/actions';
import { renderHud } from '@/ui/hud';

function getElement(selector: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Element ${selector} is missing`);
  }

  return element;
}

const app = getElement('#app');

app.innerHTML = GAME_LAYOUT;

const hudElement = getElement('#hud');
const shelfElement = getElement('#shelf');
const cauldronElement = getElement('#cauldron');
const actionsElement = getElement('#actions');

function render(): void {
  renderHud(hudElement);
  renderShelf(shelfElement);
  renderCauldron(cauldronElement);
  renderActions(actionsElement);
}

initShelf(shelfElement, (id) => {
  addIngredient(id);
  render();
});

initActions(actionsElement, () => {
  startGame();
  render();
});

render();

startGame();
state.shelfStock['dragon-tears'] = 0;
state.shelfStock['fairy-dust'] = 1;
render();

startGame();
state.shelfStock['dragon-tears'] = 0;
render();
