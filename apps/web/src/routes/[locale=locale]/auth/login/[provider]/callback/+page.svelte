<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"

    if (browser) {
        socket.disconnect().connect()
        toasts.add("success", $ll.$.$auth.$login.$_provider.$callback.loggedInSuccessfully())
        invalidateAll()
    }
</script>

<svelte:head>
    <title>{$ll.$.$auth.$login.$_provider.$callback.login()}</title>
</svelte:head>

<Content.Default title={$ll.$.$auth.$login.$_provider.$callback.redirecting()} />
