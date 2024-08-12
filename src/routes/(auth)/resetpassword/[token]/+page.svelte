<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { passwordResetDto } from "$lib/dtos/password-reset.dto";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Alert from "$lib/components/ui/alert";
  import { CircleX } from "lucide-svelte";

  export let data;

  const passwordResetForm = superForm(data.passwordResetForm, {
    validators: zodClient(passwordResetDto),
    resetForm: false,
  });

  const {
    form: passwordResetFormData,
    enhance: passwordResetEnhance,
    errors,
    message,
  } = passwordResetForm;
</script>

<main class="flex flex-col items-center justify-center mx-auto">
  <h1 class="font-bold text-lg sm:text-2xl pb-2 text-center">
    Resetta la tua password
  </h1>
  <p class="text-xs sm:text-sm text-muted-foreground font-medium text-center">
    Crea una nuova password sicura per il tuo account compilando i campi qui
    sotto, <br /> mi raccomando la prossima volta non dimenticarla!
  </p>
  <form
    method="POST"
    use:passwordResetEnhance
    class=" gap-4 mt-4 items-center justify-center w-full"
  >
    <Form.Field form={passwordResetForm} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Inserisci la nuova password"
          bind:value={$passwordResetFormData.password}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={passwordResetForm} name="passwordConfirmation">
      <Form.Control let:attrs>
        <Form.Label>Conferma Password</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Conferma la tua nuova password"
          bind:value={$passwordResetFormData.passwordConfirmation}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="w-full mt-2">Resetta password</Button>
  </form>
  {#if $message !== undefined && $message.type === "error"}
    <Alert.Root class="mt-2 text-wrap " variant="destructive">
      <CircleX class="h-4 w-4" />
      <Alert.Title>Errore!</Alert.Title>
      <Alert.Description>{$message.text}</Alert.Description>
    </Alert.Root>
  {/if}
</main>
