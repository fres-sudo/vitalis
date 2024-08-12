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
  <main
    class="flex flex-col items-center justify-center w-full gap-4 p-4 md:gap-8 md:p-10 h-full"
  >
    <div
      class="rounded-xl shadow-[10px_10px_10px_10px_rgba(0,0,0,0.05)] items-center justify-center mt-6"
    >
      <div
        class=" rounded-xl bg-zinc-50 flex flex-col items-center justify-center p-6 m-2"
      >
        {@render children()}
      </div>
      <p
        class="items-center justify-center text-sm text-muted-foreground text-center m-4"
      >
        Domande? Hai bisogno di un aiuto? <a
          class="text-primary hover:underline"
          href="/help">Contatta il supporto</a
        >
      </p>
    </div>
  </main>
  <div
    class=" flex flex-row place-items-end justify-center gap text-xs md:text-sm gap-4 md:gap-12 m-6"
  >
    <p class="text-muted-foreground">@ 2024 Vitalis</p>
    <a class="hover:underline" href="/">Termini di Servizio</a>
    <a class="hover:underline" href="/">Privacy Policy</a>
    <a class="hover:underline" href="/">Supporto</a>
    <a class="hover:underline" href="/">English</a>
  </div>
</div>
