import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = {
  loaders: [
    {
      locale: 'en',
      key: 'newBookmark',
      loader: async () => (await import('../i18n/en/newBookmark.json')).default
    },
    {
      locale: 'en',
      key: 'settings',
      loader: async () => (await import('../i18n/en/settings.json')).default
    },
    {
      locale: 'en',
      key: 'timeAndDate',
      loader: async () => (await import('../i18n/en/timeAndDate.json')).default
    },
    {
      locale: 'pl',
      key: 'newBookmark',
      loader: async () => (await import('../i18n/pl/newBookmark.json')).default
    },
    {
      locale: 'pl',
      key: 'settings',
      loader: async () => (await import('../i18n/pl/settings.json')).default
    },
    {
      locale: 'pl',
      key: 'timeAndDate',
      loader: async () => (await import('../i18n/pl/timeAndDate.json')).default
    }
  ]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
