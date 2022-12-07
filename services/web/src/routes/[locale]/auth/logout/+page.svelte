<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { invalidateAll } from "$app/navigation"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"

    if (browser) {
        socket.disconnect().connect()
        toasts.add("success", "You have successfully logged out")
        invalidateAll()
    }
</script>

<svelte:head>
    <title>Logout</title>
</svelte:head>

<Content.Default title="Redirecting..." />
