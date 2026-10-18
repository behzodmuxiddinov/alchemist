import {
  getBarScale,
  isInRange,
  PARAMETER_KEYS,
  toPercent,
  type ParameterKey,
} from '@/logic/bar-scale';
import {
  getCauldronValues,
  isPlaying,
  maxCauldronIngredients,
  state,
} from '@/state/game-state';
import type { ICauldronValues, IRecipeRange } from '@/types/game.types';
import './bars.scss';

const LABELS: Record<ParameterKey, string> = {
  temperature: 'Temperature',
  density: 'Density',
  magicPower: 'Magic Power',
};

function renderBar(
  key: ParameterKey,
  values: ICauldronValues,
  target: IRecipeRange,
): string {
  const scale = getBarScale(key, maxCauldronIngredients);
  const value = values[key];
  const zoneStart = toPercent(target.min, scale);
  const zoneEnd = toPercent(target.max, scale);

  return `
    <li class="bar bar--${key} ${isInRange(value, target) ? 'bar--matched' : ''}">
      <p class="bar__head">
        <span class="bar__label">${LABELS[key]}</span>
        <span class="bar__value">${value}</span>
      </p>
      <div class="bar__track">
        <span
          class="bar__zone"
          style="--start: ${zoneStart}%; --size: ${zoneEnd - zoneStart}%"
        ></span>
        <span class="bar__zero" style="--position: ${toPercent(0, scale)}%"></span>
        <span
          class="bar__marker"
          style="--position: ${toPercent(value, scale)}%"
        ></span>
      </div>
      <p class="bar__target">${target.min}..${target.max}</p>
    </li>
  `;
}

export function renderBars(container: HTMLElement): void {
  const recipe = state.activeRecipe;

  if (!recipe || !isPlaying()) {
    container.replaceChildren();

    return;
  }

  const values = getCauldronValues();

  container.innerHTML = `
    <ul class="bars">
      ${PARAMETER_KEYS.map((key) => renderBar(key, values, recipe[key])).join('')}
    </ul>
  `;
}
