<script lang="ts">
    import { onMount } from "svelte"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { Content } from "$lib/components"
    import { toasts } from "$lib/stores"

    onMount(() => {
        toasts.add("success", $ll.registeredSuccessfully())
        goto($localePath("/"), {
            replaceState: true,
            invalidateAll: true
        })
    })
</script>

<svelte:head>
    <title>{$ll.registration()}</title>
</svelte:head>

<Content.Default title={$ll.redirecting()} />
