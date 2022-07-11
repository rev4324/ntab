<script lang="ts">
  import { menuOpen } from '../stores/bookmarks';
  import ContextMenu from './ModifyDialog/Dialog.svelte';
  import Favicon from './Favicon.svelte';

  export let href: string;
  export let name: string;
  export let bookmarkId: string;
  export let url: string;
  export let base64: string;

  let elemDims = {
    left: '',
    top: ''
  };

  let menu = false;

  const handleMenuOpen = (e: PointerEvent) => {
    elemDims.left = `${e.x}px`;
    elemDims.top = `${e.y}px`;
    menu = !menu;
  };
</script>

<div
  class="flex justify-center items-center select-none"
  on:contextmenu|preventDefault={handleMenuOpen}
>
  <a
    {href}
    class="defaultBtn centeredFlex flex-col gap-[0.4rem] w-[100px] h-[100px] text-ellipsis overflow-hidden"
  >
    <!-- <img src={base64} alt="favicon" width="40px" class="w-[40px] h-[40px]" /> -->
    <Favicon img={base64} {href} auto />
    <span class="text-xs overflow-clip text-ellipsis text-center select-none">{name}</span>
  </a>
  {#if menu && $menuOpen === false}
    <ContextMenu
      {name}
      bind:shouldBeOpened={menu}
      bind:dims={elemDims}
      {bookmarkId}
      {url}
      {base64}
    />
  {/if}
</div>
