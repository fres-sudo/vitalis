<script>
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { passwordResetEmailDto } from "$lib/dtos/password-reset.dto";
  import { ChevronLeft, CircleX, MailCheck } from "lucide-svelte";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Alert from "$lib/components/ui/alert";

  export let data;

  const passwordResetEmailForm = superForm(data.passwordResetEmailForm, {
    validators: zodClient(passwordResetEmailDto),
    resetForm: false,
  });

  const {
    form: passwordResetEmailFormData,
    enhance: passwordResetEmailEnhance,
    errors,
    message,
  } = passwordResetEmailForm;
</script>

<main class="flex flex-col items-center justify-center mx-auto">
  <h1 class="font-bold text-lg sm:text-2xl pb-2 text-center">
    Hai dimenticato la password?
  </h1>
  <p class="text-xs sm:text-sm text-muted-foreground font-medium text-center">
    Inserisci qui sotto l'email associata al tuo account. <br />
    Riceverai nella tua casella postale un'email con le istruzioni necessarie per
    il recupero della tua password.
  </p>

  <form
    method="POST"
    use:passwordResetEmailEnhance
    class=" gap-4 w-full items-center justify-center mt-4"
  >
    <Form.Field form={passwordResetEmailForm} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input
          {...attrs}
          type="email"
          placeholder="Inserisci l'email associata al tuo account"
          bind:value={$passwordResetEmailFormData.email}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="w-full">Invia email di recupero</Button>
  </form>
  {#if $message !== undefined && $message.type === "success"}
    <Alert.Root class="mt-4">
      <MailCheck class="h-4 w-4" />
      <Alert.Title>Email di recupero inviata!</Alert.Title>
      <Alert.Description>{$message.text}</Alert.Description>
    </Alert.Root>
  {:else if $message !== undefined && $message.type === "error"}
    <Alert.Root class="mt-2 text-wrap " variant="destructive">
      <CircleX class="h-4 w-4" />
      <Alert.Title>Errore!</Alert.Title>
      <Alert.Description>{$message.text}</Alert.Description>
    </Alert.Root>
  {/if}
  <a
    href="/login"
    class=" flex flex-row text-primary mt-2 text-sm text-left self-start items-center hover:underline"
  >
    <ChevronLeft class="h-4 w-4" /> Torna al login</a
  >
</main>
