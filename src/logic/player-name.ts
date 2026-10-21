export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 15;

const ALLOWED_CHARACTERS = /^[\p{L}\p{N} _-]+$/u;

export function isValidPlayerName(name: string): boolean {
  return (
    name.length >= MIN_NAME_LENGTH &&
    name.length <= MAX_NAME_LENGTH &&
    ALLOWED_CHARACTERS.test(name)
  );
}
