<script lang="ts">
	import { settingsOpen, wallpaperUrl } from '../stores/bookmarks';
	import { shortcut, clickOutside } from '$lib/events';
	import { fly, fade } from 'svelte/transition';
import CloseButton from './Primitives/CloseButton.svelte';
import { onMount } from 'svelte';

let tempWallpaperUrl: string;

onMount(() => {
  tempWallpaperUrl = $wallpaperUrl;
})

function updateWallpaper() {
  wallpaperUrl.set(tempWallpaperUrl)
  localStorage.setItem("wallpaperUrl", JSON.stringify($wallpaperUrl))
}

</script>

{#if $settingsOpen}
	<div
		class="modalBackdrop"
		transition:fade={{ duration: 100 }}
	>
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
			<div
				class="modalBox"
				transition:fly={{ duration: 250, y: -20 }}
			>
      <form on:submit|preventDefault={() => updateWallpaper}>
        <input type="url" class="border-2 border-blue-700 invalid:border-pink-500 bg-slate-800 outline-none" bind:value={tempWallpaperUrl} />
        <button type="submit" class="primaryActionBtn">Gotowe</button>
      </form>
      </div>
			<CloseButton onClick={() => {settingsOpen.set(false)}} />
		</div>
	</div>
{/if}
