<script lang="ts">
    import * as constantsEnums from "@local/constants/enums"

    import { LocaleSwitcher } from "./_components"

    import { ll, localePath } from "$i18n/helpers"
    import { Button } from "$lib/components"
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
            <Button
                href={$localePath(`/users/${$userData.id}`)}
                variant="primary"
                data-testid="profile-header-button"
            >
                {$ll.profile()}
            </Button>
        {/if}
        <Button href={$localePath("/chat")} variant="primary" data-testid="chat-header-button">
            {$ll.chat()}
        </Button>
        <Button href={$localePath("/lorem")} variant="primary">Lorem</Button>
        <Button href={$localePath("/simple-layout")} variant="primary">
            {$ll.simpleLayout()}
        </Button>
        <Button href={$localePath("/posts")} variant="primary" data-testid="posts-header-button">
            {$ll.posts()}
        </Button>
        <Button href={$localePath("/users")} variant="primary" data-testid="users-header-button">
            {$ll.users()}
        </Button>
        {#if $userData?.role.permissions.includes(constantsEnums.Permission.AssignRole)}
            <Button
                href={$localePath("/roles")}
                variant="primary"
                data-testid="roles-header-button"
            >
                {$ll.roles()}
            </Button>
        {/if}
        <LocaleSwitcher class="u:mx-1" />
        <Button icon variant="primary" onclick={darkTheme.toggle} data-testid="theme-header-button">
            <i class="u:i-fa-solid-sun u:dark:i-fa-solid-moon u:text-xl"></i>
        </Button>
        {#if $userData}
            <Button
                href={$localePath("/auth/logout")}
                variant="primary"
                data-testid="logout-header-button"
            >
                {$ll.logout()}
            </Button>
        {:else}
            <Button
                href={$localePath("/auth/login")}
                variant="primary"
                data-testid="login-header-button"
            >
                {$ll.login()}
            </Button>
        {/if}
    </div>
</header>
