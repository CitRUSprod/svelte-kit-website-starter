<script lang="ts">
    import { ProgressBar } from "@prgm/sveltekit-progress-bar"
    import { ToastContainer } from "./_components"

    import { onMount } from "svelte"
    import Cookies from "js-cookie"
    import { currentLocale, setLocale } from "$i18n/helpers"
    import { userData } from "$lib/stores"

    import "uno.css"
    import "@unocss/reset/tailwind.css"
    import "$styles/global.css"

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
