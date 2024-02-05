<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { getRandomInt } from "@local/utils"
    import { env } from "$lib/constants"
    import { toasts } from "$lib/stores"
    import { t } from "$lib/locales"

    let count = 0

    function addOne() {
        count++
        toasts.add("success", `${$t("routes.home.count") as string}: ${count}`)
    }

    function showRandomNumber() {
        const num = getRandomInt(1, 100)
        toasts.add("success", `${$t("routes.home.random-number") as string}: ${num}`)
    }
</script>

<svelte:head>
    <title>{$t("routes.home.home")}</title>
</svelte:head>

<Content.Center>
    <div class="u:p-8 u:border-primary u:rounded-lg u:border u:text-center">
        <h1>{env.PUBLIC_TITLE}</h1>
        <div class="u:flex u:justify-center u:gap-2 u:mt-5">
            <Button variant="primary" on:click={addOne}>
                {$t("routes.home.clicked")}: {count}
            </Button>
            <Button variant="primary" on:click={showRandomNumber}>
                {$t("routes.home.random-number")}
            </Button>
        </div>
    </div>
</Content.Center>
