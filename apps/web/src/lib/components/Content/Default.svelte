<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    interface Props {
        title: string
        titleTestId?: string
        bodyTestId?: string
        class?: ClassValue
        children?: Snippet
    }

    const {
        title,
        class: klass = undefined,
        titleTestId = undefined,
        bodyTestId = undefined,
        children
    }: Props = $props()
</script>

<div class="u:container u:mx-auto u:p-4">
    <div>
        <h1 data-testid={titleTestId}>{title}</h1>
    </div>
    <div class={["u:grid u:gap-4 u:my-4", klass]} data-testid={bodyTestId}>
        {@render children?.()}
    </div>
</div>
