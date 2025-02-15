<script lang="ts">
    import type { ClassValue } from "svelte/elements"

    import { Textarea } from "./internal"

    import type { ElementVariant } from "$lib/types"
    import { getElementVariantObject } from "$lib/utils"

    interface Props {
        variant?: ElementVariant
        placeholder?: string
        label?: string
        resizable?: boolean
        disabled?: boolean
        readonly?: boolean
        autofocus?: boolean
        value: string | number | null | undefined
        class?: ClassValue
        [key: string]: unknown
    }

    let {
        variant = "default",
        placeholder = undefined,
        label = undefined,
        resizable = false,
        disabled = false,
        readonly = false,
        autofocus = false,
        value = $bindable(),
        class: klass = undefined,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementVariantObject(variant))
</script>

<div
    class={[
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
    ]}
    {...rest}
>
    {#if label}
        <div
            class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-xs u:select-none u:pointer-events-none u:z-1"
        >
            {label}
        </div>
    {/if}
    <Textarea
        class={[
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
        ]}
        {autofocus}
        {disabled}
        {placeholder}
        {readonly}
        bind:value
    />
</div>
