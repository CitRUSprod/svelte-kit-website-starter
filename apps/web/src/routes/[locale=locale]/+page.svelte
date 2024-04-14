<script lang="ts">
    import { Content, Button } from "$lib/components"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    import * as _ from "lodash-es"
    import { ll } from "$i18n/helpers"
    import { env } from "$lib/constants"
    import { toasts } from "$lib/stores"

    let count = 0

    function addOne() {
        count++
        toasts.add("success", `${String($ll.count())}: ${count}`)
    }

    function showRandomNumber() {
        const num = _.random(1, 100)
        toasts.add("info", `${String($ll.randomNumber())}: ${num}`)
    }
</script>

<svelte:head>
    <title>{$ll.home()}</title>
</svelte:head>

<Content.Center>
    <div class="u:p-8 u:border-primary u:rounded-lg u:border u:text-center">
        <h1>{env.PUBLIC_TITLE}</h1>
        <div class="u:flex u:justify-center u:gap-2 u:mt-5">
            <Button variant="primary" on:click={addOne}>
                {$ll.clicks()}: {count}
            </Button>
            <Button variant="primary" on:click={showRandomNumber}>
                {$ll.randomNumber()}
            </Button>
        </div>
    </div>
</Content.Center>
