<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { ll, localePath } from "$i18n/helpers"
</script>

<svelte:head>
    <title>{$ll.$.$simpleLayout.simpleLayout()}</title>
</svelte:head>

<Content.Center>
    <div class="u:p-8 u:border-primary u:rounded-lg u:border u:text-center">
        <h1>{$ll.$.$simpleLayout.simpleLayout()}</h1>
        <div class="u:flex u:justify-center u:mt-5">
            <Button href={$localePath("/")} variant="primary">
                {$ll.$.$simpleLayout.goHome()}
            </Button>
        </div>
    </div>
</Content.Center>
