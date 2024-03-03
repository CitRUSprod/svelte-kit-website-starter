<script lang="ts">
    import { Button, LocaleSwitcher } from "$lib/components"

    import * as constantsEnums from "@local/constants/enums"
    import { ll, localePath } from "$i18n/helpers"
    import { env } from "$lib/constants"
    import { darkTheme, userData } from "$lib/stores"
</script>

<header
    class="u:flex u:items-center u:gap-2 u:px-6 u:py-2 u:bg-primary u:text-content-lighter u:shadow-lg"
>
    <div>
        <h2>
            <a href={$localePath("/")}>{env.PUBLIC_TITLE}</a>
        </h2>
    </div>
    <div class="u:flex u:flex-1 u:flex-wrap u:justify-end u:gap-2">
        {#if $userData}
            <Button href={$localePath(`/users/${String($userData.id)}`)} variant="primary">
                {$ll.$.$$header.profile()}
            </Button>
        {/if}
        <Button href={$localePath("/chat")} variant="primary">
            {$ll.$.$$header.chat()}
        </Button>
        <Button href={$localePath("/lorem")} variant="primary">Lorem</Button>
        <Button href={$localePath("/simple-layout")} variant="primary">
            {$ll.$.$$header.simpleLayout()}
        </Button>
        <Button href={$localePath("/posts")} variant="primary">
            {$ll.$.$$header.posts()}
        </Button>
        <Button href={$localePath("/users")} variant="primary">
            {$ll.$.$$header.users()}
        </Button>
        {#if $userData?.role.permissions.includes(constantsEnums.Permission.AssignRole)}
            <Button href={$localePath("/roles")} variant="primary">
                {$ll.$.$$header.roles()}
            </Button>
        {/if}
        <LocaleSwitcher class="u:mx-1" />
        <Button icon variant="primary" on:click={darkTheme.toggle}>
            <i class="u:i-fa-solid-sun u:dark:i-fa-solid-moon u:text-xl" />
        </Button>
        {#if $userData}
            <Button href={$localePath("/auth/logout")} variant="primary">
                {$ll.$.$$header.logout()}
            </Button>
        {:else}
            <Button href={$localePath("/auth/login")} variant="primary">
                {$ll.$.$$header.login()}
            </Button>
        {/if}
    </div>
</header>
