<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { t, localePath } from "$lib/locales"
</script>

<svelte:head>
    <title>{$t("routes.simple-layout.simple-layout")}</title>
</svelte:head>

<Content.Center>
    <div class="u:p-8 u:border-primary u:rounded-lg u:border u:text-center">
        <h1>{$t("routes.simple-layout.simple-layout")}</h1>
        <div class="u:flex u:justify-center u:mt-5">
            <Button href={$localePath("/")} type="primary">
                {$t("routes.simple-layout.go-home")}
            </Button>
        </div>
    </div>
</Content.Center>
