<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { createUserDto } from "$lib/dtos/user.dto.js";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import VitalisLogo from "$lib/components/vitalis-logo.svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Apple, Chrome, CircleX, LoaderIcon, MailCheck } from "lucide-svelte";
  import * as Alert from "$lib/components/ui/alert/index.js";

  export let data;

  const signupForm = superForm(data.signupForm, {
    validators: zodClient(createUserDto),
    resetForm: true,
  });

  const {
    form: signupFormData,
    enhance: signupEnhance,
    errors,
    submitting,
    message,
  } = signupForm;
</script>

<main class="flex flex-col items-center justify-center">
  <h1 class="font-bold text-2xl pb-2">Registrati!</h1>
  <p class="text-sm text-muted-foreground font-medium text-center">
    Registrandomi accetto il conenso la <a
      class="text-primary hover:underline"
      href="/">Privacy Policy</a
    >
    e i
    <a class="text-primary hover:underline" href="/">Termini di servizio</a>.
  </p>
  <Separator class="bg-muted-foreground my-6" />
  <form
    method="POST"
    use:signupEnhance
    class="gap-1 items-center justify-center w-full"
  >
    <div class="flex flex-col sm:flex-row sm:gap-2">
      <Form.Field form={signupForm} name="name">
        <Form.Control let:attrs>
          <Form.Label>Nome</Form.Label>
          <Input
            {...attrs}
            type="name"
            placeholder="Inserisci il tuo nome"
            bind:value={$signupFormData.name}
          />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field form={signupForm} name="surname">
        <Form.Control let:attrs>
          <Form.Label>Cognome</Form.Label>
          <Input
            {...attrs}
            type="name"
            placeholder="Inserisci il tuo cognome"
            bind:value={$signupFormData.surname}
          />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <Form.Field form={signupForm} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input
          {...attrs}
          type="email"
          placeholder="Inserici il tuo indirizzo email"
          bind:value={$signupFormData.email}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>

    <div class="flex flex-col sm:flex-row sm:gap-2">
      <Form.Field form={signupForm} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input
            {...attrs}
            type="password"
            placeholder="Inserisci la tua password"
            bind:value={$signupFormData.password}
          />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field form={signupForm} name="passwordConfirmation">
        <Form.Control let:attrs>
          <Form.Label>Conferma Password</Form.Label>
          <Input
            {...attrs}
            type="password"
            placeholder="Conferma la tua password"
            bind:value={$signupFormData.passwordConfirmation}
          />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <Button type="submit" class="w-full mt-2">
      {#if $submitting}
        <LoaderIcon class="animate-spin mr-2" /> Loading
      {:else}Continua{/if}</Button
    >
  </form>
  {#if $message !== undefined && $message.type === "success"}
    <Alert.Root class="mt-4">
      <MailCheck class="h-4 w-4" />
      <Alert.Title>Registrazione avvenuta con successo!</Alert.Title>
      <Alert.Description>{$message.text}</Alert.Description>
    </Alert.Root>
  {:else if $message !== undefined && $message.type === "error"}
    <Alert.Root class="mt-2 text-wrap max-w-min" variant="destructive">
      <CircleX class="h-4 w-4" />
      <Alert.Title>Errore!</Alert.Title>
      <Alert.Description>{$message.text}</Alert.Description>
    </Alert.Root>
  {/if}
  <Separator class="bg-muted-foreground my-6" />
  <Button variant="outline" class="w-full mb-2">
    <img src="/google.svg" alt="apple" class="h-6 w-6 mr-2" />
    Continua con Google
  </Button>
  <Button variant="outline" class="w-full">
    <img src="/apple.svg" alt="apple" class="h-6 w-6 mr-2" />
    Continua con Apple
  </Button>
  <Separator class="bg-muted-foreground my-6" />
  <p class="text-muted-foreground text-sm">
    Hai già un account? <a class="text-primary hover:underline" href="/login"
      >Accedi</a
    >
  </p>
</main>
