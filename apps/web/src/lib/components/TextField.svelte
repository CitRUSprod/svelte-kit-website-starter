<script lang="ts">
    import { Input } from "./internal"

    import cn from "classnames"
    import { getElementVariantObject } from "$lib/utils"

    import type { ElementVariant } from "$lib/types"

    export let variant: ElementVariant = "default"
    export let placeholder: string | undefined = undefined
    export let label: string | undefined = undefined
    export let type = "text"
    export let disabled = false
    export let readonly = false
    export let autofocus = false
    export let value: string | number | null | undefined = undefined
    export let leftIconClass: string | undefined = undefined
    export let rightIconClass: string | undefined = undefined

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
    {#if leftIconClass}
        <i class={`u:absolute u:left-3 u:pointer-events-none u:text-xl ${leftIconClass}`} />
    {/if}
    <Input
        class={cn(
            "u:w-full u:h-10 u:px-3 u:bg-content u:text-content-inverse u:border u:rounded u:placeholder-opacity-80 u:outline-none",
            "u:dark:placeholder-opacity-80",
            "u:disabled:cursor-not-allowed",
            {
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass,
                "u:border-default u:placeholder-text-default-lighter": variants.default,
                "u:border-primary u:placeholder-text-primary-lighter": variants.primary,
                "u:border-success u:placeholder-text-success-lighter": variants.success,
                "u:border-error u:placeholder-text-error-lighter": variants.error,
                "u:border-warning u:placeholder-text-warning-lighter": variants.warning,
                "u:border-info u:placeholder-text-info-lighter": variants.info
            }
        )}
        {autofocus}
        {disabled}
        {placeholder}
        {readonly}
        {type}
        bind:value
        on:input
        on:keypress
        on:focus
        on:blur
    />
    {#if rightIconClass}
        <i class={`u:absolute u:right-3 u:pointer-events-none u:text-xl ${rightIconClass}`} />
    {/if}
</div>
