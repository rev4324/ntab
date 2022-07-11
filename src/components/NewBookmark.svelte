<script lang="ts">
	import { bookmarks, addNewOpen } from '../stores/bookmarks';
	import type { BookmarkType } from '../stores/bookmarks';
	import Input from './Input.svelte';
	import Check from './svg/Check.svelte';
	import Image from './ModifyDialog/Image.svelte';
	import { shortcut, clickOutside } from '$lib/events';
	import { fly, fade } from 'svelte/transition';
	import CloseButton from './Primitives/CloseButton.svelte';

	const newBookmark: BookmarkType = {
		name: '',
		url: '',
		imageBase64: ''
	};
	const clear = () => {
		newBookmark.name = '';
		newBookmark.url = '';
		newBookmark.imageBase64 = '';
	};

	const addBookmark = () => {
		const bookmark: BookmarkType = {
			name: newBookmark.name,
			url: newBookmark.url,
			id: crypto.randomUUID(),
			imageBase64: ''
		};
		bookmarks.update((b) => [...b, bookmark]);
		console.log($bookmarks);
		localStorage.setItem('bookmarks', JSON.stringify($bookmarks));
		addNewOpen.update((m) => false);
		clear();
	};
</script>

	<div
		class="modalBackdrop"
		transition:fade={{ duration: 100 }}
	>
		<div
			use:shortcut={{
				code: 'Escape',
				callback: () => {
					addNewOpen.set(false);
					clear();
				}
			}}
			use:clickOutside
			on:outsideclick={() => {
				addNewOpen.set(false);
				clear();
			}}
		>
			<h2 class="modalHeading">Nowa zakładka</h2>
			<div class="modalBox" transition:fly={{ duration: 250, y: -20 }}>
				<form on:submit|preventDefault={addBookmark} class="flex flex-col">
					<div class="menu__input-column flex flex-col gap-2">
						<Image bind:img={newBookmark.imageBase64} bind:href={newBookmark.url} />
						<Input type="text" id="name" name="Nazwa" bind:bound={newBookmark.name} />
						<Input type="url" id="url" name="Adres URL" bind:bound={newBookmark.url} />
					</div>
					<div class="flex flex-row gap-[1px] items-center justify-center">
						<button class="primaryActionBtn" type="submit">
							<Check />
						</button>
					</div>
				</form>
			</div>
			<CloseButton
				onClick={() => {
					addNewOpen.set(false);
					clear();
				}}
			/>
		</div>
	</div>