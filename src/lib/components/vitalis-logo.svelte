<script lang="ts">
  export let size: "small" | "large" = "large";
</script>

<div
  class="logo flex flex-row bg-secondary rounde rounded-lg items-center p-2"
  class:small={size === "small"}
  class:large={size === "large"}
>
  <img src="/vitalis-logo.svg" alt="logo" width="50" height="100" />
  {#if size === "large"}
    <span class="font-semibold text-primary text-xl text-center ml-2"
      >Vitalis</span
    >
  {/if}
</div>
