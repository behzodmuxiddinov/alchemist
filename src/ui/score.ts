import { isRunning, state } from '@/state/game-state';
import './score.scss';

export function renderScore(container: HTMLElement): void {
  if (!isRunning()) {
    container.replaceChildren();

    return;
  }

  container.innerHTML = `
    <p class="score__label">Score</p>
    <p class="score__value">${state.score}</p>
  `;
}
