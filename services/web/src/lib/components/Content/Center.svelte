<script lang="ts">
    import cn from "classnames"

    let klass: string | undefined = undefined
    export { klass as class }
</script>

<div class={cn("u:absolute u:flex u:justify-center u:items-center u:w-full u:h-full", klass)}>
    <slot />
</div>
