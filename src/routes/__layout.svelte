<script context="module">
  import { locale, loadTranslations } from '$lib/translations';
  import { browser } from '$app/env';

  export const load = async ({ url }) => {
    const { pathname } = url;
    if (browser) {
      const existingLang = JSON.parse(localStorage.getItem('lang') || '');
      if (existingLang) locale.forceSet(existingLang);
    }

    const defaultLocale = 'en'; // get from cookie, user session, ...
    const initLocale = locale.get() || defaultLocale; // set default if no locale already set

    await loadTranslations(initLocale, pathname); // keep this just before the `return`

    return {};
  };
</script>

<script lang="ts">
  import '../app.css';
  export const prerender = true;
</script>

<slot />
