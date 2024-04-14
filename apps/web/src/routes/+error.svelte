<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { page } from "$app/stores"
    import { ll, localePath } from "$i18n/helpers"
</script>

<svelte:head>
    <title>{$ll.error()} {$page.status}</title>
</svelte:head>

<main class="u:relative u:flex-1">
    <Content.Center>
        <div class="u:p-8 u:border-error u:rounded-lg u:border u:text-center">
            <h1>{$ll.error()} {$page.status}</h1>
            {#if $page.error}
                <h2>{$page.error.message}</h2>
            {/if}
            <div class="u:flex u:justify-center u:mt-5">
                <Button href={$localePath("/")} variant="error">
                    {$ll.goHome()}
                </Button>
            </div>
        </div>
    </Content.Center>
</main>
