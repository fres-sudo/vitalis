<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { loginDto } from "$lib/dtos/login.dto";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data;

  const loginForm = superForm(data.loginForm, {
    validators: zodClient(loginDto),
    resetForm: false,
  });
  const { form: loginFormData, enhance: loginEnhance, errors } = loginForm;
</script>

<form
  method="POST"
  use:loginEnhance
  class="grid gap-4 max-w-80 items-center justify-center"
>
  <Form.Field form={loginForm} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input
        {...attrs}
        type="email"
        placeholder="you@awesome.com"
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
        placeholder="Password"
        bind:value={$loginFormData.password}
      />
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
  <Button type="submit" class="w-full">Login</Button>
</form>
