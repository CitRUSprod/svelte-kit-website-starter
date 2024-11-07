<script lang="ts">
    import { Content } from "$lib/components"

    import { onMount } from "svelte"
    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"

    export let data

    onMount(async () => {
        if (data.error) {
            toasts.add("error", data.error)
        } else {
            if (data.provider) {
                toasts.add("success", $ll.accountLinkedSuccessfully({ provider: data.provider }))
            } else {
                toasts.add("success", $ll.loggedInSuccessfully())
            }
        }

        await invalidateAll()
    })
</script>

<svelte:head>
    <title>{$ll.login()}</title>
</svelte:head>

<Content.Default title={$ll.redirecting()} />
