<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    interface Props {
        class?: ClassValue
        children?: Snippet
    }

    const { class: klass = undefined, children }: Props = $props()
</script>

<div class={["u:absolute u:flex u:justify-center u:items-center u:w-full u:h-full", klass]}>
    {@render children?.()}
</div>
