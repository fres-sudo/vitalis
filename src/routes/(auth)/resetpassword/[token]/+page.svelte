<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { passwordResetDto } from "$lib/dtos/password-reset.dto";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data;

  const passwordResetForm = superForm(data.passwordResetForm, {
    validators: zodClient(passwordResetDto),
    resetForm: false,
  });

  const {
    form: passwordResetFormData,
    enhance: passwordResetEnhance,
    errors,
  } = passwordResetForm;
</script>

<SuperDebug data={passwordResetFormData} />

<main class="flex flex-col mx-auto w-[40rem]">
  <h1>Resetta la tua password</h1>
  <form
    method="POST"
    use:passwordResetEnhance
    class="grid gap-4 max-w-80 items-center justify-center"
  >
    <Form.Field form={passwordResetForm} name="password" class="w-[40rem]">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Enter your new password"
          bind:value={$passwordResetFormData.password}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field
      form={passwordResetForm}
      name="passwordConfirmation"
      class="w-[40rem]"
    >
      <Form.Control let:attrs>
        <Form.Label>Confirm Password</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Confirm your new password"
          bind:value={$passwordResetFormData.passwordConfirmation}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="w-full">Reset Password</Button>
  </form>
</main>
