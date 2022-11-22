<script lang="ts">
    import { Content } from "$lib/components"

    import type { PageData } from "./$types"

    export let data: PageData
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<Content.Default title="Profile">
    <ul>
        <li><b>Username:</b> {data.user.username}</li>
        {#if data.user.email}
            <li><b>Email:</b> {data.user.email}</li>
        {/if}
        <li><b>Role:</b> {data.user.role.name}</li>
        <li><b>Confirmed email:</b> {data.user.confirmedEmail ? "yes" : "no"}</li>
        <li><b>Banned:</b> {data.user.banned ? "yes" : "no"}</li>
        <li><b>Registration date:</b> {data.user.registrationDate}</li>
    </ul>
</Content.Default>
