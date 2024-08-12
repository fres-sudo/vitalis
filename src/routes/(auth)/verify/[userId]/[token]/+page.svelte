<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
</script>

<script lang="ts">
  export let data: { status: string };
  const { status } = data;
</script>

<main>
  {#if status === "success"}
    <p class="text-gray-700 items-center justify-center text-center">
      Verification successful! Redirecting to login...
    </p>
  {:else}
    <p class="text-gray-700 items-center justify-center text-center">ERROR</p>
  {/if}
</main>
