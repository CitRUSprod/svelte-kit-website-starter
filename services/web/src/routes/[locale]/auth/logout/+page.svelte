<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { invalidateAll } from "$app/navigation"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"

    if (browser) {
        socket.disconnect().connect()
        toasts.add("success", $t("routes.auth.logout.logged-out-successfully"))
        invalidateAll()
    }
</script>

<svelte:head>
    <title>{$t("routes.auth.logout.logout")}</title>
</svelte:head>

<Content.Default title={$t("routes.auth.logout.redirecting")} />
