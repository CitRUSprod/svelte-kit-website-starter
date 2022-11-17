<script lang="ts">
    import classNames from "classnames"

    export let title: string

    let klass: string | undefined = undefined
    export { klass as class }
</script>

<div class="u:container u:mx-auto u:p-4">
    <div>
        <h1>{title}</h1>
    </div>
    <div class={classNames("u:grid u:gap-4 u:my-4", klass)}>
        <slot />
    </div>
</div>
