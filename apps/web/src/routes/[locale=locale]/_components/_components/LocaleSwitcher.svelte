<script lang="ts">
    import cn from "classnames"

    import { invalidateAll, afterNavigate } from "$app/navigation"
    import { page } from "$app/state"
    import type { Locale } from "$i18n/helpers"
    import {
        currentLocale,
        locales,
        setLocale,
        loadLocaleAsync,
        replaceLocaleInUrl
    } from "$i18n/helpers"
    import { Button } from "$lib/components"

    interface Props {
        class: string | undefined
    }

    const { class: klass }: Props = $props()

    async function switchLocale(newLocale: Locale | undefined) {
        if (!newLocale || $currentLocale === newLocale) {
            return
        }

        await loadLocaleAsync(newLocale)
        document.querySelector("html")!.setAttribute("lang", newLocale)
        setLocale(newLocale)
        await invalidateAll()
    }

    afterNavigate(() => {
        const locale = page.params.locale as Locale | undefined
        switchLocale(locale)
    })
</script>

<svelte:window onpopstate={({ state }) => switchLocale(state.locale)} />

<div class={cn("u:flex u:items-center u:gap-1", klass)}>
    {#each locales as locale, index (locale)}
        <Button
            class={cn("u:px-1", { "u:opacity-50": $currentLocale !== locale })}
            href={replaceLocaleInUrl(page.url, locale)}
            variant="primary"
            data-testid="locale-{locale}-button"
        >
            {locale.toUpperCase()}
        </Button>
        {#if index < locales.length - 1}
            <div class="u:font-bold">/</div>
        {/if}
    {/each}
</div>
