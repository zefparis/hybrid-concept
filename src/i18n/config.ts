export type Locale = 'en' | 'fr' | 'pt';

export const locales: Locale[] = ['en', 'fr', 'pt'];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: 'GB',
  fr: 'FR',
  pt: 'PT',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
