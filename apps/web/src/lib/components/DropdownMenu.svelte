<script lang="ts">
    import cn from "classnames"
    import { getElementVariantObject } from "$lib/utils"

    import type { DropdownMenuItem, ElementVariant } from "$lib/types"

    interface Props {
        variant?: ElementVariant
        label?: string | undefined
        disabled?: boolean
        value?: string | number | null | undefined
        items?: Array<DropdownMenuItem>
        leftIconClass?: string | undefined
        rightIconClass?: string | undefined
        class?: string | undefined
        [key: string]: unknown
    }

    let {
        variant = "default",
        label = undefined,
        disabled = false,
        value = $bindable(),
        items = [],
        leftIconClass = undefined,
        rightIconClass = "u:i-ic-baseline-keyboard-arrow-down",
        class: klass = undefined,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementVariantObject(variant))
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
        <i class={`u:absolute u:left-3 u:pointer-events-none u:text-xl ${leftIconClass}`}></i>
    {/if}
    <select
        class={cn(
            "u:w-full u:h-10 u:px-3 u:bg-content u:text-content-inverse u:border u:rounded u:outline-none u:appearance-none u:cursor-pointer",
            "u:disabled:cursor-not-allowed",
            {
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass,
                "u:border-default": variants.default,
                "u:border-primary": variants.primary,
                "u:border-success": variants.success,
                "u:border-error": variants.error,
                "u:border-warning": variants.warning,
                "u:border-info": variants.info
            }
        )}
        {disabled}
        bind:value
        {...rest}
    >
        {#each items as item (item.value)}
            <option value={item.value}>{item.text}</option>
        {/each}
    </select>
    {#if rightIconClass}
        <i class={`u:absolute u:right-3 u:pointer-events-none u:text-xl ${rightIconClass}`}></i>
    {/if}
</div>
