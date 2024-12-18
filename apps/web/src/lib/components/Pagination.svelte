<script lang="ts">
    import { Pagination } from "bits-ui"
    import Button from "./Button.svelte"

    interface Props {
        page: number
        perPage: number
        count: number
        loading?: boolean
        onSetPage?(localPage: number): void
    }

    const { page, perPage, count, loading = false, onSetPage }: Props = $props()
</script>

<Pagination.Root controlledPage {count} {perPage} {page} onPageChange={onSetPage}>
    {#snippet children({ pages })}
        <div class="u:flex u:gap-3">
            <Pagination.PrevButton>
                {#snippet child({ props })}
                    <Button variant="primary" {loading} {...props}>
                        <i class="u:i-ic-baseline-keyboard-arrow-left u:mx--2 u:text-3xl"></i>
                    </Button>
                {/snippet}
            </Pagination.PrevButton>
            <div class="u:flex u:items-center u:gap-2.5">
                {#each pages as p (p.key)}
                    {#if p.type === "ellipsis"}
                        <div
                            class="u:select-none u:text-[15px] u:font-medium u:text-foreground-alt"
                        >
                            ...
                        </div>
                    {:else}
                        <Pagination.Page page={p}>
                            {#snippet child({ props })}
                                <Button
                                    variant="primary"
                                    disabled={page === p.value}
                                    {loading}
                                    {...props}
                                >
                                    {p.value}
                                </Button>
                            {/snippet}
                        </Pagination.Page>
                    {/if}
                {/each}
            </div>
            <Pagination.NextButton>
                {#snippet child({ props })}
                    <Button variant="primary" {loading} {...props}>
                        <i class="u:i-ic-baseline-keyboard-arrow-right u:mx--2 u:text-3xl"></i>
                    </Button>
                {/snippet}
            </Pagination.NextButton>
        </div>
    {/snippet}
</Pagination.Root>
