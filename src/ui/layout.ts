import { t } from '@/i18n';
import './layout.scss';

export function getGameLayout(): string {
  return `
    <div class="game">
      <header class="game__hud">
        <div class="hud" id="hud"></div>
        <div id="avatar"></div>
      </header>
      <h1 class="game__title">${t('app.title')}</h1>
      <section class="game__shelf panel" id="shelf"></section>
      <div class="game__center">
        <section class="game__score" id="score"></section>
        <section id="cauldron"></section>
      </div>
      <section class="game__recipe panel" id="recipe"></section>
      <section class="game__bars" id="bars"></section>
      <footer class="game__actions" id="actions"></footer>
      <div class="game__overlay" id="overlay"></div>
    </div>
  `;
}
