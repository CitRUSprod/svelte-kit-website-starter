<script lang="ts">
    import { Button } from "$lib/components"
    import { LocaleSwitcher } from "./_components"

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
                {$ll.profile()}
            </Button>
        {/if}
        <Button href={$localePath("/chat")} variant="primary">
            {$ll.chat()}
        </Button>
        <Button href={$localePath("/lorem")} variant="primary">Lorem</Button>
        <Button href={$localePath("/simple-layout")} variant="primary">
            {$ll.simpleLayout()}
        </Button>
        <Button href={$localePath("/posts")} variant="primary">
            {$ll.posts()}
        </Button>
        <Button href={$localePath("/users")} variant="primary">
            {$ll.users()}
        </Button>
        {#if $userData?.role.permissions.includes(constantsEnums.Permission.AssignRole)}
            <Button href={$localePath("/roles")} variant="primary">
                {$ll.roles()}
            </Button>
        {/if}
        <LocaleSwitcher class="u:mx-1" />
        <Button icon variant="primary" on:click={darkTheme.toggle}>
            <i class="u:i-fa-solid-sun u:dark:i-fa-solid-moon u:text-xl" />
        </Button>
        {#if $userData}
            <Button href={$localePath("/auth/logout")} variant="primary">
                {$ll.logout()}
            </Button>
        {:else}
            <Button href={$localePath("/auth/login")} variant="primary">
                {$ll.login()}
            </Button>
        {/if}
    </div>
</header>
