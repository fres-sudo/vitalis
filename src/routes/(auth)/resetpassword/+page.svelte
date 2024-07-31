<script>
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { passwordResetEmailDto } from "$lib/dtos/password-reset.dto";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data;

  const passwordResetEmailForm = superForm(data.passwordResetEmailForm, {
    validators: zodClient(passwordResetEmailDto),
    resetForm: false,
  });

  const {
    form: passwordResetEmailFormData,
    enhance: passwordResetEmailEnhance,
    errors,
  } = passwordResetEmailForm;
</script>

<SuperDebug data={passwordResetEmailFormData} />

<main class="flex flex-col items-center justify-center mx-auto">
  <h1>Reset Password</h1>
  <p>Insert email of your account</p>

  <form
    method="POST"
    use:passwordResetEmailEnhance
    class="grid gap-4 max-w-80 items-center justify-center"
  >
    <Form.Field form={passwordResetEmailForm} name="email" class="w-[40rem]">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input
          {...attrs}
          type="email"
          placeholder="you@awesome.com"
          bind:value={$passwordResetEmailFormData.email}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="w-full">send email</Button>
  </form>
</main>
