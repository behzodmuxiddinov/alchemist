import {
  getMaxCauldronIngredients,
  isRunning,
  state,
} from '@/state/game-state';
import './cauldron.scss';

export function renderCauldron(container: HTMLElement): void {
  const { cauldronIngredients } = state;
  const fillLevel = cauldronIngredients.length / getMaxCauldronIngredients();

  const items = cauldronIngredients
    .map(
      (ingredient) => `
        <li class="cauldron__item">
          <span class="cauldron__icon">${ingredient.icon}</span>
          ${ingredient.name}
        </li>
      `,
    )
    .join('');

  const details = isRunning() ? `<ul class="cauldron__list">${items}</ul>` : '';

  container.innerHTML = `
    <div class="cauldron">
      <div class="cauldron__pot">
        <div class="cauldron__bowl">
          <div class="cauldron__liquid" style="--fill: ${fillLevel}"></div>
        </div>
        <span class="cauldron__rim"></span>
      </div>
      ${details}
    </div>
  `;
}
