<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { localePath } from "$lib/locales"
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
    <title>Email confirmation</title>
</svelte:head>

<Content.Default title="Redirecting..." />
