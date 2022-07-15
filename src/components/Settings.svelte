<script lang="ts">
  import { settingsOpen, wallpaperUrl, bgColor } from '../stores/stores';
  import { shortcut, clickOutside } from '$lib/events';
  import { fly, fade } from 'svelte/transition';
  import CloseButton from './Primitives/CloseButton.svelte';
  import { onDestroy, onMount } from 'svelte';
  import Check from './svg/Check.svelte';

  let tempBgColor: string;

  onMount(() => {
    tempBgColor = $bgColor;
  });

  onDestroy(() => {
    console.log('Destroyed!');
  });

  function updateSettings() {
    bgColor.set(tempBgColor);
    localStorage.setItem('bgColor', JSON.stringify($bgColor));
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
    <h2 class="modalHeading">Ustawienia</h2>
    <div class="modalBox" transition:fly={{ duration: 250, y: -20 }}>
      <form on:submit|preventDefault={updateSettings} class="flex flex-col">
        <label for="bgColor" class="flex flex-row items-center justify-between">
          Kolor tła
          <input
            id="bgColor"
            type="color"
            class="pickerButton cursor-pointer"
            bind:value={tempBgColor}
          />
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
