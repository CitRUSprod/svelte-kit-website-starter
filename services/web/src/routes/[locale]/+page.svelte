<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { env } from "$lib/utils"
    import { toasts } from "$lib/stores"
    import { t } from "$lib/locales"

    let count = 0

    function addOne() {
        count++
        toasts.add("success", `${$t("routes.home.count") as string}: ${count}`)
    }
</script>

<svelte:head>
    <title>{$t("routes.home.home")}</title>
</svelte:head>

<Content.Center>
    <div class="u:p-8 u:border-primary u:rounded-lg u:border u:text-center">
        <h1>{env.PUBLIC_TITLE}</h1>
        <div class="u:flex u:justify-center u:mt-5">
            <Button type="primary" on:click={addOne}>
                {$t("routes.home.clicked")}: {count}
            </Button>
        </div>
    </div>
</Content.Center>
