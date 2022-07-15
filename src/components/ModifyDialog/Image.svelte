<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';

  import Favicon from '../Favicon.svelte';
  import Plus from '../svg/Plus.svelte';

  export let img: string;
  export let href: string;
  let files: FileList;
  afterUpdate(() => {
    console.log(files ? files[0] : 'undefined');
    let reader = new FileReader();
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        img = reader.result as string;
        console.log(img);
      };
    }
  });
</script>

<div class="flex flex-col items-center text-neutral-300">
  <label
    for="menu__image-input"
    class="cursor-pointer aspect-square border-[1px] border-dashed text-sm border-neutral-700 rounded-lg p-1 self-center flex flex-col items-center justify-center hover:border-neutral-500 active:bg-neutral-800 transition-colors ease-out"
  >
    {#if img == ''}
      <div class="w-12 h-12 flex items-center justify-center">
        <Plus />
      </div>
    {:else}
      <Favicon {img} {href} />
    {/if}
  </label>
  <input id="menu__image-input" type="file" accept="image/*" class="hidden" bind:files />
</div>

<style>
</style>
