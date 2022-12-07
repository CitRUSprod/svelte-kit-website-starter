<script lang="ts">
    import { Button } from "$lib/components"

    import classNames from "classnames"
    import { darkTheme, userData } from "$lib/stores"
    import { t, currentLocale, locales, localePath } from "$lib/locales"
    import { env } from "$lib/utils"

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
            <Button href={$localePath(`/users/${$userData.id}`)} type="primary">Profile</Button>
        {/if}
        <Button href={$localePath("/chat")} type="primary">Chat</Button>
        <Button href={$localePath("/lorem")} type="primary">Lorem</Button>
        <Button href={$localePath("/simple-layout")} type="primary">
            {$t("components.header.simple-layout")}
        </Button>
        <Button href={$localePath("/posts")} type="primary">
            {$t("components.header.posts")}
        </Button>
        <div class="u:flex u:items-center u:gap-1 u:mx-1">
            {#each $locales as locale, index (locale)}
                <Button
                    class={classNames("u:px-1", { "u:opacity-50": $currentLocale !== locale })}
                    href={$localePath(route, locale)}
                    type="primary"
                >
                    {locale.toUpperCase()}
                </Button>
                {#if index < $locales.length - 1}
                    <div class="u:font-bold">/</div>
                {/if}
            {/each}
        </div>
        <Button icon type="primary" on:click={darkTheme.toggle}>
            <i class="u:i-fa-solid-sun u:dark:i-fa-solid-moon u:text-xl" />
        </Button>
        {#if $userData}
            <Button href={$localePath("/auth/logout")} type="primary">Logout</Button>
        {:else}
            <Button href={$localePath("/auth/login")} type="primary">Login</Button>
        {/if}
    </div>
</header>
