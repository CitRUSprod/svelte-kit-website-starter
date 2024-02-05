<script lang="ts">
    import { Button } from "$lib/components"

    import cn from "classnames"
    import * as constantsEnums from "@local/constants/enums"
    import { env } from "$lib/constants"
    import { darkTheme, userData, pageSearchParams } from "$lib/stores"
    import { t, currentLocale, locales, localePath } from "$lib/locales"

    export let route: string
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
                {$t("components.header.profile")}
            </Button>
        {/if}
        <Button href={$localePath("/chat")} variant="primary">
            {$t("components.header.chat")}
        </Button>
        <Button href={$localePath("/lorem")} variant="primary">Lorem</Button>
        <Button href={$localePath("/simple-layout")} variant="primary">
            {$t("components.header.simple-layout")}
        </Button>
        <Button href={$localePath("/posts")} variant="primary">
            {$t("components.header.posts")}
        </Button>
        <Button href={$localePath("/users")} variant="primary">
            {$t("components.header.users")}
        </Button>
        {#if $userData?.role.permissions.includes(constantsEnums.Permission.AssignRole)}
            <Button href={$localePath("/roles")} variant="primary">
                {$t("components.header.roles")}
            </Button>
        {/if}
        <div class="u:flex u:items-center u:gap-1 u:mx-1">
            {#each $locales as locale, index (locale)}
                <Button
                    class={cn("u:px-1", { "u:opacity-50": $currentLocale !== locale })}
                    href={$localePath(`${route}${$pageSearchParams}`, locale)}
                    variant="primary"
                >
                    {locale.toUpperCase()}
                </Button>
                {#if index < $locales.length - 1}
                    <div class="u:font-bold">/</div>
                {/if}
            {/each}
        </div>
        <Button icon variant="primary" on:click={darkTheme.toggle}>
            <i class="u:i-fa-solid-sun u:dark:i-fa-solid-moon u:text-xl" />
        </Button>
        {#if $userData}
            <Button href={$localePath("/auth/logout")} variant="primary">
                {$t("components.header.logout")}
            </Button>
        {:else}
            <Button href={$localePath("/auth/login")} variant="primary">
                {$t("components.header.login")}
            </Button>
        {/if}
    </div>
</header>
