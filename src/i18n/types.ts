import type { EN } from './en';

export type TranslationKey = keyof typeof EN;

export type Translation = Record<TranslationKey, string>;
