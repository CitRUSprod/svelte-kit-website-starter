<script lang="ts">
    import { Textarea } from "./internal"

    import cn from "classnames"
    import { getElementVariantObject } from "$lib/utils"

    import type { ElementVariant } from "$lib/types"

    export let variant: ElementVariant = "default"
    export let placeholder: string | undefined = undefined
    export let label: string | undefined = undefined
    export let resizable = false
    export let disabled = false
    export let readonly = false
    export let autofocus = false
    export let value: string | number | null | undefined = undefined

    let klass: string | undefined = undefined
    export { klass as class }

    $: variants = getElementVariantObject(variant)
</script>

<div
    class={cn(
        "u:relative u:flex u:items-center",
        {
            "u:opacity-50": disabled,
            "u:text-default": variants.default,
            "u:text-primary": variants.primary,
            "u:text-success": variants.success,
            "u:text-error": variants.error,
            "u:text-warning": variants.warning,
            "u:text-info": variants.info
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
        class={cn(
            "u:w-full u:h-40 u:px-3 u:py-2 u:bg-content u:text-content-inverse u:border u:rounded u:placeholder-opacity-80 u:outline-none",
            "u:dark:placeholder-opacity-80",
            "u:disabled:cursor-not-allowed",
            {
                "u:border-default u:placeholder-text-default-lighter": variants.default,
                "u:border-primary u:placeholder-text-primary-lighter": variants.primary,
                "u:border-success u:placeholder-text-success-lighter": variants.success,
                "u:border-error u:placeholder-text-error-lighter": variants.error,
                "u:border-warning u:placeholder-text-warning-lighter": variants.warning,
                "u:border-info u:placeholder-text-info-lighter": variants.info,
                "u:resize-none": !resizable
            }
        )}
        {autofocus}
        {disabled}
        {placeholder}
        {readonly}
        bind:value
        on:input
        on:keypress
        on:focus
        on:blur
    />
</div>
