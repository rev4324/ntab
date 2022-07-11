<script lang="ts">
  export let bound: string;
  export let id: string;
  export let name: string;
  export let type: string;
</script>

{#if type === 'url'}
  <div class="flex flex-col gap-1">
    <input
      placeholder={name}
      class="text-neutral-300 focus:outline-none hover:bg-neutral-700 focus:outline-slate-700 focus:outline-2 bg-neutral-800 rounded-lg p-2 text-xs transition-colors ease-out invalid:outline-red-500"
      required
      autocomplete="off"
      type="url"
      bind:value={bound}
      {id}
    />
  </div>
{/if}
{#if type === 'text'}
  <div class="flex flex-col gap-1">
    <input
      placeholder={name}
      class="text-neutral-300 focus:outline-none hover:bg-neutral-700 focus:outline-slate-700 focus:outline-2 bg-neutral-800 rounded-lg p-2 text-xs transition-colors ease-out invalid:outline-red-500"
      required
      autocomplete="off"
      type="text"
      bind:value={bound}
      {id}
    />
  </div>
{/if}
