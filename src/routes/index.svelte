<script lang="ts">
  import Bar from '../components/Bar.svelte';
	import Bookmark from '../components/Bookmark.svelte';
	import { bgColor, bookmarks, settingsOpen, wallpaperUrl } from '../stores/bookmarks';
	import { onMount } from 'svelte';
	import { shortcut } from '$lib/events';
	import NewBookmark from '../components/NewBookmark.svelte';
	import { addNewOpen } from '../stores/bookmarks';
	import Plus from '../components/svg/Plus.svelte';
	import Settings from '../components/Settings.svelte';
	import Cog from '../components/svg/Cog.svelte';
import { getTextColor, loadStorage } from '$lib/helpers';
  
  let elem: HTMLDivElement;
	let grid: HTMLDivElement;

	onMount(() => {
		setTimeout(() => {
			grid.style.opacity = '100';
		}, 50);		
		loadStorage();

    // elem.style.backgroundImage = `url(${$wallpaperUrl})`
		// wallpaperUrl.subscribe((value) => elem.style.backgroundImage = `url(${value})`)
    elem.style.backgroundColor = $bgColor
		bgColor.subscribe((value) => {
			elem.style.backgroundColor = value;
			elem.style.setProperty('--dynamic-primary-color', getTextColor(value))
		})

		console.log(getTextColor($bgColor))
		console.log($bgColor)
	});

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="fixed w-screen bottom-0 top-0 overflow-auto bg-neutral-900 text-dynamic flex justify-center items-start font-sans bg-no-repeat bg-cover"
  bind:this={elem}
>
	<main class="flex flex-col justify-center items-center p-10 w-3/5">
		<Bar />
		<div
			class="grid grid-flow-row grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 grid-rows-3 mt-[10rem] gap-1 w-fit transition-opacity opacity-50"
			bind:this={grid}
		>
			{#each $bookmarks as bookmark (bookmark.id)}
				<Bookmark
					href={bookmark.url}
					name={bookmark.name}
					bookmarkId={bookmark.id}
					url={bookmark.url}
					base64={bookmark.imageBase64}
				/>
			{/each}
		</div>
		<button
			type="button"
			on:click|stopPropagation={() => addNewOpen.update((m) => !m)}
			use:shortcut={{ control: true, code: 'KeyA' }}
			class="defaultBtn bg-neutral-800 p-2 bottom-0 right-0 m-4 absolute flex flex-col items-center gap-1"
		>
			<Plus />
			<kbd class="font-code text-neutral-500 text-[0.7rem]">Ctrl+A</kbd>
		</button>
		{#if $addNewOpen}
		<NewBookmark />
		{/if}
		<button
			type="button"
			on:click|stopPropagation={() => settingsOpen.update((m) => !m)}
			use:shortcut={{ control: true, code: 'KeyI' }}
			class="defaultBtn bg-neutral-800 p-2 bottom-0 left-0 m-4 absolute flex flex-col items-center gap-1"
		>
			<Cog />
			<kbd class="font-code text-neutral-500 text-[0.7rem]">Ctrl+I</kbd>
		</button>
		{#if $settingsOpen}
		<Settings />
		{/if}
	</main>
</div>
