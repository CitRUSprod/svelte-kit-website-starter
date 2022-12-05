<script lang="ts">
    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { DropdownMenuItem, ElementType } from "$lib/types"

    export let type: ElementType = "default"
    export let label: string | undefined = undefined
    export let disabled = false
    export let value: string | number | null | undefined = undefined
    export let items: Array<DropdownMenuItem> = []
    export let leftIconClass: string | undefined = undefined
    export let rightIconClass: string | undefined = "u:i-ic-baseline-keyboard-arrow-down"

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementTypeObject(type)
</script>

<div
    class={classNames(
        "u:relative u:flex u:items-center",
        {
            "u:opacity-50": disabled,
            "u:text-default": types.default,
            "u:text-primary": types.primary,
            "u:text-success": types.success,
            "u:text-error": types.error,
            "u:text-warning": types.warning,
            "u:text-info": types.info
        },
        klass
    )}
>
    {#if label}
        <div
            class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-xs u:select-none u:pointer-events-none u:z-1"
        >
            {label}
        </div>
    {/if}
    {#if leftIconClass}
        <i class={`u:absolute u:left-3 u:pointer-events-none u:text-xl ${leftIconClass}`} />
    {/if}
    <select
        class={classNames(
            "u:w-full u:h-10 u:px-3 u:bg-content u:text-content-inverse u:border u:rounded u:outline-none u:appearance-none u:cursor-pointer",
            "u:disabled:cursor-not-allowed",
            {
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass,
                "u:border-default": types.default,
                "u:border-primary": types.primary,
                "u:border-success": types.success,
                "u:border-error": types.error,
                "u:border-warning": types.warning,
                "u:border-info": types.info
            }
        )}
        {disabled}
        bind:value
        on:change
    >
        {#each items as item (item.value)}
            <option value={item.value}>{item.text}</option>
        {/each}
    </select>
    {#if rightIconClass}
        <i class={`u:absolute u:right-3 u:pointer-events-none u:text-xl ${rightIconClass}`} />
    {/if}
</div>
