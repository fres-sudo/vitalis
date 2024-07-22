<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ params, fetch }) => {
    const token = params.token;
    const userId = params.userId;

    const response = await fetch(`/verify-email/${userId}/${token}`);

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  };
</script>

<script lang="ts">
  export let data: { success: boolean };

  if (data.success) {
    // Redirect to login or show success message
    window.location.href = "/login";
  } else {
    // Show error message
    let errorMessage = "Email verification failed.";
  }
</script>

<template>
  {#if data.success}
    <p>Verification successful! Redirecting to login...</p>
  {:else}
    <p>errore</p>
  {/if}
</template>
