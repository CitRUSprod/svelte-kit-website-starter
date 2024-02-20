<script lang="ts">
    import { PageProgressBar, ToastContainer } from "./_components"

    import { watch } from "svelte-legos"
    import Cookies from "js-cookie"
    import { browser } from "$app/environment"
    import { invalidateAll, afterNavigate } from "$app/navigation"
    import { darkTheme, userData } from "$lib/stores"
    import { currentLocale } from "$lib/locales"

    import "uno.css"
    import "@unocss/reset/tailwind.css"

    export let data

    $: $userData = data.userData

    if (browser) {
        darkTheme.sync()
    }

    watch(currentLocale, locale => {
        Cookies.set("locale", locale, {
            path: "/",
            expires: 100
        })
    })

    afterNavigate(n => {
        if (n.from && n.to) {
            const from = `${n.from.url.origin}${n.from.url.pathname}`
            const to = `${n.to.url.origin}${n.to.url.pathname}`

            if (from === to) {
                invalidateAll()
            }
        }
    })
</script>

<PageProgressBar />
<slot />
<ToastContainer />

<style global lang="postcss">
    html {
        @apply u\:overflow-x-hidden;
    }

    body {
        @apply u\:flex u\:flex-col u\:min-h-screen u\:bg-content u\:text-content-inverse u\:transition u\:duration-200 u\:overflow-x-hidden;
    }

    h1,
    h2,
    h3 {
        @apply u\:font-bold;
    }

    h1 {
        @apply u\:text-4xl;
    }

    h2 {
        @apply u\:text-2xl;
    }

    h3 {
        @apply u\:text-lg;
    }

    #app {
        @apply u\:contents;
    }
</style>
