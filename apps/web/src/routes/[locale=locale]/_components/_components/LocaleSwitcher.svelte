<script lang="ts">
    import { Button } from "$lib/components"

    import cn from "classnames"
    import { page } from "$app/stores"
    import { invalidateAll, afterNavigate } from "$app/navigation"
    import {
        currentLocale,
        locales,
        setLocale,
        loadLocaleAsync,
        replaceLocaleInUrl,
        type Locales
    } from "$i18n/helpers"

    let klass: string | undefined = undefined
    export { klass as class }

    async function switchLocale(newLocale: Locales | undefined) {
        if (!newLocale || $currentLocale === newLocale) return
        await loadLocaleAsync(newLocale)
        document.querySelector("html")!.setAttribute("lang", newLocale)
        setLocale(newLocale)
        await invalidateAll()
    }

    afterNavigate(() => {
        const locale = $page.params.locale as Locales | undefined
        switchLocale(locale)
    })
</script>

<svelte:window on:popstate={({ state }) => switchLocale(state.locale)} />

<div class={cn("u:flex u:items-center u:gap-1", klass)}>
    {#each locales as locale, index (locale)}
        <Button
            class={cn("u:px-1", { "u:opacity-50": $currentLocale !== locale })}
            href={replaceLocaleInUrl($page.url, locale)}
            variant="primary"
        >
            {locale.toUpperCase()}
        </Button>
        {#if index < locales.length - 1}
            <div class="u:font-bold">/</div>
        {/if}
    {/each}
</div>
