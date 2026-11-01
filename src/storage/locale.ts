import { isLocale } from '@/i18n/locales';
import type { Locale } from '@/i18n/locales';

const STORAGE_KEY = 'alchemist-locale';

export function readLocale(): Locale | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return isLocale(raw) ? raw : undefined;
  } catch {
    return undefined;
  }
}

export function writeLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    return;
  }
}
