export type Locale = 'en' | 'ru';

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_ORDER: readonly Locale[] = ['en', 'ru'];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    (LOCALE_ORDER as readonly string[]).includes(value)
  );
}
