<script lang="ts">
    import { Pagination } from "bits-ui"

    import Button from "./Button.svelte"

    import type { ComponentBasicProps } from "$lib/types"

    type Props = ComponentBasicProps & {
        page: number
        pages: number
        loading?: boolean
        onSetPage?(localPage: number): void
    }

    let {
        class: klass = undefined,
        page = $bindable(),
        pages,
        loading = false,
        onSetPage = undefined,
        ...rest
    }: Props = $props()

    function setPage(localPage: number) {
        onSetPage?.(localPage)
    }
</script>

<Pagination.Root
    class={["u:flex-inline u:gap-1", klass]}
    count={pages * 10}
    perPage={10}
    bind:page
    onPageChange={p => setPage(p)}
    {...rest}
>
    {#snippet children({ pages: localPages })}
        <Button
            class="u:opacity-60"
            disabled={loading || page <= 1}
            onClick={() => setPage(page - 1)}
        >
            <i class="u:i-ic-baseline-keyboard-arrow-left"></i>
        </Button>
        {#each localPages as localPage (localPage.key)}
            {#if localPage.type === "ellipsis"}
                <div class="u:px-3 u:text-lg">...</div>
            {:else if localPage.value === page}
                <Button {loading}>
                    {localPage.value}
                </Button>
            {:else}
                <Button
                    class="u:opacity-60"
                    disabled={loading}
                    onClick={() => setPage(localPage.value)}
                >
                    {localPage.value}
                </Button>
            {/if}
        {/each}
        <Button
            class="u:opacity-60"
            disabled={loading || page >= pages}
            onClick={() => setPage(page + 1)}
        >
            <i class="u:i-ic-baseline-keyboard-arrow-right"></i>
        </Button>
    {/snippet}
</Pagination.Root>
