import { getStock } from '@/logic/stock';
import { getVisibleShelf, isCauldronFull, state } from '@/state/game-state';
import type { IIngredient } from '@/types/game.types';
import './shelf.scss';

function renderCard(ingredient: IIngredient): string {
  const stock = getStock(state.shelfStock, ingredient.id);
  const isEmpty = stock === 0;
  const isDisabled = isEmpty || isCauldronFull();

  return `
    <li class="shelf__slot">
      <button
        class="card ${isEmpty ? 'card--empty' : ''}"
        type="button"
        data-ingredient="${ingredient.id}"
        ${isDisabled ? 'disabled' : ''}
      >
        <span class="card__icon">${isEmpty ? '' : ingredient.icon}</span>
        <span class="card__body">
          <span class="card__name">${ingredient.name}</span>
          <span class="card__values">
            <span class="chip chip--temperature">T${ingredient.temperature}</span>
            <span class="chip chip--density">D${ingredient.density}</span>
            <span class="chip chip--magic">MP${ingredient.magicPower}</span>
          </span>
        </span>
        <span class="card__stock">${stock}</span>
      </button>
    </li>
  `;
}

export function initShelf(
  container: HTMLElement,
  onAdd: (id: string) => void,
): void {
  container.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('[data-ingredient]');

    if (button?.dataset.ingredient) {
      onAdd(button.dataset.ingredient);
    }
  });
}

export function renderShelf(container: HTMLElement): void {
  container.innerHTML = `
    <h2 class="shelf__title">Ingredients</h2>
    <ul class="shelf__list">
      ${getVisibleShelf()
        .map((ingredient) => renderCard(ingredient))
        .join('')}
    </ul>
  `;
}
