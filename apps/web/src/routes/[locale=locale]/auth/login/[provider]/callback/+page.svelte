<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"

    if (browser) {
        toasts.add("success", $ll.loggedInSuccessfully())
        invalidateAll()
    }
</script>

<svelte:head>
    <title>{$ll.login()}</title>
</svelte:head>

<Content.Default title={$ll.redirecting()} />
