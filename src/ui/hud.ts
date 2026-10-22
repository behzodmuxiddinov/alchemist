import { DIFFICULTY_LABELS, LOW_TIME_SECONDS } from '@/data/difficulty';
import { formatTime } from '@/logic/timer';
import { getStartTime, state } from '@/state/game-state';
import './hud.scss';

export function renderHud(container: HTMLElement): void {
  const lives = '<span class="hud__life">&#10084;</span>'.repeat(state.lives);
  const fill = Math.min(100, (state.timeLeft / getStartTime()) * 100);
  const isLow = state.timeLeft > 0 && state.timeLeft <= LOW_TIME_SECONDS;

  container.innerHTML = `
    <p class="hud__difficulty">${DIFFICULTY_LABELS[state.difficulty]}</p>
    <p class="hud__item">Score: <span class="hud__value">${state.score}</span></p>
    <div class="hud__timer ${isLow ? 'hud__timer--low' : ''}">
      <p class="hud__item">Time: <span class="hud__value">${formatTime(state.timeLeft)}</span></p>
      <span class="hud__time-track">
        <span class="hud__time-fill" style="--fill: ${fill}%"></span>
      </span>
    </div>
    <p class="hud__lives">${lives}</p>
  `;
}
