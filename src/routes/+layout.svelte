<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";

  let { children } = $props();
</script>

<ModeWatcher defaultMode={"light"} />
<Toaster />
{@render children()}
