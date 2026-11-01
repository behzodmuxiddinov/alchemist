import { readLocale, writeLocale } from '@/storage/locale';
import { EN } from './en';
import { RU } from './ru';
import { DEFAULT_LOCALE, type Locale } from './locales';
import type { Translation, TranslationKey } from './types';

export {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_LABELS,
  LOCALE_ORDER,
  type Locale,
} from './locales';
export type { TranslationKey } from './types';

const TRANSLATIONS: Record<Locale, Translation> = { en: EN, ru: RU };

const current: { locale: Locale } = {
  locale: readLocale() ?? DEFAULT_LOCALE,
};

export function getLocale(): Locale {
  return current.locale;
}

export function t(
  key: TranslationKey,
  values: Record<string, string | number> = {},
): string {
  return TRANSLATIONS[current.locale][key].replaceAll(
    /{(\w+)}/g,
    (match, name: string) => String(values[name] ?? match),
  );
}

export function applyLocale(): void {
  document.documentElement.lang = current.locale;
  document.title = t('app.title');
}

export function setLocale(locale: Locale): void {
  current.locale = locale;
  writeLocale(locale);
  applyLocale();
}
