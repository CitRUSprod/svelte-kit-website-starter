<script lang="ts">
    import type { Snippet } from "svelte"

    import type { ComponentBasicProps } from "$lib/types"

    type Props = ComponentBasicProps & {
        children?: Snippet
    }

    const { class: klass = undefined, children = undefined, ...rest }: Props = $props()
</script>

<div
    class={["u:absolute u:flex u:justify-center u:items-center u:w-full u:h-full", klass]}
    {...rest}
>
    {@render children?.()}
</div>
