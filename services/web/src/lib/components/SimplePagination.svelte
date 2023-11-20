<script lang="ts">
    import { Button } from "$lib/components"

    import { createEventDispatcher } from "svelte"

    export let page: number
    export let pages: number
    export let loading = false

    const dispatch = createEventDispatcher()

    function setPage(localPage: number) {
        dispatch("setPage", localPage)
    }
</script>

<div class="u:flex-inline u:gap-1">
    <Button disabled={loading || page <= 1} variant="primary" on:click={() => setPage(1)}>
        <i class="u:i-ic-baseline-keyboard-double-arrow-left u:mx--2 u:text-3xl" />
    </Button>
    <Button disabled={loading || page <= 1} variant="primary" on:click={() => setPage(page - 1)}>
        <i class="u:i-ic-baseline-keyboard-arrow-left u:mx--2 u:text-3xl" />
    </Button>
    <Button {loading} variant="primary">{page}</Button>
    <Button
        disabled={loading || page >= pages}
        variant="primary"
        on:click={() => setPage(page + 1)}
    >
        <i class="u:i-ic-baseline-keyboard-arrow-right u:mx--2 u:text-3xl" />
    </Button>
    <Button disabled={loading || page >= pages} variant="primary" on:click={() => setPage(pages)}>
        <i class="u:i-ic-baseline-keyboard-double-arrow-right u:mx--2 u:text-3xl" />
    </Button>
</div>
