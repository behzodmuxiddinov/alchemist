const PROFILE_HASH = '#/profile';
const GAME_HASH = '#/';

export function isProfileRoute(): boolean {
  return location.hash === PROFILE_HASH;
}

export function goToProfile(): void {
  location.hash = PROFILE_HASH;
}

export function goToGame(): void {
  location.hash = GAME_HASH;
}

export function initRouter(onChange: () => void): void {
  addEventListener('hashchange', onChange);
}
