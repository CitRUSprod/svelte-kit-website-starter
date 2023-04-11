<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"

    if (browser) {
        toasts.add("success", "Email successfully verified")
        goto($localePath("/"), {
            replaceState: true,
            invalidateAll: true
        })
    }
</script>

<svelte:head>
    <title>{$t("routes.profile.email.[token].email-confirmation")}</title>
</svelte:head>

<Content.Default title={$t("routes.profile.email.[token].redirecting")} />
