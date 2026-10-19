import '@/styles/main.scss';
import { addIngredient, brew, startGame } from '@/state/game-state';
import { GAME_LAYOUT } from '@/ui/layout';
import { initShelf, renderShelf } from '@/ui/shelf';
import { renderCauldron } from '@/ui/cauldron';
import { initActions, renderActions } from '@/ui/actions';
import { renderHud } from '@/ui/hud';
import { renderBars } from '@/ui/bars';
import { renderRecipePanel } from '@/ui/recipe-panel';

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
const recipeElement = getElement('#recipe');
const barsElement = getElement('#bars');
const actionsElement = getElement('#actions');

function render(): void {
  renderHud(hudElement);
  renderShelf(shelfElement);
  renderCauldron(cauldronElement);
  renderRecipePanel(recipeElement);
  renderBars(barsElement);
  renderActions(actionsElement);
}

initShelf(shelfElement, (id) => {
  addIngredient(id);
  render();
});

initActions(
  actionsElement,
  () => {
    startGame();
    render();
  },
  () => {
    brew();
    render();
  },
);

render();
