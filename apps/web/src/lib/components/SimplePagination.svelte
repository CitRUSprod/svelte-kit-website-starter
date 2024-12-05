<script lang="ts">
    import { Button } from "$lib/components"

    interface Props {
        page: number
        pages: number
        loading?: boolean
        onSetPage?(localPage: number): void
    }

    const { page, pages, loading = false, onSetPage = undefined }: Props = $props()

    function setPage(localPage: number) {
        onSetPage?.(localPage)
    }
</script>

<div class="u:flex-inline u:gap-1">
    <Button disabled={loading || page <= 1} variant="primary" onclick={() => setPage(1)}>
        <i class="u:i-ic-baseline-keyboard-double-arrow-left u:mx--2 u:text-3xl"></i>
    </Button>
    <Button disabled={loading || page <= 1} variant="primary" onclick={() => setPage(page - 1)}>
        <i class="u:i-ic-baseline-keyboard-arrow-left u:mx--2 u:text-3xl"></i>
    </Button>
    <Button {loading} variant="primary">{page}</Button>
    <Button disabled={loading || page >= pages} variant="primary" onclick={() => setPage(page + 1)}>
        <i class="u:i-ic-baseline-keyboard-arrow-right u:mx--2 u:text-3xl"></i>
    </Button>
    <Button disabled={loading || page >= pages} variant="primary" onclick={() => setPage(pages)}>
        <i class="u:i-ic-baseline-keyboard-double-arrow-right u:mx--2 u:text-3xl"></i>
    </Button>
</div>
