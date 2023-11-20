<script lang="ts">
    import cn from "classnames"

    export let title: string

    let klass: string | undefined = undefined
    export { klass as class }
</script>

<div class="u:container u:mx-auto u:p-4">
    <div>
        <h1>{title}</h1>
    </div>
    <div class={cn("u:grid u:gap-4 u:my-4", klass)}>
        <slot />
    </div>
</div>
