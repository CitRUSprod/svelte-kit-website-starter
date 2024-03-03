<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"

    if (browser) {
        toasts.add("success", $ll.$.$auth.$registration.$complete.$_token.registeredSuccessfully())
        goto($localePath("/"), {
            replaceState: true,
            invalidateAll: true
        })
    }
</script>

<svelte:head>
    <title>{$ll.$.$auth.$registration.$complete.$_token.registration()}</title>
</svelte:head>

<Content.Default title={$ll.$.$auth.$registration.$complete.$_token.redirecting()} />
