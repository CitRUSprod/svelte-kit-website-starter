<script lang="ts">
    import { ProgressBar } from "@prgm/sveltekit-progress-bar"
    import Cookies from "js-cookie"
    import { onMount } from "svelte"

    import { ToastContainer } from "./_components"

    import { currentLocale, setLocale } from "$i18n/helpers"
    import { userData } from "$lib/stores"

    // eslint-disable-next-line import/no-unassigned-import
    import "uno.css"
    // eslint-disable-next-line import/no-unassigned-import
    import "@unocss/reset/tailwind.css"
    // eslint-disable-next-line import/no-unassigned-import
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
</script>

<ProgressBar class={"u:text-green-500" as any} />
{@render children?.()}
<ToastContainer />
