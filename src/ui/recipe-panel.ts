import { PARAMETER_KEYS, PARAMETER_LABELS } from '@/data/parameters';
import { isRunning, maxCauldronIngredients, state } from '@/state/game-state';
import './recipe-panel.scss';

export function renderRecipePanel(container: HTMLElement): void {
  const recipe = state.activeRecipe;

  if (!recipe || !isRunning()) {
    container.replaceChildren();

    return;
  }

  const added = state.cauldronIngredients.length;
  const isFull = added >= maxCauldronIngredients;

  const targets = PARAMETER_KEYS.map(
    (key) => `
      <li class="recipe__target recipe__target--${key}">
        <span>${PARAMETER_LABELS[key]}</span>
        <span>${recipe[key].min}..${recipe[key].max}</span>
      </li>
    `,
  ).join('');

  container.innerHTML = `
    <h2 class="recipe__title">Current Recipe</h2>
    <p class="recipe__name">${recipe.name}</p>
    <p class="recipe__counter ${isFull ? 'recipe__counter--full' : ''}">
      Ingredients: ${added} / ${maxCauldronIngredients}
    </p>
    <ul class="recipe__targets">${targets}</ul>
  `;
}
