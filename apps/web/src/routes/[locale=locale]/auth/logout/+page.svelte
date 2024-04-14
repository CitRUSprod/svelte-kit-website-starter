<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"

    if (browser) {
        socket.disconnect().connect()
        toasts.add("success", $ll.loggedOutSuccessfully())
        invalidateAll()
    }
</script>

<svelte:head>
    <title>{$ll.logout()}</title>
</svelte:head>

<Content.Default title={$ll.redirecting()} />
