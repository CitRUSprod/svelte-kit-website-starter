<script lang="ts">
    import classNames from "classnames"

    let klass: string | undefined = undefined
    export { klass as class }
</script>

<div
    class={classNames("u:absolute u:flex u:justify-center u:items-center u:w-full u:h-full", klass)}
>
    <slot />
</div>
