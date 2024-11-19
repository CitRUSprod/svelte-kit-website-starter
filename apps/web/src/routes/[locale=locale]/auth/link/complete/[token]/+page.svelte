<script lang="ts">
    import { Content } from "$lib/components"

    import { onMount } from "svelte"
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"

    onMount(() => {
        toasts.add("success", $ll.emailLinkedSuccessfully())
        goto($localePath("/"), {
            replaceState: true,
            invalidateAll: true
        })
    })
</script>

<svelte:head>
    <title>{$ll.emailLinking()}</title>
</svelte:head>

<Content.Default title={$ll.redirecting()} />
