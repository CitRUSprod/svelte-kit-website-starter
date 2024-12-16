<script lang="ts">
    import { ProgressBar } from "@prgm/sveltekit-progress-bar"
    import { ToastContainer } from "./_components"

    import { onMount } from "svelte"
    import Cookies from "js-cookie"
    import { currentLocale, setLocale } from "$i18n/helpers"
    import { userData } from "$lib/stores"

    import "uno.css"
    import "@unocss/reset/tailwind.css"

    const { data, children } = $props()

    setLocale(data.locale)

    $userData = data.userData

    $effect(() => {
        $userData = data.userData
    })

    onMount(() => {
        // eslint-disable-next-line new-cap
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        Cookies.set("timezone", tz, {
            path: "/",
            expires: 100,
            sameSite: "lax"
        })
    })

    $effect(() => {
        Cookies.set("locale", $currentLocale, {
            path: "/",
            expires: 100,
            sameSite: "lax"
        })
    })

    function defineAny(value: any) {
        return value
    }
</script>

<ProgressBar class={defineAny("u:text-green-500")} />
{@render children?.()}
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
