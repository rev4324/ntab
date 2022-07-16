<script lang="ts">
  import { settingsOpen, wallpaperUrl, bgColor } from '../stores/stores';
  import { shortcut, clickOutside } from '$lib/events';
  import { fly, fade } from 'svelte/transition';
  import CloseButton from './Primitives/CloseButton.svelte';
  import { onDestroy, onMount } from 'svelte';
  import Check from './svg/Check.svelte';
  import { t, locale, locales } from '$lib/translations';

  let tempBgColor: string;
  let tempLang: string;

  onMount(() => {
    tempBgColor = $bgColor;
    tempLang = $locale;
  });

  onDestroy(() => {
    console.log('Destroyed!');
  });

  function updateSettings() {
    bgColor.set(tempBgColor);
    localStorage.setItem('bgColor', JSON.stringify($bgColor));
    locale.set(tempLang);
    localStorage.setItem('lang', JSON.stringify(tempLang));
  }
</script>

<div class="modalBackdrop text-neutral-300" transition:fade={{ duration: 100 }}>
  <div
    use:shortcut={{
      code: 'Escape',
      callback: () => {
        settingsOpen.set(false);
      }
    }}
    use:clickOutside
    on:outsideclick={() => {
      settingsOpen.set(false);
    }}
  >
    <h2 class="modalHeading">{$t('settings.heading')}</h2>
    <div class="modalBox" transition:fly={{ duration: 250, y: -20 }}>
      <form on:submit|preventDefault={updateSettings} class="flex flex-col gap-3">
        <label for="bgColor" class="flex flex-row items-center justify-between">
          {$t('settings.bgColor')}
          <input
            id="bgColor"
            type="color"
            class="pickerButton cursor-pointer"
            bind:value={tempBgColor}
          />
        </label>
        <label for="lang" class="flex flex-row items-center justify-between">
          {$t('settings.lang')}
          <!-- <input id="lang" type="" bind:value={tempLang} /> -->
          <select id="lang" class="bg-neutral-600 rounded p-1 pl-2 pr-2" bind:value={tempLang}>
            {#each $locales as locale}
              <option value={locale}>{locale}</option>
            {/each}
          </select>
        </label>
        <button type="submit" class="primaryActionBtn"><Check /></button>
      </form>
    </div>
    <CloseButton
      onClick={() => {
        settingsOpen.set(false);
      }}
    />
  </div>
</div>
