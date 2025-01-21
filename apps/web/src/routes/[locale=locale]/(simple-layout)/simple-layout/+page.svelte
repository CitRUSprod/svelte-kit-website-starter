<script lang="ts">
    import { ll, localePath } from "$i18n/helpers"
    import { Content, Button } from "$lib/components"
</script>

<svelte:head>
    <title>{$ll.simpleLayout()}</title>
</svelte:head>

<Content.Center>
    <div class="u:p-8 u:border-primary u:rounded-lg u:border u:text-center">
        <h1>{$ll.simpleLayout()}</h1>
        <div class="u:flex u:justify-center u:mt-5">
            <Button href={$localePath("/")} variant="primary">
                {$ll.goHome()}
            </Button>
        </div>
    </div>
</Content.Center>
