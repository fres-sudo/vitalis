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

  export let data;

  const signupForm = superForm(data.signupForm, {
    validators: zodClient(createUserDto),
    resetForm: false,
  });

  const { form: signupFormData, enhance: signupEnhance, errors } = signupForm;
</script>

<main class="flex flex-col items-center justify-center">
  <VitalisLogo />
  <form
    method="POST"
    use:signupEnhance
    class="grid gap-4 max-w-80 items-center justify-center"
  >
    <Form.Field form={signupForm} name="name">
      <Form.Control let:attrs>
        <Form.Label>Name</Form.Label>
        <Input
          {...attrs}
          type="name"
          placeholder="you@a:esome.com"
          bind:value={$signupFormData.name}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signupForm} name="surname">
      <Form.Control let:attrs>
        <Form.Label>Surname</Form.Label>
        <Input
          {...attrs}
          type="name"
          placeholder="you@awesome.com"
          bind:value={$signupFormData.surname}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signupForm} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input
          {...attrs}
          type="email"
          placeholder="you@awesome.com"
          bind:value={$signupFormData.email}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signupForm} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Password"
          bind:value={$signupFormData.password}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signupForm} name="passwordConfirmation">
      <Form.Control let:attrs>
        <Form.Label>PasswordConfirmation</Form.Label>
        <Input
          {...attrs}
          type="password"
          placeholder="Password Confirm"
          bind:value={$signupFormData.passwordConfirmation}
        />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit" class="w-full">signup</Button>
  </form>
</main>
