<script lang="ts">
    import { onMount } from "svelte"

    import { onNavigate } from "$app/navigation"
    import { getPathnameWithoutLocale } from "$i18n/helpers"

    let viewTransitionsSupported = false

    onMount(() => {
        viewTransitionsSupported = !!document.startViewTransition
    })

    onNavigate(nav => {
        if (!viewTransitionsSupported) return undefined

        const urlFrom = nav.from?.url
        const urlTo = nav.to?.url

        if (!urlFrom || !urlTo) return undefined

        const pathnameFromWithoutLocale = getPathnameWithoutLocale(urlFrom)
        const pathnameToWithoutLocale = getPathnameWithoutLocale(urlTo)

        const isSameUrl = pathnameFromWithoutLocale === pathnameToWithoutLocale
        if (isSameUrl) return undefined

        return new Promise(resolve => {
            document.startViewTransition(async () => {
                resolve()
                await nav.complete
            })
        })
    })
</script>
