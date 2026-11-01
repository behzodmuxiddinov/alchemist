import type { TranslationKey } from '@/i18n';
import { isValidPlayerName } from './player-name';

export interface ICredentials {
  email: string;
  password: string;
  confirm?: string;
  name?: string;
}

export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

export function getCredentialsError({
  email,
  password,
  confirm,
  name,
}: ICredentials): TranslationKey | undefined {
  if (!EMAIL_PATTERN.test(email)) {
    return 'auth.error.emailFormat';
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'auth.error.passwordLength';
  }

  if (confirm !== undefined && confirm !== password) {
    return 'auth.error.confirmMismatch';
  }

  if (name !== undefined && !isValidPlayerName(name)) {
    return 'auth.error.nameInvalid';
  }

  return;
}
