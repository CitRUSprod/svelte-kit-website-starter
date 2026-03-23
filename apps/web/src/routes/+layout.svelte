<script lang="ts">
    import { ProgressBar } from "@prgm/sveltekit-progress-bar"
    import Cookies from "js-cookie"
    import { watch } from "runed"
    import { onMount, untrack } from "svelte"

    import { ToastContainer, PageTransition } from "./_components"

    import { currentLocale, setLocale } from "$i18n/helpers"
    import { user } from "$lib/stores"
    import { setGlobalSocketListeners } from "$lib/utils"

    // eslint-disable-next-line import/no-unassigned-import
    import "uno.css"
    // eslint-disable-next-line import/no-unassigned-import
    import "@unocss/reset/tailwind.css"
    // eslint-disable-next-line import/no-unassigned-import
    import "$styles/global.css"

    const { data, children } = $props()

    setLocale(untrack(() => data.locale))

    user.data = untrack(() => data.user)

    watch(
        () => data.user,
        newUser => {
            user.data = newUser
        }
    )

    watch(
        () => $currentLocale,
        locale => {
            Cookies.set("locale", locale, {
                path: "/",
                expires: 100,
                sameSite: "lax"
            })
        }
    )

    onMount(() => {
        // eslint-disable-next-line new-cap
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        Cookies.set("timezone", tz, {
            path: "/",
            expires: 100,
            sameSite: "lax"
        })

        setGlobalSocketListeners()
    })
</script>

<ProgressBar class={"u:text-green-500" as any} />
<PageTransition />
{@render children?.()}
<ToastContainer />
