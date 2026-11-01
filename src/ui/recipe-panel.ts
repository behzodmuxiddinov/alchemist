import { PARAMETER_KEYS } from '@/data/parameters';
import { t } from '@/i18n';
import {
  getMaxCauldronIngredients,
  isRunning,
  state,
} from '@/state/game-state';
import './recipe-panel.scss';

export function renderRecipePanel(container: HTMLElement): void {
  const recipe = state.activeRecipe;

  if (!recipe || !isRunning()) {
    container.replaceChildren();

    return;
  }

  const added = state.cauldronIngredients.length;
  const maxIngredients = getMaxCauldronIngredients();
  const isFull = added >= maxIngredients;

  const targets = PARAMETER_KEYS.map(
    (key) => `
      <li class="recipe__target recipe__target--${key}">
        <span>${t(`parameter.${key}`)}</span>
        <span>${recipe[key].min}..${recipe[key].max}</span>
      </li>
    `,
  ).join('');

  container.innerHTML = `
    <h2 class="recipe__title">${t('recipe.title')}</h2>
    <p class="recipe__name">${recipe.name}</p>
    <p class="recipe__counter ${isFull ? 'recipe__counter--full' : ''}">
      ${t('recipe.counter', { added, max: maxIngredients })}
    </p>
    <ul class="recipe__targets">${targets}</ul>
  `;
}
