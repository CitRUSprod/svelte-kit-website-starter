<script lang="ts">
    import { Textarea } from "./internal"

    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { ElementType } from "$lib/types"

    export let type: ElementType = "default"
    export let placeholder: string | undefined = undefined
    export let label: string | undefined = undefined
    export let resizable = false
    export let disabled = false
    export let readonly = false
    export let autofocus = false
    export let value: string | number | null | undefined = undefined

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
    <Textarea
        class={classNames(
            "u:w-full u:h-40 u:px-3 u:py-2 u:bg-content u:text-content-inverse u:border u:rounded u:placeholder-opacity-80 u:outline-none",
            "u:dark:placeholder-opacity-80",
            "u:disabled:cursor-not-allowed",
            {
                "u:border-default u:placeholder-text-default-lighter": types.default,
                "u:border-primary u:placeholder-text-primary-lighter": types.primary,
                "u:border-success u:placeholder-text-success-lighter": types.success,
                "u:border-error u:placeholder-text-error-lighter": types.error,
                "u:border-warning u:placeholder-text-warning-lighter": types.warning,
                "u:border-info u:placeholder-text-info-lighter": types.info,
                "u:resize-none": !resizable
            }
        )}
        {autofocus}
        {disabled}
        {placeholder}
        {readonly}
        bind:value
        on:keypress
        on:focus
        on:blur
    />
</div>
