import { state } from '@/state/game-state';
import { formatTime } from '@/logic/timer';
import './hud.scss';

export function renderHud(container: HTMLElement): void {
  const lives = '<span class="hud__life">&#10084;</span>'.repeat(state.lives);

  container.innerHTML = `
    <p class="hud__item">Score: <span class="hud__value">${state.score}</span></p>
    <p class="hud__item">Time: <span class="hud__value">${formatTime(state.timeLeft)}</span></p>
    <p class="hud__lives">${lives}</p>
  `;
}
