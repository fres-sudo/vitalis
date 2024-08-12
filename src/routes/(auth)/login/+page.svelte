<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { loginDto } from "$lib/dtos/login.dto";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import SuperDebug, {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { CircleX, LoaderIcon } from "lucide-svelte";
  import * as Alert from "$lib/components/ui/alert/index.js";

  export let data;

  const loginForm = superForm(data.loginForm, {
    validators: zodClient(loginDto),
    resetForm: false,
  });
  const {
    form: loginFormData,
    enhance: loginEnhance,
    errors,
    submitting,
    message,
  } = loginForm;
</script>

<main class="flex flex-col items-center justify-center">
  <h1 class="font-bold text-2xl pb-2">Accedi!</h1>
  <p class="text-sm text-muted-foreground font-medium text-center">
    Accedi al tuo account inserendo email e password.
  </p>
  <Separator class="my-6" />
  <form
    method="POST"
    use:loginEnhance
    class="gap-1 items-center justify-center w-full"
  >
    <Form.Field form={loginForm} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input
          {...attrs}
          type="email"
          placeholder="Inserisci il tuo indirizzo email"
          bind:value={$loginFormData.email}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={loginForm} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Inserisci la tua password"
          bind:value={$loginFormData.password}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="mt-2 w-full" disabled={$submitting}>
      {#if $submitting}
        <LoaderIcon class="animate-spin mr-2" /> Caricamento
      {:else}Accedi{/if}
    </Button>
  </form>
  <a
    href="/resetpassword"
    class="text-primary mt-2 text-sm text-right self-end hover:underline"
  >
    Password dimenticata?
  </a>

  {#if $message !== undefined && $message.type === "error"}
    <Alert.Root class="mt-2 text-wrap" variant="destructive">
      <CircleX class="h-4 w-4" />
      <Alert.Title>Errore!</Alert.Title>
      <Alert.Description>{$message.text}</Alert.Description>
    </Alert.Root>
  {/if}
  <Separator class="bg-slate-300 mt-4 mb-6" />
  <Button variant="outline" class="w-full mb-2">
    <img src="/google.svg" alt="apple" class="h-6 w-6 mr-2" />
    Continua con Google
  </Button>
  <Button variant="outline" class="w-full">
    <img src="/apple.svg" alt="apple" class="h-6 w-6 mr-2" />
    Continua con Apple
  </Button>
  <Separator class="my-6" />
  <p class="text-muted-foreground text-sm">
    Non hai un account? <a class="text-primary hover:underline" href="/signup"
      >Registrati</a
    >
  </p>
</main>
