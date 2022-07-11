<script lang="ts">
export let temperature: string
export let conditions: string
import Sunny from "./Icons/Sunny.svelte";
import Rainy from "./Icons/Rainy.svelte";
import Thunderstorm from "./Icons/Thunderstorm.svelte";
import Snowy from "./Icons/Snowy.svelte"

const conditionsArr = [
  {
    name: "sunny",
    displayName: "Słonecznie",
    component: Sunny
  },
  {
    name: "rainy",
    displayName: "Deszcz",
    component: Rainy
  },
  {
    name: "thunderstorm",
    displayName: "Burza",
    component: Thunderstorm
  },
  {
    name: "snowy",
    displayName: "Śnieg",
    component: Snowy
  }
]

</script>
<h3 class="font-bold flex flex-row items-center text-[3em] gap-1">
  {#each conditionsArr as condition}
  {#if conditions.toLowerCase() == condition.name}
  <svelte:component this={condition.component} />
  {/if}
  {/each}
  {temperature}°
</h3>