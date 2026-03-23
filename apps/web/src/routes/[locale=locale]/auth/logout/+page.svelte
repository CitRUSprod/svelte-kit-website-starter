<script lang="ts">
    import { onMount } from "svelte"

    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { ContentDefault } from "$lib/components"
    import { toasts } from "$lib/stores"
    import { reconnectSocket } from "$lib/utils"

    onMount(async () => {
        reconnectSocket()
        toasts.add("success", $ll.loggedOutSuccessfully())
        await invalidateAll()
    })
</script>

<svelte:head>
    <title>{$ll.logout()}</title>
</svelte:head>

<ContentDefault title={$ll.redirecting()} />
