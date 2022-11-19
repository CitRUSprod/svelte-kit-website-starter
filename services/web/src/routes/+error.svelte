<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { page } from "$app/stores"
    import { t, localePath } from "$lib/locales"
</script>

<svelte:head>
    <title>{$t("routes.error.error")} {$page.status}</title>
</svelte:head>

<main class="u:relative u:flex-1">
    <Content.Center>
        <div class="u:p-8 u:border-error u:rounded-lg u:border u:text-center">
            <h1>{$t("routes.error.error")} {$page.status}</h1>
            {#if $page.error}
                <h2>{$page.error.message}</h2>
            {/if}
            <div class="u:flex u:justify-center u:mt-5">
                <Button href={$localePath("/")} type="error">
                    {$t("routes.error.go-home")}
                </Button>
            </div>
        </div>
    </Content.Center>
</main>
