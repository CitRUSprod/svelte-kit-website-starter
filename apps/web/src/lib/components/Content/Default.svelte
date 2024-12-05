<script lang="ts">
    import cn from "classnames"

    interface Props {
        title: string
        class?: string | undefined
        children?: import("svelte").Snippet
    }

    const { title, class: klass = undefined, children }: Props = $props()
</script>

<div class="u:container u:mx-auto u:p-4">
    <div>
        <h1>{title}</h1>
    </div>
    <div class={cn("u:grid u:gap-4 u:my-4", klass)}>
        {@render children?.()}
    </div>
</div>
