<script lang="ts">
    import type { Snippet } from "svelte"

    import type { ComponentBasicProps } from "$lib/types"

    type Props = ComponentBasicProps & {
        title: string
        titleTestId?: string
        bodyTestId?: string
        children?: Snippet
    }

    const {
        title,
        class: klass = undefined,
        titleTestId = undefined,
        bodyTestId = undefined,
        children = undefined,
        ...rest
    }: Props = $props()
</script>

<div class="u:container u:mx-auto u:p-4" {...rest}>
    <div>
        <h1 data-testid={titleTestId}>{title}</h1>
    </div>
    <div class={["u:grid u:gap-4 u:my-4", klass]} data-testid={bodyTestId}>
        {@render children?.()}
    </div>
</div>
