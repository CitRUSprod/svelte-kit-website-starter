<script lang="ts">
    import { Button, Icon } from "$lib/components"
    import { Role } from "$lib/enums"
    import { session, darkTheme } from "$lib/stores"
    import { hasAccess } from "$lib/utils"
</script>

<div class="bg-neutral shadow-lg text-neutral-content mb-2 navbar">
    <div class="flex-none mx-2 px-2">
        <a class="font-bold text-lg" href="/">SvelteKit Website Template</a>
    </div>
    <div class="flex-1 justify-end mx-2 px-2">
        <Button class="rounded-btn btn-ghost btn-sm" href="/chat">Chat</Button>
        {#if $session.user}
            <Button class="rounded-btn btn-ghost btn-sm" href="/users/{$session.user.id}">
                Profile
            </Button>
        {/if}
        <Button class="rounded-btn btn-ghost btn-sm" href="/posts">Posts</Button>
        {#if hasAccess($session.user, Role.Admin)}
            <Button class="rounded-btn btn-ghost btn-sm" href="/users">Users</Button>
        {/if}
        {#if $session.user}
            <Button class="rounded-btn btn-ghost btn-sm" href="/auth/logout">Logout</Button>
        {:else}
            <Button class="rounded-btn btn-ghost btn-sm" href="/auth/login">Login</Button>
        {/if}
        <Button class="rounded-btn btn-ghost btn-sm" on:click={darkTheme.toggle}>
            <svelte:component this={$darkTheme ? Icon.Sun : Icon.Moon} />
        </Button>
    </div>
</div>
