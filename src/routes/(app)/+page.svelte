<script lang="ts">
  export let data: {
    users: Array<{ name: string; surname: string; verified: boolean }>;
    user: any;
  };

  const { users, user } = data;
</script>

{#if users && users.length > 0}
  {#each users as user}
    <p>{user.name} - {user.surname}, is Verified = {user.verified}</p>
  {/each}
{:else}
  <p>No users found.</p>
{/if}
