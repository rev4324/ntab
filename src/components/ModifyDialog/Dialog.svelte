<script lang="ts">
  import { onMount } from 'svelte';
  import type { BookmarkType } from '../../stores/stores';
  import { updateBookmarkStorage } from '../../lib/helpers';
  import Check from '../svg/Check.svelte';
  import { clickOutside } from '../../lib/events';
  import { menuOpen, bookmarks } from '../../stores/stores';
  import Input from '../Input.svelte';
  import Trash from '../svg/Trash.svelte';
  import Image from './Image.svelte';
  import { fade } from 'svelte/transition';

  interface Dimensions {
    top: string;
    left: string;
  }

  export let name: string;
  export let shouldBeOpened: boolean;
  export let dims: Dimensions;
  export let bookmarkId: string;
  export let url: string;
  export let standalone = false;
  export let base64: string;

  let elem: HTMLDivElement;

  onMount(() => {
    if (standalone === false) {
      elem.style.top = dims.top;
      elem.style.left = dims.left;
    }
  });

  let changedBookmark: BookmarkType = {
    id: bookmarkId,
    name: name,
    url: url,
    imageBase64: base64
  };

  function updateBookmark() {
    let index = $bookmarks.findIndex((val) => val.id === bookmarkId);
    bookmarks.update((b) => b.fill(changedBookmark, index, index + 1));
    shouldBeOpened = false;
    updateBookmarkStorage();
  }

  function deleteBookmark() {
    let index = $bookmarks.findIndex((val) => val.id === bookmarkId);
    bookmarks.update((b) => b.filter((_, i) => i !== index));
    shouldBeOpened = false;
    updateBookmarkStorage();
  }
</script>

<div
  class="flex flex-col w-[12rem] bg-neutral-900 border-[1px] border-neutral-700 fixed rounded-lg py-2 px-2 text-sm text-left top-0 shadow-lg"
  bind:this={elem}
  use:clickOutside
  on:outsideclick={() => {
    shouldBeOpened = false;
    menuOpen.set(false);
  }}
  transition:fade={{ duration: 80 }}
>
  <form on:submit|preventDefault={updateBookmark} class="flex flex-col">
    <div class="menu__item-row flex flex-row justify-between mb-2">
      <button
        class="text-emerald-500 hover:text-emerald-400 active:text-emerald-800 rounded-md aspect-square"
        type="submit"
      >
        <Check />
      </button>
      <button
        class="text-red-500 hover:text-red-400 active:text-red-800 rounded-md aspect-square"
        type="button"
        on:click|preventDefault={deleteBookmark}
      >
        <Trash />
      </button>
    </div>
    <div class="menu__input-column flex flex-col gap-2">
      <Image bind:img={changedBookmark.imageBase64} bind:href={changedBookmark.url} />
      <Input type="text" id="name" name="Nazwa" bind:bound={changedBookmark.name} />
      <Input type="url" id="url" name="Adres URL" bind:bound={changedBookmark.url} />
    </div>
  </form>
</div>
