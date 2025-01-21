<script lang="ts">
    import { onMount } from "svelte"

    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { Content } from "$lib/components"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"

    onMount(async () => {
        socket.disconnect().connect()
        toasts.add("success", $ll.loggedOutSuccessfully())
        await invalidateAll()
    })
</script>

<svelte:head>
    <title>{$ll.logout()}</title>
</svelte:head>

<Content.Default title={$ll.redirecting()} />
