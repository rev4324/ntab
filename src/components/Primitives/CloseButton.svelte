<script lang="ts">
  import X from '../svg/X.svelte';
  export let onClick: () => void;
</script>

<button
  class="defaultBtn w-12 self-center flex justify-center m-4 p-1 top-0 right-0 absolute flex-col items-center gap-1 text-neutral-300"
  on:click={onClick}
>
  <X />
  <kbd class="font-code text-neutral-500 text-[0.7rem]">Esc</kbd>
</button>
