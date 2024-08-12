<script lang="ts">
  import VitalisLogo from "$lib/components/vitalis-logo.svelte";
  let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col">
  <a
    class="flex flex-row items-center text-xl font-semibold text-primary p-4"
    href="/"
  >
    <VitalisLogo size="small" /> Vitalis</a
  >
  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 h-full">
    {@render children()}
  </main>
  <div
    class=" flex flex-row place-items-end justify-center gap text-xs md:text-sm gap-4 md:gap-12 m-6"
  >
    <p class="text-muted-foreground">@ 2024 Vitalis</p>
    <a href="/">Termini di Servizio</a>
    <a href="/">Privacy Policy</a>
    <a href="/">Supporto</a>
    <a href="/">English</a>
  </div>
</div>
